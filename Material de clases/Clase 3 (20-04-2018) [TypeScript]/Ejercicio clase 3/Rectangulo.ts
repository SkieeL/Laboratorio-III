/// <reference path="./Punto.ts" />

namespace Figuras {
    export class Rectangulo {
        private _area : number;
        private _ladoDos : number;
        private _ladoUno : number;
        private _perimetro : number;
        private _vertice1 : Punto;
        private _vertice2 : Punto;
        private _vertice3 : Punto;
        private _vertice4 : Punto;
    
        public constructor(v1 : Punto, v3 : Punto) {
            this._vertice1 = v1;
            this._vertice2 = new Punto(v1.GetX(), v3.GetY());
            this._vertice3 = v3;
            this._vertice4 = new Punto(v3.GetX(), v1.GetY());
            this._ladoUno = this._vertice2.GetY() - this._vertice1.GetY();
            this._ladoDos = this._vertice3.GetX() - this._vertice2.GetX();
            this._perimetro = this._ladoUno * 2 + this._ladoDos * 2;
            this._area = this._ladoUno * this._ladoDos;
        }
    
        public GetArea() : number {
            return this._area;
        }
    
        public GetPerimetro() : number {
            return this._perimetro;
        }
    
        public ToString() : string {
            return `Lado uno: ${this._ladoUno} - Lado dos: ${this._ladoDos} - Perimetro: ${this._perimetro} - Área: ${this._area} - Vértice 1: (X: ${this._vertice1.GetX()} - Y: ${this._vertice1.GetY()}) - Vértice 2: (X: ${this._vertice2.GetX()} - Y: ${this._vertice2.GetY()}) - Vértice 3: (X: ${this._vertice3.GetX()} - Y: ${this._vertice3.GetY()}) - Vértice 4: (X: ${this._vertice4.GetX()} - Y: ${this._vertice4.GetY()})`;
        }
    }
}

