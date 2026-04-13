export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  desc: string;
  heard?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  desc?: string;
}

export const validateContactForm = (formData: ContactFormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }
  
  if (!formData.service) {
    errors.service = "Please select a service";
  }
  
  if (!formData.desc.trim()) {
    errors.desc = "Please describe your project";
  }
  
  return errors;
};
