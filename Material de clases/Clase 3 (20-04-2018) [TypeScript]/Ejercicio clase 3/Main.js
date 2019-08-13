var Figuras;
(function (Figuras) {
    var Punto = /** @class */ (function () {
        function Punto(x, y) {
            this._x = x;
            this._y = y;
        }
        Punto.prototype.GetX = function () {
            return this._x;
        };
        Punto.prototype.GetY = function () {
            return this._y;
        };
        return Punto;
    }());
    Figuras.Punto = Punto;
})(Figuras || (Figuras = {}));
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
            return "Lado uno: " + this._ladoUno + " - Lado dos: " + this._ladoDos + " - Perimetro: " + this._perimetro + " - \u00C1rea: " + this._area + " - V\u00E9rtice 1: (X: " + this._vertice1.GetX() + " - Y: " + this._vertice1.GetY() + ") - V\u00E9rtice 2: (X: " + this._vertice2.GetX() + " - Y: " + this._vertice2.GetY() + ") - V\u00E9rtice 3: (X: " + this._vertice3.GetX() + " - Y: " + this._vertice3.GetY() + ") - V\u00E9rtice 4: (X: " + this._vertice4.GetX() + " - Y: " + this._vertice4.GetY() + ")";
        };
        return Rectangulo;
    }());
    Figuras.Rectangulo = Rectangulo;
})(Figuras || (Figuras = {}));
/// <reference path="./Rectangulo.ts" />
var punto1 = new Figuras.Punto(0, 0);
var punto2 = new Figuras.Punto(3, 6);
var rectangulo = new Figuras.Rectangulo(punto1, punto2);
console.log(rectangulo.ToString());
