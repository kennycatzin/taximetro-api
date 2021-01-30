"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: '65.99.225.252',
            user: 'sertezac_omar',
            password: '5erte34?crh',
            database: 'sertezac_futv'
        });
        this.conectarDB();
    }
    MySQL.prototype.conectarDB = function () {
        var _this = this;
        this.cnn.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            _this.conectado = true;
            console.log('Conectado');
        });
    };
    MySQL.ejecutarQuery = function (query, callback) {
        this.instance.cnn.query(query, function (err, results, fields) {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length == 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    };
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return MySQL;
}());
exports.default = MySQL;
