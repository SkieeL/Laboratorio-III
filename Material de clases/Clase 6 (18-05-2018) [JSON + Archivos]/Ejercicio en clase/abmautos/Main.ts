/// <reference path="./Auto.ts" />

let autito : Clases.Auto = new Clases.Auto("RLM678", "Fiat", 22000);

let strJSON : string = JSON.stringify(autito.ToJson());

console.log(strJSON);