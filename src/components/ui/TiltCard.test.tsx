import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TiltCard from './TiltCard';

describe('TiltCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should render children correctly', () => {
    render(<TiltCard>Content</TiltCard>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should apply tilt transform on mouse move', () => {
    const { container } = render(<TiltCard>Content</TiltCard>);
    const card = container.firstChild as HTMLDivElement;

    // Mock getBoundingClientRect
    card.getBoundingClientRect = () => ({
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      bottom: 200,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    // Move to bottom right (dx=1, dy=1) -> rotX = -13, rotY = 13
    fireEvent.mouseMove(card, { clientX: 200, clientY: 200 });

    expect(card.style.transform).toContain('rotateX(-13deg)');
    expect(card.style.transform).toContain('rotateY(13deg)');
  });

  it('should show glare effect when enabled', () => {
    const { container } = render(<TiltCard glare={true}>Content</TiltCard>);
    const card = container.firstChild as HTMLDivElement;
    
    // Initial glare is invisible (opacity 0)
    const glareWrapper = container.querySelectorAll('div')[1]; // First child div is glare
    expect(glareWrapper.style.opacity).toBe('0');

    card.getBoundingClientRect = () => ({ width: 100, height: 100, top: 0, left: 0, bottom: 100, right: 100, x: 0, y: 0, toJSON: () => {} });
    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });

    expect(glareWrapper.style.opacity).toBe('1');
    expect(glareWrapper.style.background).toContain('radial-gradient');
  });

  it('should reset transform on mouse leave', async () => {
    const { container } = render(<TiltCard>Content</TiltCard>);
    const card = container.firstChild as HTMLDivElement;

    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });
    fireEvent.mouseLeave(card);

    // Should snap back to 0
    expect(card.style.transform).toContain('rotateX(0)');
    expect(card.style.transform).toContain('rotateY(0)');
    
    // Check if transition class is updated after timeout
    act(() => {
        vi.advanceTimersByTime(600);
    });
    
    expect(card.style.transition).toContain('0.05s');
  });

  it('should skip tilt if pointer is coarse (matchMedia)', () => {
    // Override matchMedia to return true for coarse pointer
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
        matches: query.includes('coarse'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })));

    const { container } = render(<TiltCard>Content</TiltCard>);
    const card = container.firstChild as HTMLDivElement;

    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });

    // Should stay at 0
    expect(card.style.transform).toContain('rotateX(0)');
    
    vi.unstubAllGlobals();
  });
});
