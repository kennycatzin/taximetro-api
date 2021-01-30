import { response } from "express";

const jwt = require('jsonwebtoken');

const validarJWT = (req: Response, res = response, next: any)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try{
        const {id} = jwt.verify(token, "hajj!!SemillallsjrmjhNODeopqjn,333");
        req.id = id;
        next();
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}
module.exports = {
    validarJWT
}