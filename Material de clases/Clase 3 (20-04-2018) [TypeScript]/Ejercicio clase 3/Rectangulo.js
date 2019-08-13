"use strict";
/// <reference path="./Punto.ts" />
var Figuras;
(function (Figuras) {
    var Rectangulo = /** @class */ (function () {
        function Rectangulo(v1, v3) {
            this._vertice1 = v1;
            this._vertice2 = new Figuras.Punto(v1.GetX(), v3.GetY());
            this._vertice3 = v3;
            this._vertice4 = new Figuras.Punto(v3.GetX(), v1.GetY());
            this._ladoUno = this._vertice2.GetY() - this._vertice1.GetY();
            this._ladoDos = this._vertice3.GetX() - this._vertice2.GetX();
            this._perimetro = this._ladoUno * 2 + this._ladoDos * 2;
            this._area = this._ladoUno * this._ladoDos;
        }
        Rectangulo.prototype.GetArea = function () {
            return this._area;
        };
        Rectangulo.prototype.GetPerimetro = function () {
            return this._perimetro;
        };
        Rectangulo.prototype.ToString = function () {
            return "Lado uno: " + this._ladoUno + " - Lado dos: " + this._ladoDos + " - Perimetro: " + this._perimetro + " - \u00C1rea: " + this._area;
        };
        return Rectangulo;
    }());
    Figuras.Rectangulo = Rectangulo;
})(Figuras || (Figuras = {}));
//# sourceMappingURL=Rectangulo.js.map