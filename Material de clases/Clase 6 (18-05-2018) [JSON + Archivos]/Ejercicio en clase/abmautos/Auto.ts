/// <reference path="./Interface.ts" />

namespace Clases {
    export class Auto implements Interfaces.ITributable {
        protected _patente : string;
        protected _marca : string;
        protected _precio : number;

        public constructor(patente : string, marca : string, precio : number) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }

        public GetPrecioConIVA() : number {
            return this._precio * 1.21;
        }

        public ToJson() : JSON {
            let cadena : string = `{ "patente" : "${this._patente}", "marca" : "${this._marca}", "precio" : ${this._precio} }`; 

            return JSON.parse(cadena);
        }
    }
}