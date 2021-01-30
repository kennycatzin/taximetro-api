"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("./router/router"));
var server_1 = __importDefault(require("./server/server"));
var mysql_1 = __importDefault(require("./mysql/mysql"));
var express = require('express');
var path = require('path');
var server = server_1.default.init(3000);
// App de Express
var app = express();
// Lectura y parseo del Body
app.use(express.json());
var servidor = require('http').createServer(app);
server.app.use(router_1.default);
module.exports.io = require('socket.io')(servidor);
mysql_1.default.instance;
server.start(function () {
    console.log('Servidor corriendo en el puerto 3000');
});
