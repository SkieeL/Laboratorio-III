/// <reference path="libs/jquery/index.d.ts" />
$(document).ready(function () {
    var arrayJSON = [{ "correo": "jorge@gmail.com", "clave": "123", "nombre": "Jorge", "apellido": "Fernandez", "legajo": "1", "perfil": "admin", "foto": "" },
        { "correo": "eze@gmail.com", "clave": "456", "nombre": "Ezequiel", "apellido": "Mahafud", "legajo": "2", "perfil": "usuario", "foto": "" },
        { "correo": "joe@gmail.com", "clave": "789", "nombre": "Joel", "apellido": "Pluis", "legajo": "3", "perfil": "usuario", "foto": "" },
        { "correo": "nadi@gmail.com", "clave": "012", "nombre": "Nadia", "apellido": "Gimenez", "legajo": "4", "perfil": "usuario", "foto": "" },
        { "correo": "ani@gmail.com", "clave": "345", "nombre": "Ana", "apellido": "Gonzalez", "legajo": "5", "perfil": "usuario", "foto": "" }];
    if (localStorage.getItem("jsons") !== "") {
        localStorage.setItem("jsons", JSON.stringify(arrayJSON));
        console.log("Escribo en el localStorage!");
    }
    else {
        console.log("Ya existe el array de JSON en el localStorage!");
    }
    for (var i = 0; i < arrayJSON.length; i++) {
        console.log(arrayJSON[i].correo);
        console.log(arrayJSON[i].clave);
        console.log(arrayJSON[i].nombre);
        console.log(arrayJSON[i].apellido);
        console.log(arrayJSON[i].legajo);
        console.log(arrayJSON[i].perfil);
        console.log(arrayJSON[i].foto);
    }
});
function VerificarUsuario() {
    var email = document.getElementById("txtEmail").value;
    var clave = document.getElementById("txtClave").value;
    var usuarios = JSON.parse(localStorage.getItem("jsons"));
    var noEncontro = true;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo == email && usuarios[i].clave == clave) {
            location.href = "principal.html";
            break;
        }
        else if (usuarios[i].correo == email && usuarios[i].clave != clave) {
            $("#alertClave").show();
            $("#spanClave").show();
            noEncontro = false;
        }
    }
    // Mostrar alert!
    if (noEncontro)
        $("#alertAdv").show();
}
