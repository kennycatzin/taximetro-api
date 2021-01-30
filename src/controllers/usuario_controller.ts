import { Request} from 'express';
import MySQL from '../mysql/mysql';
const { response } = require("express");
const { generarJWT } = require("./../helpers/jwt");

var dateFormat = require('dateformat');
const bcrypt = require('bcrypt');

const registroUsuarios = async(req: Request, res = response) => {
    const { name, email, usuario, imagen, id_operador, password} = req.body;
    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync(password, salt);
    const fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    const query = `
        insert into users (
            name, email, password, created_at,
             updated_at, activo, usuario, imagen, id_operador
        ) VALUES
        ("${name}", "${email}", "${pass}", "${fecha}", "${fecha}", 
        1, "${usuario}", "${imagen}", ${id_operador})
    `;
    MySQL.ejecutarQuery(query, async (err: any, data: Object[])=>{
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        }else{
            // const token = await generarJWT(20);
            res.json({
                ok: true,
                msg: 'Registro guardado',
            })
        }
    });
}
const login = async(req: Request, res = response) => {

    const usuario = req.body.usuario;
    const password = req.body.password;
    const tarifas = {
        "tarifa_minima": 25,
        "banderazo": 5,
        "intervalo_tiempo": 60,
        "intervalo_distancia": 30,
        "tarifa_tiempo": 2.5,
        "horarios": [
            {
                "id_horario": 1,
                "nombre": "Día",
                "hora_inicial": "06:00:00",
                "hora_final": "17:59:59",
                "detalle_horario": [
                    {
                        "orden": 1,
                        "precio": 10,
                        "km_inicial": 0,
                        "km_final": 2
                    },
                    {
                        "orden": 2,
                        "precio": 9.5,
                        "km_inicial": 2.01,
                        "km_final": 5000
                    }
                ]
            },
            {
                "id_horario": 2,
                "nombre": "Noche",
                "hora_inicial": "18:00:00",
                "hora_final": "23:00:00",
                "detalle_horario": [
                    {
                        "orden": 1,
                        "precio": 10,
                        "km_inicial": 0,
                        "km_final": 2
                    },
                    {
                        "orden": 2,
                        "precio": 9.5,
                        "km_inicial": 2.01,
                        "km_final": 5000
                    }
                ]
            }
        ]
    };
    const query = `
        select u.password,u.id_operador, vwo.OperadorID, 
        u.id, u.imagen, vwo.NumEconomico, vwo.TituloSindical, 
        CONCAT(vwo.Nombre,' ',vwo.ApellidoPaterno) AS nombre, u.status as status
        from users u inner join vw_catoperadores vwo on vwo.OperadorID = u.id_operador
        where u.usuario = "${usuario}"
    `;
    MySQL.ejecutarQuery(query, async (err: any, data: any[])=>{
        if(err){
            res.status(400).json({
                ok: 'null',
                mensaje: 'Usuario no encontrado',
                error: err
            });
        }else{
            console.log(password);
            console.log(data[0]["password"]);
            const validPassword = bcrypt.compareSync(password, data[0]["password"]);
            console.log("mi valida" + validPassword);
            if(validPassword === false){
                return res.status(400).json({
                    ok: 'no',
                    mensaje: 'Acceso incorrecto'
                });
            }else{
                const estatus = data[0]["activo"];
                if(estatus == 0){
                    return res.json({
                        ok: 'pago',
                        mensaje: 'Favor de realizar el pago'
                    })
                }else{
                    const miID = data[0]["id"];
                    const token = await generarJWT(miID);
                    data[0]['imagen'] = "https://sistemaya.com/Taxis/fotos_operadores/F"+data[0]['id_operador']+".jpg";
                    return res.json({
                        ok: true,
                        operador: data[0],
                        token: token,
                        tarifas: tarifas
                    });
                }
            }
        }
    });
}
const renewToken = async (req: Request, res = response)=>{
    const miId = req.id;
    const tarifas = {
        "tarifa_minima": 25,
        "banderazo": 5,
        "intervalo_tiempo": 60,
        "intervalo_distancia": 30,
        "tarifa_tiempo": 2.5,
        "horarios": [
            {
                "id_horario": 1,
                "nombre": "Día",
                "hora_inicial": "06:00:00",
                "hora_final": "17:59:59",
                "detalle_horario": [
                    {
                        "orden": 1,
                        "precio": 10,
                        "km_inicial": 0,
                        "km_final": 2
                    },
                    {
                        "orden": 2,
                        "precio": 9.5,
                        "km_inicial": 2.01,
                        "km_final": 5000
                    }
                ]
            },
            {
                "id_horario": 2,
                "nombre": "Noche",
                "hora_inicial": "18:00:00",
                "hora_final": "23:00:00",
                "detalle_horario": [
                    {
                        "orden": 1,
                        "precio": 10,
                        "km_inicial": 0,
                        "km_final": 2
                    },
                    {
                        "orden": 2,
                        "precio": 9.5,
                        "km_inicial": 2.01,
                        "km_final": 5000
                    }
                ]
            }
        ]
    };
    const query = `
        select u.password,u.id_operador, vwo.OperadorID, 
        u.id, u.imagen, vwo.NumEconomico, vwo.TituloSindical, 
        CONCAT(vwo.Nombre,' ',vwo.ApellidoPaterno) AS nombre, u.status as status
        from users u inner join vw_catoperadores vwo on vwo.OperadorID = u.id_operador
        where u.id = ${miId}
    `;
    MySQL.ejecutarQuery(query, async (err: any, data: any[])=>{
        if(err){
            res.status(400).json({
                ok: 'null',
                mensaje: 'Usuario no encontrado',
                error: err
            });
        }else{

                const estatus = data[0]["activo"];
                if(estatus == 0){
                    return res.json({
                        ok: 'pago',
                        mensaje: 'Favor de realizar el pago'
                    })
                }else{
                    const miID = data[0]["id"];
                    const token = await generarJWT(miID);
                    return res.json({
                        ok: true,
                        operador: data[0],
                        token: token,
                        tarifas: tarifas
                    });
            }
        }
    });
}
const actualizarPassword = (req:Request, res = response) => {
    const password = req.body.password;
    const miID = req.body.id;
    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync(password, salt);
    const fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    const query = `
        update  users set updated_at = "${fecha}", 
        password = "${pass}"
        where id_operador = ${miID}
    `;
    MySQL.ejecutarQuery(query, async (err: any, data: Object[])=>{
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        }else{
            // const token = await generarJWT(20);
            res.json({
                ok: true,
                msg: 'Registro actualizado',
            })
        }
    });


}
module.exports = {
    registroUsuarios,
    login,
    renewToken,
    actualizarPassword
}