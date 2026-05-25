const express = require('express');
const router = express.Router();
const docentesController = require('../controllers/docentes.controller');
const { validateBody, validateParams, validateQuery } = require('../middleware/validateRequest');
const {
  docenteBody,
  idParam,
  listEstadoQuery
} = require('../middleware/validationSchemas');

router.get('/', validateQuery(listEstadoQuery), docentesController.obtenerTodos);
router.get('/:id', validateParams(idParam), docentesController.obtenerPorId);
router.post('/', validateBody(docenteBody), docentesController.crear);
router.put('/:id', validateParams(idParam), validateBody(docenteBody), docentesController.actualizar);
router.delete('/:id', validateParams(idParam), docentesController.eliminar);

module.exports = router;
