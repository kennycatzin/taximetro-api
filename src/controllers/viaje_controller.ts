import { Request} from 'express';
import MySQL from '../mysql/mysql';
var dateFormat = require('dateformat');
const { response } = require("express");





const getViajes = async(req: Request, res = response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);
    var datetime = dateFormat(new Date(), "yyyy-mm-dd");
    const query = `
        Select *
        from viaje
        where fecha_creacion BETWEEN "${datetime} 00:00:00" and "${datetime} 23:59:59"
        and id_chofer = ${escapeId}
        and activo = true  
        order by fecha_creacion DESC;
    `;
    MySQL.ejecutarQuery(query, (err: any, viajes: Object[])=>{
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        }else{
            res.json({
                ok: true,
                data: viajes
            })
        }
    });
}
const storeViajes = async(req: Request, res = response) => {
    const { km, hora_inicio, hora_termino, precio, id_chofer} = req.body;
    const fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    const query = `
        insert into viaje (
            km, hora_inicio, hora_termino, precio, id_chofer, usuario_creacion,
             usuario_modificacion, fecha_creacion, fecha_modificacion, activo
        ) VALUES
        (${km}, "${hora_inicio}", "${hora_termino}", ${precio}, ${id_chofer}, 
        ${id_chofer}, ${id_chofer}, "${fecha}", "${fecha}", 1)
    `;
    console.log(query);
    MySQL.ejecutarQuery(query, (err: any, viajes: Object[])=>{
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        }else{
            res.json({
                ok: true,
                msg: 'Registro guardado'
            })
        }
    });
}
module.exports = {
    storeViajes,
    getViajes,
    
}