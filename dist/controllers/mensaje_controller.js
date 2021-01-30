"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var dateFormat = require('dateformat');
var response = require("express").response;
var getMensajes = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, escapeId, datetime, query;
        return __generator(this, function (_a) {
            id = req.params.id;
            escapeId = mysql_1.default.instance.cnn.escape(id);
            datetime = dateFormat(new Date(), "yyyy-mm-dd");
            query = "\n        Select m.id_mensaje, m.titulo, m.mensaje, m.tipo, \n        u.name, m.id_status, ce.Estatus\n        from mensaje m\n        inner join users u on u.id = m.id_origen\n        inner join gen_catestatus ce on ce.EstatusID = m.id_status\n        where m.fecha_creacion BETWEEN \"" + datetime + " 00:00:00\" and \"" + datetime + " 23:59:59\"\n        and m.id_destino = " + escapeId + "\n        and m.activo = true  \n        order by m.fecha_creacion DESC;\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, mensajes) {
                if (err) {
                    res.status(200).json({
                        ok: false,
                        mensajes: [],
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        mensajes: mensajes
                    });
                }
            });
            return [2 /*return*/];
        });
    });
};
var getDetalleMensaje = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, escapeId, datetime, query;
        return __generator(this, function (_a) {
            id = req.params.id;
            escapeId = mysql_1.default.instance.cnn.escape(id);
            datetime = dateFormat(new Date(), "yyyy-mm-dd");
            query = "\n        Select m.id_mensaje, m.titulo, m.mensaje, m.tipo, u.name\n        from mensaje m\n        inner join users u on u.id = m.id_origen\n        where m.id_mensaje = " + escapeId + ";\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, mensaje) {
                if (err) {
                    res.status(200).json({
                        ok: false,
                        data: [],
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        mensaje: mensaje
                    });
                }
            });
            return [2 /*return*/];
        });
    });
};
var mensajeVisto = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, escapeId, fecha, id_status, query;
        return __generator(this, function (_a) {
            id = req.params.id;
            escapeId = mysql_1.default.instance.cnn.escape(id);
            fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            id_status = 13;
            query = "\n        update mensaje set id_status = " + id_status + ",\n        fecha_modificacion = \"" + fecha + "\"\n        where id_mensaje = " + escapeId + "\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, data) {
                if (err) {
                    res.status(200).json({
                        ok: false,
                        data: [],
                        error: err
                    });
                }
                else {
                    console.log('Mensaje visto');
                    res.json({
                        ok: true,
                        msg: 'Registro actualizado'
                    });
                }
            });
            return [2 /*return*/];
        });
    });
};
var storeMensaje = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, id_origen, id_destino, titulo, mensaje, tipo, fecha, id_status, query;
        return __generator(this, function (_b) {
            _a = req.body, id_origen = _a.id_origen, id_destino = _a.id_destino, titulo = _a.titulo, mensaje = _a.mensaje, tipo = _a.tipo;
            fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            id_status = 5;
            query = "\n        insert into mensaje (\n            id_origen, id_destino, id_status, titulo, mensaje, tipo,\n             activo, fecha_creacion, fecha_modificacion, usuario_creacion,\n             usuario_modificacion\n        ) VALUES\n        (" + id_origen + ", " + id_destino + ", " + id_status + ", \"" + titulo + "\", \"" + mensaje + "\", \n        " + tipo + ", true, \"" + fecha + "\", \"" + fecha + "\", " + id_origen + ", " + id_origen + ")\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, data) {
                if (err) {
                    res.status(200).json({
                        ok: false,
                        data: [],
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        msg: 'Registro guardado'
                    });
                }
            });
            return [2 /*return*/];
        });
    });
};
module.exports = {
    storeMensaje: storeMensaje,
    getMensajes: getMensajes,
    getDetalleMensaje: getDetalleMensaje,
    mensajeVisto: mensajeVisto
};
