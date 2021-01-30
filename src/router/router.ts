import {response, Router} from 'express';
var express = require('express');
const { registroUsuarios, login, renewToken, actualizarPassword } = require('../controllers/usuario_controller');
const { getViajes, storeViajes } = require('../controllers/viaje_controller');
const { getMensajes, storeMensaje, getDetalleMensaje, mensajeVisto } = require('../controllers/mensaje_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('./../middlewares/validar-jwt');
var bodyParser = require('body-parser');
const {check} = require('express-validator');


const router = Router();
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
],registroUsuarios);
app.post('/api/login', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
],login);
app.get('/api/renovar-token', validarJWT, renewToken);
app.post('/api/actualizar-password', actualizarPassword);

app.get('/api/get-mensajes/:id', getMensajes);
app.get('/api/get-detalle-mensaje/:id', getDetalleMensaje);
app.post('/api/store-mensaje', storeMensaje);
app.get('/api/mensaje-visto/:id', mensajeVisto);


app.get('/api/get-viajes/:id', getViajes);
app.post('/api/store-viaje', storeViajes);





export default app;