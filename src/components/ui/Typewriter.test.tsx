import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import Typewriter from './Typewriter';

/**
 * The Typewriter advances ONE character per timer tick because each
 * useEffect re-schedules a new setTimeout after React re-renders.
 * vi.advanceTimersByTime only fires timers already registered —
 * to advance N characters we must run N ticks of (advanceTimersByTime + flush).
 */
async function advanceTicks(ticks: number, ms: number) {
  for (let i = 0; i < ticks; i++) {
    await act(async () => {
      vi.advanceTimersByTime(ms);
    });
  }
}

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should render the cursor element', () => {
      const { container } = render(<Typewriter />);
      const spans = container.querySelectorAll('span');
      // outer span + text span + cursor span
      expect(spans.length).toBeGreaterThanOrEqual(2);
    });

    it('should start with empty text', () => {
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;
      expect(textSpan.textContent).toBe('');
    });

    it('should type first character "A" after one 80ms tick', async () => {
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;

      await advanceTicks(1, 80);

      expect(textSpan.textContent).toBe('A');
    });

    it('should type first two characters "AI" after two 80ms ticks', async () => {
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;

      await advanceTicks(2, 80);

      expect(textSpan.textContent).toBe('AI');
    });

    it('should complete typing "AI Systems." after 11 ticks of 80ms each', async () => {
      const phrase = 'AI Systems.';
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;

      await advanceTicks(phrase.length, 80);

      expect(textSpan.textContent).toBe(phrase);
    });
  });

  // ---- EDGE CASES ----
  describe('edge cases', () => {
    it('should start deleting after 2000ms pause: length should decrease', async () => {
      const phrase = 'AI Systems.';
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;

      // Finish typing all 11 characters
      await advanceTicks(phrase.length, 80);
      expect(textSpan.textContent).toBe(phrase);

      // Trigger the 2000ms pause (isDeleting = true)
      await advanceTicks(1, 2000);
      // One delete tick (40ms)
      await advanceTicks(1, 40);

      expect(textSpan.textContent!.length).toBeLessThan(phrase.length);
    });

    it('should render a cursor span regardless of typing state', () => {
      const { container } = render(<Typewriter />);
      const cursorEl = container.querySelector('span > span:nth-child(2)');
      expect(cursorEl).toBeInTheDocument();
    });

    it('should not have visible text initially (empty string)', () => {
      const { container } = render(<Typewriter />);
      const textSpan = container.querySelector('span > span:first-child') as HTMLSpanElement;
      expect(textSpan.textContent?.length).toBe(0);
    });
  });

  // ---- ERROR CASES ----
  describe('error cases', () => {
    it('should not throw when unmounted mid-animation', async () => {
      const { unmount } = render(<Typewriter />);
      expect(async () => {
        await act(async () => {
          vi.advanceTimersByTime(80);
          unmount();
          vi.advanceTimersByTime(80);
        });
      }).not.toThrow();
    });
  });
});
