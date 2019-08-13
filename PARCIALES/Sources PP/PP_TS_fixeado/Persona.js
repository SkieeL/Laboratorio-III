"use strict";
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.PersonaToString = function () {
            return "\"nombre\" : \"" + this.nombre + "\", \"apellido\" : \"" + this.apellido + "\", \"edad\" : " + this.edad;
        };
        Persona.prototype.GetNombre = function () {
            return this.nombre;
        };
        Persona.prototype.GetApellido = function () {
            return this.apellido;
        };
        Persona.prototype.GetEdad = function () {
            return this.edad;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Persona.js.map