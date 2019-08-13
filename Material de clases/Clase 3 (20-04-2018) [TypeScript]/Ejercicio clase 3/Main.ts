/// <reference path="./Rectangulo.ts" />

let punto1 : Figuras.Punto = new Figuras.Punto(0, 0);
let punto2 : Figuras.Punto = new Figuras.Punto(3, 6);
let rectangulo : Figuras.Rectangulo = new Figuras.Rectangulo(punto1, punto2);

console.log(rectangulo.ToString());
