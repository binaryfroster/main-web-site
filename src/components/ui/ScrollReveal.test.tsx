import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ScrollReveal from "./ScrollReveal";

// ── IntersectionObserver mock ───────────────────────────────────────────────
type IOCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IOCallback;
  options: IntersectionObserverInit | undefined;
  observed: Element[] = [];

  constructor(cb: IOCallback, opts?: IntersectionObserverInit) {
    this.callback = cb;
    this.options = opts;
    MockIntersectionObserver.instances.push(this);
  }
  observe = vi.fn((el: Element) => { this.observed.push(el); });
  unobserve = vi.fn();
  disconnect = vi.fn();

  // Helper to simulate an element entering viewport
  trigger(isIntersecting: boolean) {
    this.observed.forEach((el) => {
      this.callback([
        { isIntersecting, target: el } as unknown as IntersectionObserverEntry,
      ]);
    });
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.useFakeTimers();
  Object.defineProperty(window, "IntersectionObserver", {
    value: MockIntersectionObserver,
    writable: true,
    configurable: true,
  });
  // Default: normal motion
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn(() => ({ matches: false })),
    writable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("ScrollReveal", () => {
  describe("happy path", () => {
    it("should render children", () => {
      const { getByText } = render(
        <ScrollReveal><p>Hello</p></ScrollReveal>
      );
      expect(getByText("Hello")).toBeInTheDocument();
    });

    it("should add 'reveal' class to the wrapper div", () => {
      const { container } = render(<ScrollReveal><p>Test</p></ScrollReveal>);
      expect(container.firstChild).toHaveClass("reveal");
    });

    it("should NOT have 'visible' class before observer fires", () => {
      const { container } = render(<ScrollReveal><p>Hidden</p></ScrollReveal>);
      // visible is NOT added until IO fires
      expect(container.firstChild).not.toHaveClass("visible");
    });

    it("should add 'visible' class after IntersectionObserver fires", async () => {
      const { container } = render(<ScrollReveal><p>Revealed</p></ScrollReveal>);

      await act(async () => {
        MockIntersectionObserver.instances[0]?.trigger(true);
        vi.runAllTimers();
      });

      expect(container.firstChild).toHaveClass("visible");
    });

    it("should call unobserve after element becomes visible", async () => {
      render(<ScrollReveal><p>Test</p></ScrollReveal>);
      const instance = MockIntersectionObserver.instances[0];

      await act(async () => {
        instance?.trigger(true);
        vi.runAllTimers();
      });

      expect(instance?.unobserve).toHaveBeenCalled();
    });

    it("should disconnect observer on unmount", () => {
      const { unmount } = render(<ScrollReveal><p>Test</p></ScrollReveal>);
      const instance = MockIntersectionObserver.instances[0];
      unmount();
      expect(instance?.disconnect).toHaveBeenCalled();
    });
  });

  describe("reduced motion", () => {
    it("should add 'visible' immediately when reduced-motion is preferred", async () => {
      window.matchMedia = vi.fn(() => ({ matches: true })) as unknown as typeof window.matchMedia;
      const { container } = render(<ScrollReveal><p>Content</p></ScrollReveal>);
      await act(async () => {});
      expect(container.firstChild).toHaveClass("visible");
    });
  });

  describe("stagger", () => {
    it("should set transitionDelay on children when stagger > 0", async () => {
      const { container } = render(
        <ScrollReveal stagger={100}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </ScrollReveal>
      );

      await act(async () => {
        MockIntersectionObserver.instances[0]?.trigger(true);
        vi.runAllTimers();
      });

      const kids = container.querySelectorAll(":scope > div > *");
      expect((kids[0] as HTMLElement).style.transitionDelay).toBe("0ms");
      expect((kids[1] as HTMLElement).style.transitionDelay).toBe("100ms");
      expect((kids[2] as HTMLElement).style.transitionDelay).toBe("200ms");
    });
  });

  describe("re-mount behaviour (navigation)", () => {
    it("should reset 'visible' class on re-mount so animation re-triggers", async () => {
      // First mount — trigger visibility
      const { container, unmount } = render(<ScrollReveal><p>Content</p></ScrollReveal>);
      await act(async () => {
        MockIntersectionObserver.instances[0]?.trigger(true);
        vi.runAllTimers();
      });
      expect(container.firstChild).toHaveClass("visible");

      // Simulate navigating away and back
      unmount();
      MockIntersectionObserver.instances = [];

      const { container: container2 } = render(<ScrollReveal><p>Content</p></ScrollReveal>);
      // Should NOT immediately be visible — reset happened
      expect(container2.firstChild).not.toHaveClass("visible");
    });
  });

  describe("extra className", () => {
    it("should merge extra className with reveal", () => {
      const { container } = render(
        <ScrollReveal className="my-section"><p>Test</p></ScrollReveal>
      );
      expect(container.firstChild).toHaveClass("reveal", "my-section");
    });
  });
});
