"use strict";
var io = require('../index').io;
// Mensajes de Sockets
io.on('connection', function (client) {
    console.log('Cliente conectado');
    client.on('disconnect', function () {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', function (payload) {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
});
