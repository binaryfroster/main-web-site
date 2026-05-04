import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
vi.stubGlobal('IntersectionObserver', class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
});

// Mock ResizeObserver
vi.stubGlobal('ResizeObserver', class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
});

// Mock GSAP ScrollTrigger globally to prevent uncaught exceptions
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
    create: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    kill: vi.fn(),
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
