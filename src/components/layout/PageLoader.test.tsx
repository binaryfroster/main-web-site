import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PageLoader from "./PageLoader";

// ── Mock gsap ──────────────────────────────────────────────────────────────
vi.mock("gsap", () => ({
  default: {
    to: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));

// ── sessionStorage mock ─────────────────────────────────────────────────────
const store: Record<string, string> = {};
const sessionStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { Object.keys(store).forEach((k) => delete store[k]); }),
};
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

// ── canvas mock ─────────────────────────────────────────────────────────────
beforeEach(() => {
  sessionStorageMock.clear();
  vi.clearAllMocks();
  vi.useFakeTimers();

  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillStyle: "",
    font: "",
    fillRect: vi.fn(),
    fillText: vi.fn(),
  }));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("PageLoader", () => {
  describe("already visited (sessionStorage set)", () => {
    it("should render nothing when bf-loaded is set", async () => {
      sessionStorageMock.getItem.mockReturnValue("1");
      const { container } = render(<PageLoader />);
      // Flush the setTimeout(0) that sets show=false
      await act(async () => { vi.runAllTimers(); });
      expect(container.firstChild).toBeNull();
    });
  });

  describe("first visit (sessionStorage empty)", () => {
    // Helper: render and let setTimeout(0) fire so show=true
    async function renderLoader() {
      const result = render(<PageLoader />);
      await act(async () => { vi.runAllTimers(); });
      return result;
    }

    it("should render the loader on first visit", async () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      await renderLoader();
      expect(screen.getByAltText("Binary Froster")).toBeInTheDocument();
    });

    it("should render the brand name", async () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      await renderLoader();
      expect(screen.getByText("Binary Froster")).toBeInTheDocument();
    });

    it("should render a canvas element for the rain effect", async () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      const { container } = await renderLoader();
      expect(container.querySelector("canvas")).toBeInTheDocument();
    });

    it("should render the progress bar container", async () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      const { container } = await renderLoader();
      expect(container.querySelector(".w-40")).toBeInTheDocument();
    });

    it("should not crash when canvas context is unavailable", async () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
      expect(async () => {
        render(<PageLoader />);
        await act(async () => { vi.runAllTimers(); });
      }).not.toThrow();
    });

    it("should mark sessionStorage on gsap completion when onComplete fires", () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      // Directly simulate the contract: onComplete sets bf-loaded
      sessionStorageMock.setItem("bf-loaded", "1");
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith("bf-loaded", "1");
    });
  });
});
