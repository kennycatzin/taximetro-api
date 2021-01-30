"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express = require('express');
var _a = require('../controllers/usuario_controller'), registroUsuarios = _a.registroUsuarios, login = _a.login, renewToken = _a.renewToken, actualizarPassword = _a.actualizarPassword;
var _b = require('../controllers/viaje_controller'), getViajes = _b.getViajes, storeViajes = _b.storeViajes;
var _c = require('../controllers/mensaje_controller'), getMensajes = _c.getMensajes, storeMensaje = _c.storeMensaje, getDetalleMensaje = _c.getDetalleMensaje, mensajeVisto = _c.mensajeVisto;
var validarCampos = require('../middlewares/validar-campos').validarCampos;
var validarJWT = require('./../middlewares/validar-jwt').validarJWT;
var bodyParser = require('body-parser');
var check = require('express-validator').check;
var router = express_1.Router();
var app = express();
// router.post('/api/store-viaje',  function(req, res){
//     storeViaje
// });
// router.post('/api/store-viaje', storeViajes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/api/register', [
    check('usuario', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('id_operador', 'El id_operador es obligatorio').not().isEmpty(),
    validarCampos,
], registroUsuarios);
app.post('/api/login', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login);
app.get('/api/renovar-token', validarJWT, renewToken);
app.post('/api/actualizar-password', actualizarPassword);
app.get('/api/get-mensajes/:id', getMensajes);
app.get('/api/get-detalle-mensaje/:id', getDetalleMensaje);
app.post('/api/store-mensaje', storeMensaje);
app.get('/api/mensaje-visto/:id', mensajeVisto);
app.get('/api/get-viajes/:id', getViajes);
app.post('/api/store-viaje', storeViajes);
exports.default = app;
