"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var router = Router();
var getHorario = require('../controllers/usuario_controller').getHorario;
router.get('/camino', getHorario);
exports.default = router;
