const { errorResponse } = require('../utils/apiResponse');

const isEmpty = (value) => value === undefined || value === null || value === '';

const normalizeValue = (value, rules) => {
  if (rules.type === 'string' && typeof value === 'string') {
    return rules.trim === false ? value : value.trim();
  }

  return value;
};

const validateBody = (schema) => (req, res, next) => {
  const errors = {};
  const sanitized = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = normalizeValue(req.body[field], rules);

    if (rules.required && isEmpty(value)) {
      errors[field] = `${field} es obligatorio`;
      continue;
    }

    if (isEmpty(value)) {
      continue;
    }

    if (rules.type && typeof value !== rules.type) {
      errors[field] = `${field} tiene un formato no valido`;
      continue;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} debe tener al menos ${rules.minLength} caracteres`;
      continue;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} no debe superar ${rules.maxLength} caracteres`;
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.message || `${field} tiene un formato no valido`;
      continue;
    }

    sanitized[field] = value;
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse(res, 'Datos de entrada no validos', 400, { fields: errors });
  }

  req.body = sanitized;
  return next();
};

module.exports = {
  validateBody
};
