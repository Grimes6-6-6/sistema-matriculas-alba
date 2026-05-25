const express = require('express');
const router = express.Router();
const matriculasController = require('../controllers/matriculas.controller');
const { validateBody, validateParams, validateQuery } = require('../middleware/validateRequest');
const {
  estudianteIdParam,
  idParam,
  matriculaCreateBody,
  matriculaUpdateBody,
  matriculasQuery
} = require('../middleware/validationSchemas');

router.get('/', validateQuery(matriculasQuery), matriculasController.obtenerTodas);
router.get('/estudiante/:estudiante_id', validateParams(estudianteIdParam), matriculasController.obtenerPorEstudiante);
router.get('/:id', validateParams(idParam), matriculasController.obtenerPorId);
router.post('/', validateBody(matriculaCreateBody), matriculasController.crear);
router.put('/:id', validateParams(idParam), validateBody(matriculaUpdateBody), matriculasController.actualizar);
router.delete('/:id', validateParams(idParam), matriculasController.cancelar);
router.get('/:id/pagos', validateParams(idParam), matriculasController.obtenerPagos);

module.exports = router;
