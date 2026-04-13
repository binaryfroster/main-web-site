import { describe, it, expect } from 'vitest';
import { filterServices, type ServiceItem } from './filtering';

describe('filterServices', () => {
  const mockServices: ServiceItem[] = [
    { title: "React App", cat: "Web Development", desc: "A modern web app", price: "£100", icon: "💻", tags: [] },
    { title: "AI Chatbot", cat: "AI & Automation", desc: "Intelligent bot", price: "£200", icon: "💬", tags: [] },
    { title: "Shopify Store", cat: "E-commerce", desc: "Sell anything", price: "£150", icon: "🛍️", tags: [] },
  ];

  // ---- HAPPY PATH ----
  it('should return all services when category is "All" and search is empty', () => {
    const result = filterServices(mockServices, "All", "");
    expect(result.length).toBe(3);
  });

  // ---- EDGE CASES ----
  it('should filter by category correctly', () => {
    const result = filterServices(mockServices, "AI & Automation", "");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("AI Chatbot");
  });

  it('should filter by search query case-insensitivity', () => {
    const result = filterServices(mockServices, "All", "react");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("React App");
  });

  it('should search within descriptions', () => {
    const result = filterServices(mockServices, "All", "intelligent");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("AI Chatbot");
  });

  // ---- ERROR CASES ----
  it('should return an empty array when no matches are found', () => {
    const result = filterServices(mockServices, "All", "nonexistent-service");
    expect(result.length).toBe(0);
  });
});
