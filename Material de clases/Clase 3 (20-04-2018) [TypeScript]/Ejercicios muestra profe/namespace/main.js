var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Test;
(function (Test) {
    var Vehiculo = (function () {
        function Vehiculo(marca) {
            this._marca = marca;
        }
        Vehiculo.prototype.Mostrar = function () {
            return this._marca;
        };
        return Vehiculo;
    }());
    Test.Vehiculo = Vehiculo;
})(Test || (Test = {}));
/// <reference path="./01_vehiculo.ts" />
var Test;
(function (Test) {
    var Auto = (function (_super) {
        __extends(Auto, _super);
        function Auto(color, precio, marca) {
            var _this = _super.call(this, marca) || this;
            _this._precio = precio;
            _this.color = color;
            return _this;
        }
        Auto.prototype.GetPrecio = function () {
            return this._precio;
        };
        Auto.prototype.Mostrar = function () {
            return _super.prototype.Mostrar.call(this) + this._precio + this.color;
        };
        Auto.prototype.Acelerar = function () {
            console.log("Acelerando...");
        };
        return Auto;
    }(Test.Vehiculo));
    Test.Auto = Auto;
})(Test || (Test = {}));
/// <reference path="./01_vehiculo.ts" />
/// <reference path="./02_auto.ts" />
var vehiculos = [new Test.Auto("ROJO", 125000, "FERRARI"),
    new Test.Auto("AMARILLO", 200000, "SEAT")];
vehiculos.forEach(Mostrar);
function Mostrar(v) {
    console.log(v.Mostrar());
}
