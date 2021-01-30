"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var response = require("express").response;
var validarCampos = function (req, res, next) {
    if (res === void 0) { res = response; }
    var errores = express_validator_1.validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }
    next();
};
module.exports = {
    validarCampos: validarCampos
};
