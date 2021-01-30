"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require('jsonwebtoken');
var validarJWT = function (req, res, next) {
    if (res === void 0) { res = express_1.response; }
    var token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        var id = jwt.verify(token, "hajj!!SemillallsjrmjhNODeopqjn,333").id;
        req.id = id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};
module.exports = {
    validarJWT: validarJWT
};
