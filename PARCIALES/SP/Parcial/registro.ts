/// <reference path="libs/jquery/index.d.ts" />

function VerificarRegistro() {
    let apellido : string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
    let nombre : string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    let email : string = (<HTMLInputElement> document.getElementById("txtEmail")).value;
    let legajo : string = (<HTMLInputElement> document.getElementById("txtLegajo")).value;
    let perfil : string = (<HTMLSelectElement> document.getElementById("cboPerfil")).value;
    let foto : string = (<HTMLSelectElement> document.getElementById("fileFoto")).value;
    let clave : string = (<HTMLInputElement> document.getElementById("txtClave")).value;
    let confirmClave : string = (<HTMLInputElement> document.getElementById("txtConfirmClave")).value;
    let usuarios : any[] = JSON.parse(localStorage.getItem("jsons"));
    let fail : boolean = false;

    VerificarCampos("Apellido", apellido);
    VerificarCampos("Nombre", nombre);
    VerificarCampos("E-mail", email);
    VerificarCampos("Legajo", legajo);
    VerificarCampos("Perfil", perfil);
    VerificarCampos("Foto", foto);
    VerificarCampos("Clave", clave);
    VerificarCampos("Confiración de clave", confirmClave);

    for (let i = 0; i < usuarios.length; i++) {
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
        let nuevoUsuario : any = { "correo" : email, "clave" : clave, "nombre" : nombre, "apellido" : apellido, "legajo" : legajo, "perfil" : perfil, "foto" : foto }
        usuarios.push();
        location.href = "login.html";
    }
}

function VerificarCampos(name : string, valor : string, ) {
    
}