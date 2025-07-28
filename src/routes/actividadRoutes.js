const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');

router.get('/estatus/:estatus', actividadController.getActividadByEstatus);
router.get('/', actividadController.getActividades);
router.get('/:id', actividadController.getActividadById);
router.post('/', actividadController.crearActividad);
router.put('/:id', actividadController.actualizarActividad);
router.delete('/:id', actividadController.eliminarActividad);


module.exports = router;