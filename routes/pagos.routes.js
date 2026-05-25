const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagos.controller');
const { validateBody, validateParams } = require('../middleware/validateRequest');
const {
  idParam,
  pagoCreateBody
} = require('../middleware/validationSchemas');

router.get('/', pagosController.obtenerTodos);
router.get('/:id', validateParams(idParam), pagosController.obtenerPorId);
router.post('/', validateBody(pagoCreateBody), pagosController.registrar);
router.delete('/:id', validateParams(idParam), pagosController.anular);

module.exports = router;
