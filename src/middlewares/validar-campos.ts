import { validationResult } from 'express-validator';
const { response } = require("express");


const validarCampos = (req: Request, res = response, next: () => void) =>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampos
}
