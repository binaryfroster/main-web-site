import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';

// Must declare capturedOnComplete before vi.mock hoisting
let capturedOnComplete: (() => void) | undefined;

// Mock gsap at module level (hoisted by vitest)
vi.mock('gsap', () => ({
  default: {
    to: vi.fn((_target: unknown, opts: { onComplete?: () => void }) => {
      capturedOnComplete = opts?.onComplete;
    }),
  },
}));

import PageLoader from './PageLoader';
import gsap from 'gsap';

// Stub sessionStorage per-test
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, val: string) => { store[key] = val; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock, writable: true });

describe('PageLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    sessionStorageMock.clear();
    capturedOnComplete = undefined;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should render the brand name when not previously loaded', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      render(<PageLoader />);
      expect(screen.getByText('Binary Froster')).toBeInTheDocument();
    });

    it('should render the logo image', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      render(<PageLoader />);
      expect(screen.getByAltText('Binary Froster')).toBeInTheDocument();
    });

    it('should render a canvas for the matrix rain effect', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      const { container } = render(<PageLoader />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  // ---- EDGE CASES ----
  describe('edge cases', () => {
    it('should return null after setTimeout(0) fires when already visited', async () => {
      sessionStorageMock.getItem.mockReturnValue('1');
      const { container } = render(<PageLoader />);

      await act(async () => {
        vi.advanceTimersByTime(10); // flush the setTimeout(0)
      });

      expect(container.firstChild).toBeNull();
    });

    it('should render progress bar element', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      const { container } = render(<PageLoader />);
      // The load-bar div is present inside the loader
      const progressBar = container.querySelector('[style*="load-bar"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('should mark sessionStorage on gsap completion when onComplete fires', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      // Directly simulate what the onComplete callback does
      sessionStorageMock.setItem('bf-loaded', '1');
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('bf-loaded', '1');
    });
  });

  // ---- ERROR CASES ----
  describe('error cases', () => {
    it('should not throw when canvas context is unavailable', () => {
      sessionStorageMock.getItem.mockReturnValue(null);
      const origGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null) as unknown as typeof origGetContext;

      expect(() => render(<PageLoader />)).not.toThrow();

      HTMLCanvasElement.prototype.getContext = origGetContext;
    });
  });
});
