const express = require('express');
const router = express.Router();
const ciclosController = require('../controllers/ciclos.controller');
const { validateBody, validateParams } = require('../middleware/validateRequest');
const {
  cicloCreateBody,
  cicloEstadoBody,
  idParam
} = require('../middleware/validationSchemas');

router.get('/', ciclosController.obtenerTodos);
router.post('/', validateBody(cicloCreateBody), ciclosController.crear);
router.put('/:id/estado', validateParams(idParam), validateBody(cicloEstadoBody), ciclosController.cambiarEstado);
router.delete('/:id', validateParams(idParam), ciclosController.eliminar);

module.exports = router;
