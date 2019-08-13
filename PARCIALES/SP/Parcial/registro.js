/// <reference path="libs/jquery/index.d.ts" />
function VerificarRegistro() {
    var apellido = document.getElementById("txtApellido").value;
    var nombre = document.getElementById("txtNombre").value;
    var email = document.getElementById("txtEmail").value;
    var legajo = document.getElementById("txtLegajo").value;
    var perfil = document.getElementById("cboPerfil").value;
    var foto = document.getElementById("fileFoto").value;
    var clave = document.getElementById("txtClave").value;
    var confirmClave = document.getElementById("txtConfirmClave").value;
    var usuarios = JSON.parse(localStorage.getItem("jsons"));
    var fail = false;
    VerificarCampos("Apellido", apellido);
    VerificarCampos("Nombre", nombre);
    VerificarCampos("E-mail", email);
    VerificarCampos("Legajo", legajo);
    VerificarCampos("Perfil", perfil);
    VerificarCampos("Foto", foto);
    VerificarCampos("Clave", clave);
    VerificarCampos("Confiración de clave", confirmClave);
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === email) {
            $("#alertEmail").show();
            $("#spanEmail").show();
            fail = true;
            break;
        }
    }
    if (apellido == "") {
        $("#alertApellido").show();
        $("#spanApellido").show();
    }
    if (nombre == "") {
        $("#alertNombre").show();
        $("#spanNombre").show();
    }
    if (email == "") {
        $("#alertEmail").show();
        $("#spanEmail").show();
    }
    if (legajo == "") {
        $("#alertLegajo").show();
        $("#spanLegajo").show();
    }
    if (foto == "") {
        $("#alertFoto").show();
        $("#spanFoto").show();
    }
    if (clave == "") {
        $("#alertClave").show();
        $("#spanClave").show();
    }
    if (confirmClave == "") {
        $("#alertConfirmClave").show();
        $("#spanConfirmClave").show();
    }
    if (!fail) {
        var nuevoUsuario = { "correo": email, "clave": clave, "nombre": nombre, "apellido": apellido, "legajo": legajo, "perfil": perfil, "foto": foto };
        usuarios.push();
        location.href = "login.html";
    }
}
function VerificarCampos(name, valor) {
}
