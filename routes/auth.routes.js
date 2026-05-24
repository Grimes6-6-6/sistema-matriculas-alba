// Rutas para autenticación
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validateRequest');

const loginSchema = {
  username: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9@._-]+$/,
    message: 'Usuario o email no valido'
  },
  password: {
    type: 'string',
    required: true,
    minLength: 6,
    maxLength: 200
  }
};

// Login
router.post('/login', validateBody(loginSchema), authController.login);

// Obtener perfil del usuario autenticado
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
