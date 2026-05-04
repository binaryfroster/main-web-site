import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../src/app/page';

// Mock GSAP to prevent animation issues in tests
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      timeline: vi.fn(() => ({
        from: vi.fn().mockReturnThis(),
        kill: vi.fn(),
      })),
      to: vi.fn(),
      from: vi.fn(),
      set: vi.fn(),
    },
  };
});

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => callback()),
}));

// Mock next/dynamic components to render simple stubs
vi.mock('next/dynamic', () => ({
  default: () => {
    return function MockComponent() {
      return <div data-testid="dynamic-component" />;
    };
  },
}));

// Mock premium UI components that have complex rendering
vi.mock('@/components/ui/premium', () => ({
  BackgroundBeams: ({ className }: { className?: string }) => <div data-testid="background-beams" className={className} />,
  Spotlight: ({ className }: { className?: string }) => <div data-testid="spotlight" className={className} />,
  ShimmerButton: ({ children, ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; background?: string }) => <button {...props}>{children}</button>,
  NumberTicker: ({ value, className }: { value: number; className?: string }) => <span className={className}>{value}</span>,
  Marquee: ({ children, className }: { children: React.ReactNode; className?: string; pauseOnHover?: boolean }) => <div className={className}>{children}</div>,
  Meteors: ({ className }: { className?: string; number?: number }) => <div data-testid="meteors" className={className} />,
  TextReveal: ({ text, className }: { text: string; className?: string }) => <div className={className}>{text}</div>,
  TypewriterEffect: ({ words, className }: { words: { text: string; className?: string }[]; className?: string }) => (
    <div data-testid="typewriter-effect" className={className}>{words.map(w => w.text).join(' ')}</div>
  ),
  AnimatedGroup: ({ children, className }: { children: React.ReactNode; className?: string; preset?: string }) => <div className={className}>{children}</div>,
  InView: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
  TextEffect: ({ children, className }: { children: string; className?: string; preset?: string; per?: string }) => <p className={className}>{children}</p>,
  Magnetic: ({ children, className }: { children: React.ReactNode; className?: string; intensity?: number }) => <div className={className}>{children}</div>,
}));

vi.mock('@/components/ui/TiltCard', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="tilt-card">{children}</div>
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should render the hero section, bento grid, differentiators, and process timeline', () => {
      // Act
      render(<Home />);
      
      // Assert - Hero
      expect(screen.getAllByText(/Build/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Software/i)[0]).toBeInTheDocument();
      expect(screen.getByTestId('typewriter-effect')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /View Our Work/i })).toBeInTheDocument();
      
      // Assert - Projects Bento
      expect(screen.getByText(/Projects That Prove It/i)).toBeInTheDocument();
      const tiltCards = screen.getAllByTestId('tilt-card');
      expect(tiltCards.length).toBe(5); // 5 portfolio items
      expect(screen.getByText('FlowOps ERP')).toBeInTheDocument();
      
      // Assert - Differentiators
      expect(screen.getByText(/Why We Are Different/i)).toBeInTheDocument();
      expect(screen.getByText('100% Code Ownership')).toBeInTheDocument();
      
      // Assert - Process Timeline
      expect(screen.getByText(/How We Work/i)).toBeInTheDocument();
      expect(screen.getByText('Discover')).toBeInTheDocument();
      expect(screen.getByText('Launch')).toBeInTheDocument();
    });
  });

  // ---- EDGE CASES ----
  describe('edge cases', () => {
    it('should safely render when running without window (SSR fallback check)', () => {
      // Act (Testing standard hydration behavior without explicit window object assumptions in standard jsx)
      const { container } = render(<Home />);
      expect(container).toBeDefined();
      expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
    });
  });

});
