const jwt = require('jsonwebtoken');

const generarJWT = (id: number) => {
    return new Promise((resolve, reject)=>{
        const payload = {id};
        jwt.sign(payload, "hajj!!SemillallsjrmjhNODeopqjn,333", {
            expiresIn: '24h'
        }, (err: any, token: any)=>{
            if(err){
                reject ('No se pudo generar el JWT');
            }else{
                // Token
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}