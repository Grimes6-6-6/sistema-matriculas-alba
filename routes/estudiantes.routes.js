const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantes.controller');
const { validateBody, validateParams, validateQuery } = require('../middleware/validateRequest');
const {
  dniParam,
  estudianteBody,
  idParam,
  listEstadoQuery
} = require('../middleware/validationSchemas');

router.get('/', validateQuery(listEstadoQuery), estudiantesController.obtenerTodos);
router.get('/buscar/dni/:dni', validateParams(dniParam), estudiantesController.buscarPorDni);
router.get('/:id', validateParams(idParam), estudiantesController.obtenerPorId);
router.post('/', validateBody(estudianteBody), estudiantesController.crear);
router.put('/:id', validateParams(idParam), validateBody(estudianteBody), estudiantesController.actualizar);
router.delete('/:id', validateParams(idParam), estudiantesController.eliminar);
router.get('/:id/matriculas', validateParams(idParam), estudiantesController.obtenerMatriculas);
router.get('/:id/historial', validateParams(idParam), estudiantesController.obtenerHistorial);

module.exports = router;
