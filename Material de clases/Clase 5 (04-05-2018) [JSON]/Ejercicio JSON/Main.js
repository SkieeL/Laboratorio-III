"use strict";
exports.__esModule = true;
var Persona_1 = require("./Persona");
// Transforma string en objeto
var stringJSON = '{ "nombre" : "Ezequiel", "edad" : 23 }';
var personita = JSON.parse(stringJSON);
console.log("Nombre: " + personita.nombre);
console.log("Edad: " + personita.edad);
// Transforma objeto en string
var persona = new Persona_1.Persona("Ezequiel", 23);
var personaJSON = JSON.stringify(persona);
//console.log(personaJSON);
