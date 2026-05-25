const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursos.controller');
const { validateBody, validateParams, validateQuery } = require('../middleware/validateRequest');
const {
  cursoBody,
  cursosQuery,
  disponibilidadQuery,
  idParam
} = require('../middleware/validationSchemas');

router.get('/', validateQuery(cursosQuery), cursosController.obtenerTodos);
router.get('/disponibles/lista', cursosController.obtenerDisponibles);
router.get('/disponibilidad', validateQuery(disponibilidadQuery), cursosController.obtenerDisponibilidadHorario);
router.get('/:id', validateParams(idParam), cursosController.obtenerPorId);
router.post('/', validateBody(cursoBody), cursosController.crear);
router.put('/:id', validateParams(idParam), validateBody(cursoBody), cursosController.actualizar);
router.delete('/:id', validateParams(idParam), cursosController.eliminar);

module.exports = router;
