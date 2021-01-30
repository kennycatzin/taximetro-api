const { Router } = require('express');
const router = Router();
const { getHorario } = require('../controllers/usuario_controller');




router.get('/camino', getHorario);

export default router;
