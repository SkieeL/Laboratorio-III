/// <reference path="./Persona.ts" />

namespace Entidades {
    export class Ciudadano extends Persona {
        protected dni : number;
        protected pais : string;

        public constructor(nombre : string, apellido : string, edad : number, dni : number, pais : string) {
            super(nombre, apellido, edad);
            this.dni = dni;
            this.pais = pais;
        }

        public CiudadanoToJson() : string {
            return `{ ${super.PersonaToString()}, "dni" : ${this.dni}, "pais" : "${this.pais}" }`
        }

        public GetDni() : number {
            return this.dni;
        }

        public GetPais() : string {
            return this.pais;
        }
    }
}