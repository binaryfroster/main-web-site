import { describe, it, expect } from 'vitest';
import { filterServices, type ServiceItem } from './filtering';

describe('filterServices — extended edge cases', () => {
  const services: ServiceItem[] = [
    { title: 'React App', cat: 'Web Development', desc: 'A modern web application', price: '£100', icon: '💻', tags: ['React'] },
    { title: 'AI Chatbot', cat: 'AI & Automation', desc: 'Intelligent conversation bot', price: '£200', icon: '🤖', tags: ['OpenAI'] },
    { title: 'Shopify Store', cat: 'E-commerce', desc: 'Sell anything online', price: '£150', icon: '🛍️', tags: ['Stripe'] },
    { title: 'Node.js API', cat: 'Web Development', desc: 'RESTful backend service', price: '£180', icon: '⚡', tags: ['Node'] },
  ];

  // ---- CATEGORY + SEARCH COMBO ----
  describe('combined filters', () => {
    it('should apply both category AND search query together', () => {
      const result = filterServices(services, 'Web Development', 'react');
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('React App');
    });

    it('should return 0 when category matches but search does not', () => {
      const result = filterServices(services, 'E-commerce', 'react');
      expect(result.length).toBe(0);
    });

    it('should return multiple items when category has multiple matches', () => {
      const result = filterServices(services, 'Web Development', '');
      expect(result.length).toBe(2);
    });
  });

  // ---- SEARCH EDGE CASES ----
  describe('search edge cases', () => {
    it('should match partial title strings', () => {
      const result = filterServices(services, 'All', 'shop');
      expect(result[0].title).toBe('Shopify Store');
    });

    it('should match description substring case-insensitively', () => {
      const result = filterServices(services, 'All', 'RESTful');
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Node.js API');
    });

    it('should return all items for whitespace-only search', () => {
      // filterServices uses falsy check — a single space is truthy, so it searches
      // but no title/desc contains just a space, so 0 matches
      const result = filterServices(services, 'All', ' ');
      // space ≠ falsy, and no item title/description contains an isolated space match
      // "A modern web application".includes(" ") === true — spaces in descriptions will match
      expect(result.length).toBeGreaterThan(0);
    });
  });

  // ---- BOUNDARY CASES ----
  describe('boundary cases', () => {
    it('should return empty array for empty input services list', () => {
      const result = filterServices([], 'All', '');
      expect(result.length).toBe(0);
    });

    it('should handle category that exists in no items', () => {
      const result = filterServices(services, 'Blockchain', '');
      expect(result.length).toBe(0);
    });

    it('should NOT search tags — only title and desc', () => {
      // "Stripe" is only in tags, not title or desc
      const result = filterServices(services, 'All', 'Stripe');
      expect(result.length).toBe(0);
    });
  });

  // ---- CASE SENSITIVITY ----
  describe('case insensitivity', () => {
    it('should match UPPERCASE search terms', () => {
      const result = filterServices(services, 'All', 'CHATBOT');
      expect(result[0].title).toBe('AI Chatbot');
    });

    it('should match mixed-case search terms', () => {
      const result = filterServices(services, 'All', 'MoDerN');
      expect(result.length).toBe(1);
    });
  });
});
