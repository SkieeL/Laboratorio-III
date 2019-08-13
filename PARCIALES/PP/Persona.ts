namespace Entidades {
    export class Persona {
        protected nombre : string;
        protected apellido : string;
        protected edad : number;
    
        public constructor(nombre : string, apellido : string, edad : number) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        public PersonaToString() : string {
            return `"nombre" : "${this.nombre}", "apellido" : "${this.apellido}", "edad" : ${this.edad}`;
        }

        public GetNombre() : string {
            return this.nombre;
        }

        public GetApellido() : string {
            return this.apellido;
        }

        public GetEdad() : number {
            return this.edad;
        }
    }
}