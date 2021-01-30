"use strict";
var jwt = require('jsonwebtoken');
var generarJWT = function (id) {
    return new Promise(function (resolve, reject) {
        var payload = { id: id };
        jwt.sign(payload, "hajj!!SemillallsjrmjhNODeopqjn,333", {
            expiresIn: '24h'
        }, function (err, token) {
            if (err) {
                reject('No se pudo generar el JWT');
            }
            else {
                // Token
                resolve(token);
            }
        });
    });
};
module.exports = {
    generarJWT: generarJWT
};
