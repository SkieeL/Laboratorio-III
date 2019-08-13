"use strict";
/// <reference path="./Interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        Auto.prototype.ToJson = function () {
            var cadena = "{ \"_patente\" : \"" + this._patente + "\", \"_marca\" : \"" + this._marca + "\", \"_precio\" : " + this._precio + " }";
            return JSON.parse(cadena);
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
//# sourceMappingURL=Auto.js.map