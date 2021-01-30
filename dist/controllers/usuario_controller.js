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
var response = require("express").response;
var generarJWT = require("./../helpers/jwt").generarJWT;
var dateFormat = require('dateformat');
var bcrypt = require('bcrypt');
var registroUsuarios = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, usuario, imagen, id_operador, password, salt, pass, fecha, query;
        return __generator(this, function (_b) {
            _a = req.body, name = _a.name, email = _a.email, usuario = _a.usuario, imagen = _a.imagen, id_operador = _a.id_operador, password = _a.password;
            salt = bcrypt.genSaltSync();
            pass = bcrypt.hashSync(password, salt);
            fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            query = "\n        insert into users (\n            name, email, password, created_at,\n             updated_at, activo, usuario, imagen, id_operador\n        ) VALUES\n        (\"" + name + "\", \"" + email + "\", \"" + pass + "\", \"" + fecha + "\", \"" + fecha + "\", \n        1, \"" + usuario + "\", \"" + imagen + "\", " + id_operador + ")\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            error: err
                        });
                    }
                    else {
                        // const token = await generarJWT(20);
                        res.json({
                            ok: true,
                            msg: 'Registro guardado',
                        });
                    }
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
};
var login = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var usuario, password, tarifas, query;
        return __generator(this, function (_a) {
            usuario = req.body.usuario;
            password = req.body.password;
            tarifas = {
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
            query = "\n        select u.password,u.id_operador, vwo.OperadorID, \n        u.id, u.imagen, vwo.NumEconomico, vwo.TituloSindical, \n        CONCAT(vwo.Nombre,' ',vwo.ApellidoPaterno) AS nombre, u.status as status\n        from users u inner join vw_catoperadores vwo on vwo.OperadorID = u.id_operador\n        where u.usuario = \"" + usuario + "\"\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                var validPassword, estatus, miID, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!err) return [3 /*break*/, 1];
                            res.status(400).json({
                                ok: 'null',
                                mensaje: 'Usuario no encontrado',
                                error: err
                            });
                            return [3 /*break*/, 5];
                        case 1:
                            console.log(password);
                            console.log(data[0]["password"]);
                            validPassword = bcrypt.compareSync(password, data[0]["password"]);
                            console.log("mi valida" + validPassword);
                            if (!(validPassword === false)) return [3 /*break*/, 2];
                            return [2 /*return*/, res.status(400).json({
                                    ok: 'no',
                                    mensaje: 'Acceso incorrecto'
                                })];
                        case 2:
                            estatus = data[0]["activo"];
                            if (!(estatus == 0)) return [3 /*break*/, 3];
                            return [2 /*return*/, res.json({
                                    ok: 'pago',
                                    mensaje: 'Favor de realizar el pago'
                                })];
                        case 3:
                            miID = data[0]["id"];
                            return [4 /*yield*/, generarJWT(miID)];
                        case 4:
                            token = _a.sent();
                            data[0]['imagen'] = "https://sistemaya.com/Taxis/fotos_operadores/F" + data[0]['id_operador'] + ".jpg";
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    operador: data[0],
                                    token: token,
                                    tarifas: tarifas
                                })];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
};
var renewToken = function (req, res) {
    if (res === void 0) { res = response; }
    return __awaiter(void 0, void 0, void 0, function () {
        var miId, tarifas, query;
        return __generator(this, function (_a) {
            miId = req.id;
            tarifas = {
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
            query = "\n        select u.password,u.id_operador, vwo.OperadorID, \n        u.id, u.imagen, vwo.NumEconomico, vwo.TituloSindical, \n        CONCAT(vwo.Nombre,' ',vwo.ApellidoPaterno) AS nombre, u.status as status\n        from users u inner join vw_catoperadores vwo on vwo.OperadorID = u.id_operador\n        where u.id = " + miId + "\n    ";
            mysql_1.default.ejecutarQuery(query, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                var estatus, miID, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!err) return [3 /*break*/, 1];
                            res.status(400).json({
                                ok: 'null',
                                mensaje: 'Usuario no encontrado',
                                error: err
                            });
                            return [3 /*break*/, 4];
                        case 1:
                            estatus = data[0]["activo"];
                            if (!(estatus == 0)) return [3 /*break*/, 2];
                            return [2 /*return*/, res.json({
                                    ok: 'pago',
                                    mensaje: 'Favor de realizar el pago'
                                })];
                        case 2:
                            miID = data[0]["id"];
                            return [4 /*yield*/, generarJWT(miID)];
                        case 3:
                            token = _a.sent();
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    operador: data[0],
                                    token: token,
                                    tarifas: tarifas
                                })];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
};
var actualizarPassword = function (req, res) {
    if (res === void 0) { res = response; }
    var password = req.body.password;
    var miID = req.body.id;
    var salt = bcrypt.genSaltSync();
    var pass = bcrypt.hashSync(password, salt);
    var fecha = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var query = "\n        update  users set updated_at = \"" + fecha + "\", \n        password = \"" + pass + "\"\n        where id_operador = " + miID + "\n    ";
    mysql_1.default.ejecutarQuery(query, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (err) {
                res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            else {
                // const token = await generarJWT(20);
                res.json({
                    ok: true,
                    msg: 'Registro actualizado',
                });
            }
            return [2 /*return*/];
        });
    }); });
};
module.exports = {
    registroUsuarios: registroUsuarios,
    login: login,
    renewToken: renewToken,
    actualizarPassword: actualizarPassword
};
