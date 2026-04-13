import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ScrollReveal from './ScrollReveal';

// IntersectionObserver is already mocked as a class in test/setup.ts.
// Override it here with a version that captures the callback.
let intersectCallback: ((entries: Partial<IntersectionObserverEntry>[]) => void) | null = null;

const mockObserverInstance = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
};

class MockIntersectionObserver {
  constructor(cb: (entries: Partial<IntersectionObserverEntry>[]) => void) {
    intersectCallback = cb;
  }
  observe = mockObserverInstance.observe;
  unobserve = mockObserverInstance.unobserve;
  disconnect = mockObserverInstance.disconnect;
  takeRecords() { return []; }
}

describe('ScrollReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    intersectCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should render children inside a reveal wrapper', () => {
      render(
        <ScrollReveal>
          <p data-testid="child">Hello</p>
        </ScrollReveal>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should apply "reveal" class to the wrapper', () => {
      const { container } = render(<ScrollReveal>Content</ScrollReveal>);
      expect(container.firstChild).toHaveClass('reveal');
    });

    it('should merge custom className with reveal', () => {
      const { container } = render(
        <ScrollReveal className="custom-class">Content</ScrollReveal>,
      );
      expect(container.firstChild).toHaveClass('reveal');
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should add "visible" class when intersection is triggered', async () => {
      vi.useFakeTimers();
      const { container } = render(<ScrollReveal>Content</ScrollReveal>);
      const el = container.firstChild as HTMLElement;

      await act(async () => {
        intersectCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
        vi.runAllTimers();
      });

      expect(el).toHaveClass('visible');
      vi.useRealTimers();
    });

    it('should call IntersectionObserver.observe on mount', () => {
      render(<ScrollReveal>Content</ScrollReveal>);
      expect(mockObserverInstance.observe).toHaveBeenCalledTimes(1);
    });
  });

  // ---- EDGE CASES ----
  describe('edge cases', () => {
    it('should not add "visible" when isIntersecting is false', () => {
      const { container } = render(<ScrollReveal>Content</ScrollReveal>);
      const el = container.firstChild as HTMLElement;

      intersectCallback?.([{ isIntersecting: false } as IntersectionObserverEntry]);

      expect(el).not.toHaveClass('visible');
    });

    it('should call unobserve after becoming visible', async () => {
      render(<ScrollReveal>Content</ScrollReveal>);

      await act(async () => {
        intersectCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
      });

      expect(mockObserverInstance.unobserve).toHaveBeenCalledTimes(1);
    });

    it('should apply stagger delay to direct children', async () => {
      const { container } = render(
        <ScrollReveal stagger={100}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </ScrollReveal>,
      );

      await act(async () => {
        intersectCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
      });

      // ScrollReveal renders: <div class="reveal"> children directly
      const revealDiv = container.firstChild as HTMLElement;
      const children = revealDiv.querySelectorAll(':scope > span');
      expect((children[0] as HTMLElement).style.transitionDelay).toBe('0ms');
      expect((children[1] as HTMLElement).style.transitionDelay).toBe('100ms');
      expect((children[2] as HTMLElement).style.transitionDelay).toBe('200ms');
    });

    it('should immediately add "visible" when prefers-reduced-motion is set', () => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn().mockImplementation((query: string) => ({
          matches: query.includes('reduce'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      );

      const { container } = render(<ScrollReveal>Content</ScrollReveal>);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveClass('visible');

      vi.unstubAllGlobals();
    });
  });

  // ---- ERROR CASES ----
  describe('error cases', () => {
    it('should disconnect observer on unmount', () => {
      const { unmount } = render(<ScrollReveal>Content</ScrollReveal>);
      unmount();
      expect(mockObserverInstance.disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
