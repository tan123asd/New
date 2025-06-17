import { useState } from 'react';

// Client-side validation utilities
export class ValidationService {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
  }

  static validatePassword(password, isStrict = false) {
    if (!password || !password.trim()) {
      return { isValid: false, message: 'Password is required' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    
    if (isStrict) {
      // Strict validation for registration
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return { 
          isValid: false, 
          message: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
        };
      }
    }
    
    return { isValid: true, message: '' };
  }

  static validateRequired(value, fieldName) {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return { isValid: false, message: `${fieldName} is required` };
    }
    return { isValid: true, message: '' };
  }

  static validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
    if (!phone || !phone.trim()) {
      return { isValid: false, message: 'Phone number is required' };
    }
    if (!phoneRegex.test(phone)) {
      return { isValid: false, message: 'Please enter a valid phone number' };
    }
    return { isValid: true, message: '' };
  }

  static validateName(name) {
    if (!name || !name.trim()) {
      return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    return { isValid: true, message: '' };
  }

  static validateForm(formData, validationRules) {
    const errors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const rules = validationRules[field];
      
      for (const rule of rules) {
        const result = rule(value);
        if (!result.isValid) {
          errors[field] = result.message;
          isValid = false;
          break; // Stop at first error for this field
        }
      }
    });

    return { isValid, errors };
  }
}

// Form validation hooks
export const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true, message: '' };

    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true, message: '' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const validation = validateField(name, value);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [name]: validation.message }));
    }
  };

  const validateForm = () => {
    const { isValid, errors: formErrors } = ValidationService.validateForm(formData, validationRules);
    setErrors(formErrors);
    return isValid;
  };

  const reset = () => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setFormData,
    setErrors,
    reset
  };
};

export default ValidationService;
