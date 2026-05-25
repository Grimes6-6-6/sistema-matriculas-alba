const express = require('express');
const router = express.Router();
const docentePortalController = require('../controllers/docentePortal.controller');
const { verifyDocenteToken } = require('../middleware/docenteAuth.middleware');
const { validateBody, validateParams, validateQuery } = require('../middleware/validateRequest');
const {
  asistenciaBody,
  asistenciaCursoParam,
  asistenciaQuery,
  docenteLoginBody,
  idParam
} = require('../middleware/validationSchemas');

router.post('/login', validateBody(docenteLoginBody), docentePortalController.loginDocente);

router.use(verifyDocenteToken);
router.get('/cursos', docentePortalController.getCursos);
router.get('/cursos/:id/estudiantes', validateParams(idParam), validateQuery(asistenciaQuery), docentePortalController.getEstudiantesAsistencia);
router.post('/cursos/:curso_id/asistencias', validateParams(asistenciaCursoParam), validateBody(asistenciaBody), docentePortalController.marcarAsistencia);

module.exports = router;
