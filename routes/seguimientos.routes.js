const express = require('express');
const router = express.Router();
const seguimientosController = require('../controllers/seguimientos.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { validateBody, validateParams } = require('../middleware/validateRequest');
const {
  estudianteIdCamelParam,
  seguimientoBody
} = require('../middleware/validationSchemas');

router.get('/estudiante/:estudianteId', verifyToken, validateParams(estudianteIdCamelParam), seguimientosController.obtenerPorEstudiante);
router.post('/', verifyToken, validateBody(seguimientoBody), seguimientosController.crear);

module.exports = router;
