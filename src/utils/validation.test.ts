import { describe, it, expect } from 'vitest';
import { validateContactForm, type ContactFormData } from './validation';

describe('validateContactForm', () => {
  const validData: ContactFormData = {
    name: "John Doe",
    email: "john@example.com",
    service: "landing",
    desc: "A cool new website"
  };

  // ---- HAPPY PATH ----
  it('should return no errors for valid data', () => {
    const errors = validateContactForm(validData);
    expect(Object.keys(errors).length).toBe(0);
  });

  // ---- EDGE CASES ----
  it('should validate email format', () => {
    const data = { ...validData, email: "invalid-email" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Please enter a valid email");
  });

  it('should handle whitespace-only strings as empty', () => {
    const data = { ...validData, name: "   " };
    const errors = validateContactForm(data);
    expect(errors.name).toBe("Name is required");
  });

  // ---- ERROR CASES ----
  it('should return errors for missing required fields', () => {
    const data = { name: "", email: "", service: "", desc: "" } as ContactFormData;
    const errors = validateContactForm(data);
    
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.service).toBe("Please select a service");
    expect(errors.desc).toBe("Please describe your project");
  });
});
