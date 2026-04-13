import { describe, it, expect } from 'vitest';
import { validateContactForm, type ContactFormData } from './validation';

describe('validateContactForm — extended edge cases', () => {
  const validBase: ContactFormData = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    service: 'landing',
    desc: 'Build me a great site',
  };

  // ---- HAPPY PATH ----
  describe('happy path', () => {
    it('should accept all valid optional fields', () => {
      const data: ContactFormData = {
        ...validBase,
        company: 'Acme Corp',
        heard: 'google',
      };
      const errors = validateContactForm(data);
      expect(Object.keys(errors).length).toBe(0);
    });
  });

  // ---- EMAIL EDGE CASES ----
  describe('email edge cases', () => {
    it('should reject email missing @ symbol', () => {
      const errors = validateContactForm({ ...validBase, email: 'notanemail.com' });
      expect(errors.email).toBe('Please enter a valid email');
    });

    it('should reject email missing domain extension', () => {
      const errors = validateContactForm({ ...validBase, email: 'user@domain' });
      expect(errors.email).toBe('Please enter a valid email');
    });

    it('should reject email that is only spaces', () => {
      const errors = validateContactForm({ ...validBase, email: '   ' });
      expect(errors.email).toBe('Email is required');
    });

    it('should accept email with subdomain', () => {
      const errors = validateContactForm({ ...validBase, email: 'user@mail.example.co.uk' });
      expect(errors.email).toBeUndefined();
    });

    it('should accept email with plus tag', () => {
      const errors = validateContactForm({ ...validBase, email: 'user+tag@example.com' });
      expect(errors.email).toBeUndefined();
    });

    it('should reject empty email string', () => {
      const errors = validateContactForm({ ...validBase, email: '' });
      expect(errors.email).toBe('Email is required');
    });
  });

  // ---- NAME EDGE CASES ----
  describe('name edge cases', () => {
    it('should reject single-tab character as name', () => {
      const errors = validateContactForm({ ...validBase, name: '\t' });
      expect(errors.name).toBe('Name is required');
    });

    it('should accept single character name', () => {
      const errors = validateContactForm({ ...validBase, name: 'X' });
      expect(errors.name).toBeUndefined();
    });

    it('should accept name with special unicode characters', () => {
      const errors = validateContactForm({ ...validBase, name: 'José García' });
      expect(errors.name).toBeUndefined();
    });
  });

  // ---- SERVICE EDGE CASES ----
  describe('service edge cases', () => {
    it('should reject empty service selection', () => {
      const errors = validateContactForm({ ...validBase, service: '' });
      expect(errors.service).toBe('Please select a service');
    });

    it('should accept any non-empty service string', () => {
      const errors = validateContactForm({ ...validBase, service: 'custom-plan' });
      expect(errors.service).toBeUndefined();
    });
  });

  // ---- DESC EDGE CASES ----
  describe('description edge cases', () => {
    it('should reject description with only newlines', () => {
      const errors = validateContactForm({ ...validBase, desc: '\n\n\n' });
      expect(errors.desc).toBe('Please describe your project');
    });

    it('should accept a single character description', () => {
      const errors = validateContactForm({ ...validBase, desc: '.' });
      expect(errors.desc).toBeUndefined();
    });
  });

  // ---- MULTIPLE ERRORS ----
  describe('multiple error accumulation', () => {
    it('should return all 4 errors simultaneously when everything is empty', () => {
      const data = { name: '', email: '', service: '', desc: '' } as ContactFormData;
      const errors = validateContactForm(data);
      expect(Object.keys(errors).length).toBe(4);
      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.service).toBeDefined();
      expect(errors.desc).toBeDefined();
    });
  });
});
