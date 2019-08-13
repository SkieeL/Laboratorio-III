function enviarRegistro() {
    // Trae los inputs y crea las variables que guardarán los errores
    var inputApellido = document.getElementById("txtApellido");
    var inputNombre = document.getElementById("txtNombre");
    var inputLegajo = document.getElementById("txtLegajo");
    var inputEmail = document.getElementById("txtEmail");
    var inputPerfil = document.getElementById("cboPerfil");
    var inputFoto = document.getElementById("fileFoto");
    var inputClave = document.getElementById("txtClave");
    var inputConfirmar = document.getElementById("txtConfirmar");
    var errorApellido = "";
    var errorNombre = "";
    var errorLegajo = "";
    var errorEmail = "";
    var errorFoto = "";
    var errorClave = "";
    var errorConfirmar = "";
    var erroresInputs = "";
    // Trae los errores que tengan los inputs
    errorApellido = retornarErrorInput(inputApellido, "apellido", 0, 15);
    errorNombre = retornarErrorInput(inputNombre, "nombre", 0, 10);
    errorLegajo = retornarErrorInput(inputLegajo, "legajo", 100, 999999);
    errorEmail = retornarErrorInput(inputEmail, "e-mail");
    errorFoto = retornarErrorInput(inputFoto, "foto");
    if (errorFoto == "")
        errorFoto = validarExtension(inputFoto);
    errorClave = retornarErrorInput(inputClave, "clave", 4, 8);
    errorConfirmar = retornarErrorInput(inputConfirmar, "confirmar clave", 4, 8) + validarClaves(inputClave, inputConfirmar);
    // Si los errores del Apellido no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorApellido != "")
        document.getElementById("errorApellido").style.display = "block";
    else
        document.getElementById("errorApellido").style.display = "none";
    // Si los errores del Nombre no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorNombre != "")
        document.getElementById("errorNombre").style.display = "block";
    else
        document.getElementById("errorNombre").style.display = "none";
    // Si los errores del Legajo no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorLegajo != "")
        document.getElementById("errorLegajo").style.display = "block";
    else
        document.getElementById("errorLegajo").style.display = "none";
    // Si los errores del E-mail no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorEmail != "")
        document.getElementById("errorEmail").style.display = "block";
    else
        document.getElementById("errorEmail").style.display = "none";
    // Si los errores de la Foto no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorFoto != "")
        document.getElementById("errorFoto").style.display = "block";
    else
        document.getElementById("errorFoto").style.display = "none";
    // Si los errores de la Clave no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorClave != "")
        document.getElementById("errorClave").style.display = "block";
    else
        document.getElementById("errorClave").style.display = "none";
    // Si los errores del Confirmar Clave no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorConfirmar != "")
        document.getElementById("errorConfirmar").style.display = "block";
    else
        document.getElementById("errorConfirmar").style.display = "none";
    // Junta los errores en una misma variable
    erroresInputs = errorApellido + errorNombre + errorLegajo + errorEmail + errorFoto + errorClave + errorConfirmar;
    // Si el error de los inputs no está vacío, lo muestra en el DIV correspondiente, sino oculta el DIV
    if (erroresInputs != "") {
        document.getElementById("errorInputs").style.display = "block";
        document.getElementById("errorInputs").innerHTML = erroresInputs;
        return;
    }
    else {
        document.getElementById("errorInputs").style.display = "none";
    }
    // Trae los usuarios del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("usuarios");
    var usuarios = JSON.parse(arrayJSON);
    var noEncontro = true;
    // Recorre el array de usuarios
    for (var i = 0; i < usuarios.length; i++) {
        // Si encuentra el correo
        if (inputEmail.value === usuarios[i].correo) {
            // Muestra la advertencia correspondiente
            document.getElementById("advertenciaRegistro").style.display = "block";
            document.getElementById("advertenciaRegistro").innerHTML = "Advertencia: El e-mail ingresado ya se encuentra registrado!";
            noEncontro = false;
            break;
        }
    }
    // Si no encontró el e-mail
    if (noEncontro) {
        // Toma la extensión de la foto
        var arrayPartesPath = inputFoto.value.split(".").reverse();
        var extension = arrayPartesPath[0];
        // Carga la foto en el servidor
        var form = new FormData();
        form.append("foto", inputFoto.files[0]);
        form.append("email", inputEmail.value.split('@', 1)[0]);
        $.ajax({
            type: 'POST',
            url: "backend/cargarFoto",
            dataType: "json",
            data: form,
            contentType: false,
            processData: false
        })
            .done(function (objJson) {
            if (objJson == "error") {
                console.log("Hubo un error con la extensión!");
                return;
            }
        })
            .fail(function (objJson) {
            console.log(JSON.stringify(objJson));
            return;
        });
        // Registra el nuevo usuario en el array y actualiza la información en el localStorage
        var nuevoUsuario = { "correo": inputEmail.value, "clave": inputClave.value, "nombre": inputNombre.value, "apellido": inputApellido.value, "legajo": parseInt(inputLegajo.value), "perfil": inputPerfil.value, "foto": inputEmail.value.split('@', 1)[0] + "." + extension };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario insertado: " + JSON.stringify(nuevoUsuario));
        location.href = "login.html";
        // Oculta el DIV de advertencia
        document.getElementById("advertenciaRegistro").style.display = "none";
    }
}
// Retorna el mensaje de error correspondiente al input que recibe, también necesita recibir el nombre del input para armar el mensaje
function retornarErrorInput(input, nombre, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 0; }
    if (!input.validity.valid) {
        if (input.validity.valueMissing)
            return "ERROR: El campo " + nombre + " no puede estar vac\u00EDo<br>";
        else if ((input.validity.tooShort || input.validity.tooLong) && min != 0 && max != 0)
            return "ERROR: El campo " + nombre + " debe tener entre " + min + " y " + max + " caracteres<br>";
        else if (input.validity.tooShort)
            return "ERROR: El campo " + nombre + " debe tener al menos " + min + " caracteres<br>";
        else if (input.validity.tooLong)
            return "ERROR: El campo " + nombre + " no debe tener m\u00E1s de " + max + " caracteres<br>";
        else if ((input.validity.rangeUnderflow || input.validity.rangeOverflow) && input.attributes.getNamedItem("min") != null && input.attributes.getNamedItem("max") != null)
            return "ERROR: El campo " + nombre + " debe tener un valor entre " + min + " y " + max + "<br>";
        else if (input.validity.rangeUnderflow)
            return "ERROR: El campo " + nombre + " debe tener al menos el valor " + min + "<br>";
        else if (input.validity.rangeOverflow)
            return "ERROR: El campo " + nombre + " no debe tener un valor mayor a " + max + "<br>";
        else if (input.validity.typeMismatch || input.validity.patternMismatch)
            return "ERROR: El formato del campo " + nombre + " es inv\u00E1lido<br>";
    }
    return "";
}
function validarClaves(clave, confirmar) {
    if (clave.value !== confirmar.value) {
        return "ERROR: La confirmación de clave no coincide con la clave ingresada<br>";
    }
    return "";
}
function validarExtension(input) {
    var arrayPartesNombre = input.value.split(".").reverse();
    console.log(arrayPartesNombre);
    var extension = arrayPartesNombre[0];
    if (extension == "jpg" || extension == "png")
        return "";
    return "ERROR: El formato del archivo adjunto es inválido (sólo .jpg y .png)<br>";
}
