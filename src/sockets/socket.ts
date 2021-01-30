const { io } = require('../index');




// Mensajes de Sockets
io.on('connection', function(client: any) {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', function(payload: any) {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });
});
