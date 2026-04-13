import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlassCard from './GlassCard';

describe('GlassCard', () => {
  it('should render children correctly', () => {
    render(
      <GlassCard>
        <span data-testid="child">Hello</span>
      </GlassCard>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should merge extra classNames', () => {
    const { container } = render(<GlassCard className="extra-class">Content</GlassCard>);
    expect(container.firstChild).toHaveClass('glass');
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('should update mouse custom properties on move', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const card = container.firstChild as HTMLDivElement;
    
    // Mock getBoundingClientRect
    card.getBoundingClientRect = () => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });
    
    expect(card.style.getPropertyValue('--mouse-x')).toBe('50%');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('50%');
  });

  it('should pass through extra div attributes', () => {
    render(<GlassCard id="test-id" data-testid="glass-card" data-custom="test-val">Content</GlassCard>);
    const element = screen.getByTestId('glass-card');
    expect(element).toHaveAttribute('id', 'test-id');
    expect(element).toHaveAttribute('data-custom', 'test-val');
  });
});
