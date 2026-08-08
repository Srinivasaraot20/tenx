// utils/validation.js

/** Simple sanitization: trim and escape basic HTML characters */
function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const validators = {
  fullName: (v) => /^[A-Za-z\s]{2,100}$/.test(v),
  email: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
  phone: (v) => /^[0-9+()\-\s]{5,20}$/.test(v),
  company: (v) => /^.{2,100}$/.test(v),
  selectedService: (v) => v && v.length > 0,
  budget: (v) => /^\$?\d+(,\d{3})*(\.\d{2})?$/.test(v) || v === '',
  website: (v) => v === '' || /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]*$/.test(v),
  city: (v) => v && v.length > 0,
  state: (v) => v && v.length > 0,
  country: (v) => v && v.length > 0,
  message: (v) => v && v.length >= 10,
};

export function validateForm(formName, payload) {
  const errors = {};
  const sanitized = {};
  for (const key in validators) {
    const raw = payload[key] ?? '';
    const clean = sanitize(raw);
    sanitized[key] = clean;
    if (!validators[key](clean)) {
      errors[key] = `${key} is invalid`;
    }
  }
  // optional fields are left as‑is (website, budget)
  const isValid = Object.keys(errors).length === 0;
  return { valid: isValid, errors, data: { ...sanitized, formName } };
}

