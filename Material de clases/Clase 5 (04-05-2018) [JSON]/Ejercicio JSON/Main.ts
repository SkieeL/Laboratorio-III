import {Persona} from "./Persona";

// Transforma string en objeto

var stringJSON : string = '{ "nombre" : "Ezequiel", "edad" : 23 }';
var personita : Persona = JSON.parse(stringJSON);

console.log("Nombre: " + personita.nombre);
console.log("Edad: " + personita.edad);

// Transforma objeto en string

var persona : Persona = new Persona("Ezequiel", 23);
var personaJSON : string = JSON.stringify(persona);

//console.log(personaJSON);