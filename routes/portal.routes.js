const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portal.controller');
const { verifyStudentToken } = require('../middleware/studentAuth.middleware');
const { validateBody } = require('../middleware/validateRequest');
const { portalLoginBody } = require('../middleware/validationSchemas');

router.post('/login', validateBody(portalLoginBody), portalController.loginEstudiante);

router.get('/perfil', verifyStudentToken, portalController.getMiPerfil);
router.get('/matriculas', verifyStudentToken, portalController.getMisMatriculas);
router.get('/pagos', verifyStudentToken, portalController.getMisPagos);
router.get('/horario', verifyStudentToken, portalController.getMiHorario);
router.get('/asistencias', verifyStudentToken, portalController.getMisAsistencias);

module.exports = router;
