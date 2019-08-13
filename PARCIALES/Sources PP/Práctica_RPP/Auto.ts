/// <reference path="ITributable.ts"/>

namespace Clases {
    export class Auto implements Interfaces.ITributable {   
        protected _patente : string;
        protected _marca : string;
        protected _precio : number;
        protected _path : string;

        public constructor(patente : string, marca : string, precio : number, path : string) {
            this._path = path;
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }

        public ToJson() : string {
            return `{ "marca" : "${this._marca}", "precio" : ${this._precio}, "patente" : "${this._patente}", "foto" : "${this._path}" }`;
        }

        public GetPrecioConIVA() : Number {
            return this._precio * 1.21;
        }
    }

}