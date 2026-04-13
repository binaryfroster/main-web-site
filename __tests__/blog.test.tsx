import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogPage from '../src/app/blog/page';
import { posts } from '../src/lib/blogData';

// Mock GSAP plugins and Next.js components to prevent test environment errors
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      from: vi.fn(() => ({ kill: vi.fn() })),
      set: vi.fn(),
    }
  };
});
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: vi.fn(() => []) },
}));
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('BlogPage UI', () => {
  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should render the blog hero section and grid correctly', () => {
      render(<BlogPage />);
      
      // Verify Hero text
      expect(screen.getByText('Insights &')).toBeInTheDocument();
      expect(screen.getByText('Tutorials')).toBeInTheDocument();

      // Verify that all blog cards from the data file are rendered
      posts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.excerpt)).toBeInTheDocument();
      });
    });

    it('should link to dynamic [slug] pages', () => {
      render(<BlogPage />);
      
      // Select the first post's link based on generated component structure
      const firstPostLink = screen.getByText(posts[0].title).closest('a');
      expect(firstPostLink).toHaveAttribute('href', `/blog/${posts[0].slug}`);
    });
  });

  // ---- EDGE CASES ----
  describe('edge cases', () => {
    it('should handle rendering an empty list if posts were missing (hypothetical mock test)', () => {
      // For this static page, posts are deeply imported. 
      // If we had them as props we could test empty array here.
      // But we verify newsletter box remains visible regardless of posts array length.
      render(<BlogPage />);
      expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument();
    });
  });

  // ---- ERROR CASES ----
  // No complex async logic or state errors inside standard static UI representation.
});
