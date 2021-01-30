import { Request} from 'express';
import MySQL from '../mysql/mysql';
var dateFormat = require('dateformat');
const { response } = require("express");

const getMensajes = async(req: Request, res = response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);
    var datetime = dateFormat(new Date(), "yyyy-mm-dd");
    const query = `
        Select m.id_mensaje, m.titulo, m.mensaje, m.tipo, 
        u.name, m.id_status, ce.Estatus
        from mensaje m
        inner join users u on u.id = m.id_origen
        inner join gen_catestatus ce on ce.EstatusID = m.id_status
        where m.fecha_creacion BETWEEN "${datetime} 00:00:00" and "${datetime} 23:59:59"
        and m.id_destino = ${escapeId}
        and m.activo = true  
        order by m.fecha_creacion DESC;
    `;
    MySQL.ejecutarQuery(query, (err: any, mensajes: Object[])=>{
        if(err){
            res.status(200).json({
                ok: false,
                mensajes: [],
                error: err
            });
        }else{
            res.json({
                ok: true,
                mensajes: mensajes
            })
        }
    });
}
const getDetalleMensaje = async(req: Request, res = response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);
    var datetime = dateFormat(new Date(), "yyyy-mm-dd");
    const query = `
        Select m.id_mensaje, m.titulo, m.mensaje, m.tipo, u.name
        from mensaje m
        inner join users u on u.id = m.id_origen
        where m.id_mensaje = ${escapeId};
    `;
    MySQL.ejecutarQuery(query, (err: any, mensaje: Object[])=>{
        if(err){
            res.status(200).json({
                ok: false,
                data: [],
                error: err
            });
        }else{
            res.json({
                ok: true,
                mensaje: mensaje
            })
        }
    });
}
const mensajeVisto = async(req: Request, res = response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);
    const fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    const id_status = 13;
    const query = `
        update mensaje set id_status = ${id_status},
        fecha_modificacion = "${fecha}"
        where id_mensaje = ${escapeId}
    `;
    MySQL.ejecutarQuery(query, (err: any, data: Object[])=>{
        if(err){
            res.status(200).json({
                ok: false,
                data: [],
                error: err
            });
        }else{
            console.log('Mensaje visto');
            res.json({
                ok: true,
                msg: 'Registro actualizado'
            })
        }
    });
}
const storeMensaje = async(req: Request, res = response) => {
    const { id_origen, id_destino, titulo, mensaje, tipo} = req.body;
    const fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    const id_status = 5;
    const query = `
        insert into mensaje (
            id_origen, id_destino, id_status, titulo, mensaje, tipo,
             activo, fecha_creacion, fecha_modificacion, usuario_creacion,
             usuario_modificacion
        ) VALUES
        (${id_origen}, ${id_destino}, ${id_status}, "${titulo}", "${mensaje}", 
        ${tipo}, true, "${fecha}", "${fecha}", ${id_origen}, ${id_origen})
    `;
    MySQL.ejecutarQuery(query, (err: any, data: Object[])=>{
        if(err){
            res.status(200).json({
                ok: false,
                data: [],
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
    storeMensaje,
    getMensajes,
    getDetalleMensaje,
    mensajeVisto
    
}