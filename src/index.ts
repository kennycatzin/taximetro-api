import router from './router/router';
import Server from './server/server';
import MySQL from './mysql/mysql';

const express = require('express');
const path = require('path');

const server = Server.init(3000);
// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());
const servidor = require('http').createServer(app);

server.app.use(router);
module.exports.io = require('socket.io')(servidor);

MySQL.instance;

server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});