/// <reference path="./Persona.ts" />

namespace Entidades {
    export class Ciudadano extends Persona {
        protected pais : string;
        protected dni : number;

        public constructor(nombre : string, apellido : string, edad : number, pais : string, dni : number) {
            super(nombre, apellido, edad);
            this.pais = pais;
            this.dni = dni;
        }

        public CiudadanoToJson() : string {
            return `{ ${super.PersonaToString()}, "pais" : "${this.pais}", "dni" : ${this.dni} }`;
        }

        public GetDni() : number {
            return this.dni;
        }

        public GetPais() : string {
            return this.pais;
        }
    }
}