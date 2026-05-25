const { errorResponse } = require('../utils/apiResponse');

const isEmpty = (value) => value === undefined || value === null || value === '';

const normalizeValue = (value, rules) => {
  if (isEmpty(value) && rules.emptyToNull) {
    return null;
  }

  if (rules.type === 'string' && typeof value === 'string') {
    return rules.trim === false ? value : value.trim();
  }

  return value;
};

const coerceValue = (value, rules) => {
  if (isEmpty(value)) {
    return value;
  }

  if (rules.coerce === 'integer') {
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : value;
  }

  if (rules.coerce === 'number') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : value;
  }

  return value;
};

const validateSource = (source, schema) => (req, res, next) => {
  const errors = {};
  const sanitized = {};
  const payload = req[source] || {};

  for (const [field, rules] of Object.entries(schema)) {
    const normalized = normalizeValue(payload[field], rules);
    const value = coerceValue(normalized, rules);

    if (rules.required && isEmpty(value)) {
      errors[field] = `${field} es obligatorio`;
      continue;
    }

    if (isEmpty(value)) {
      if (rules.emptyToNull) {
        sanitized[field] = null;
      }
      continue;
    }

    if (rules.type === 'integer') {
      if (!Number.isInteger(value)) {
        errors[field] = `${field} debe ser un numero entero`;
        continue;
      }
    } else if (rules.type === 'number') {
      if (typeof value !== 'number' || Number.isNaN(value)) {
        errors[field] = `${field} debe ser un numero valido`;
        continue;
      }
    } else if (rules.type && typeof value !== rules.type) {
      errors[field] = `${field} tiene un formato no valido`;
      continue;
    }

    if (rules.min !== undefined && Number(value) < rules.min) {
      errors[field] = `${field} debe ser mayor o igual a ${rules.min}`;
      continue;
    }

    if (rules.max !== undefined && Number(value) > rules.max) {
      errors[field] = `${field} debe ser menor o igual a ${rules.max}`;
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

    if (rules.enum && !rules.enum.includes(value)) {
      errors[field] = rules.message || `${field} no es una opcion permitida`;
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.message || `${field} tiene un formato no valido`;
      continue;
    }

    if (rules.date && Number.isNaN(new Date(value).getTime())) {
      errors[field] = `${field} debe ser una fecha valida`;
      continue;
    }

    sanitized[field] = value;
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse(res, 'Datos de entrada no validos', 400, { fields: errors });
  }

  req[source] = {
    ...payload,
    ...sanitized
  };
  return next();
};

module.exports = {
  validateBody: (schema) => validateSource('body', schema),
  validateParams: (schema) => validateSource('params', schema),
  validateQuery: (schema) => validateSource('query', schema)
};
