function enviarRegistro() : void {
    // Trae los inputs y crea las variables que guardarán los errores
    let inputApellido : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtApellido"));
    let inputNombre : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtNombre"));
    let inputLegajo : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtLegajo"));
    let inputEmail : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtEmail"));
    let inputPerfil : HTMLSelectElement = (<HTMLSelectElement> document.getElementById("cboPerfil"));
    let inputFoto : HTMLInputElement = (<HTMLInputElement> document.getElementById("fileFoto"));
    let inputClave : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtClave"));
    let inputConfirmar : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtConfirmar"));
    let errorApellido : string = "";
    let errorNombre : string = "";
    let errorLegajo : string = "";
    let errorEmail : string = "";
    let errorFoto : string = "";
    let errorClave : string = "";
    let errorConfirmar : string = "";
    let erroresInputs : string = "";

    // Trae los errores que tengan los inputs
    errorApellido = retornarErrorInput(inputApellido, "apellido");
    errorNombre = retornarErrorInput(inputNombre, "nombre");
    errorLegajo = retornarErrorInput(inputLegajo, "legajo");
    errorEmail = retornarErrorInput(inputEmail, "e-mail");
    errorFoto = retornarErrorInput(inputFoto, "foto");
    errorClave = retornarErrorInput(inputClave, "clave");
    errorConfirmar = retornarErrorInput(inputConfirmar, "confirmar clave");

    // Si los errores del Apellido no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorApellido != "") (<HTMLSpanElement> document.getElementById("errorApellido")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorApellido")).style.display = "none";

    // Si los errores del Nombre no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorNombre != "") (<HTMLSpanElement> document.getElementById("errorNombre")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorNombre")).style.display = "none";

    // Si los errores del Legajo no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorLegajo != "") (<HTMLSpanElement> document.getElementById("errorLegajo")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorLegajo")).style.display = "none";

    // Si los errores del E-mail no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorEmail != "") (<HTMLSpanElement> document.getElementById("errorEmail")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorEmail")).style.display = "none";

    // Si los errores de la Foto no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorFoto != "") (<HTMLSpanElement> document.getElementById("errorFoto")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorFoto")).style.display = "none";

    // Si los errores de la Clave no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorClave != "") (<HTMLSpanElement> document.getElementById("errorClave")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorClave")).style.display = "none";

    // Si los errores del Confirmar Clave no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorConfirmar != "") (<HTMLSpanElement> document.getElementById("errorConfirmar")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorConfirmar")).style.display = "none";

    // Junta los errores en una misma variable
    erroresInputs = errorApellido + errorNombre + errorLegajo + errorEmail + errorFoto + errorClave + errorConfirmar;

    // Si el error de los inputs no está vacío, lo muestra en el DIV correspondiente, sino oculta el DIV
    if (erroresInputs != "") {
        (<HTMLDivElement> document.getElementById("errorInputs")).style.display = "block";
        (<HTMLDivElement> document.getElementById("errorInputs")).innerHTML = erroresInputs;
    }
    else {
        (<HTMLDivElement> document.getElementById("errorInputs")).style.display = "none";
    }

    // Trae los usuarios del localStorage y los guarda en un array
    let arrayJSON : any = localStorage.getItem("usuarios");
    let usuarios : any[] = JSON.parse(arrayJSON);
    let noEncontro : boolean = true;

    // Recorre el array de usuarios
    for (let i : number = 0; i < usuarios.length; i++) {
        // Si encuentra el correo
        if (inputEmail.value === usuarios[i].correo) {
            // Muestra la advertencia correspondiente
            (<HTMLDivElement> document.getElementById("advertenciaRegistro")).style.display = "block";
            (<HTMLDivElement> document.getElementById("advertenciaRegistro")).innerHTML = "Advertencia: El e-mail ingresado ya se encuentra registrado!";
            noEncontro = false;
            break;
        }
    }

    // Si no encontró el e-mail
    if (noEncontro) {
        // Registra el nuevo usuario en el array y actualiza la información en el localStorage
        let nuevoUsuario : any = { "correo" : inputEmail.value, "clave" : inputClave.value, "nombre" : inputNombre.value, "apellido" : inputApellido.value, "legajo" : parseInt(inputLegajo.value), "perfil" : inputPerfil.value, "foto" : "" };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario insertado: " + JSON.stringify(nuevoUsuario));

        // Oculta el DIV de advertencia
        (<HTMLDivElement> document.getElementById("advertenciaRegistro")).style.display = "none";
    }
}

// Retorna el mensaje de error correspondiente al input que recibe, también necesita recibir el nombre del input para armar el mensaje
function retornarErrorInput(input : HTMLInputElement, nombre : string) : string {
    if (!input.validity.valid) {
        if (input.validity.valueMissing)
            return `ERROR: El campo ${nombre} no puede estar vacío<br>`;
        else if ((input.validity.tooShort || input.validity.tooLong) && input.attributes.getNamedItem("minlength") != null && input.attributes.getNamedItem("maxlength") != null)
            return `ERROR: El campo ${nombre} debe tener entre ${input.attributes.getNamedItem("minlength").value} y ${input.attributes.getNamedItem("maxlength").value} caracteres<br>`;
        else if (input.validity.tooShort)
            return `ERROR: El campo ${nombre} debe tener al menos ${input.attributes.getNamedItem("minlength").value} caracteres<br>`;
        else if (input.validity.tooLong)
            return `ERROR: El campo ${nombre} no debe tener más de ${input.attributes.getNamedItem("maxlength").value} caracteres<br>`;
        else if ((input.validity.rangeUnderflow || input.validity.rangeOverflow) && input.attributes.getNamedItem("min") != null && input.attributes.getNamedItem("max") != null)
            return `ERROR: El campo ${nombre} debe tener un valor entre ${input.attributes.getNamedItem("min").value} y ${input.attributes.getNamedItem("max").value}<br>`;
        else if (input.validity.rangeUnderflow)
            return `ERROR: El campo ${nombre} debe tener al menos el valor ${input.attributes.getNamedItem("min").value}<br>`;
        else if (input.validity.rangeOverflow)
            return `ERROR: El campo ${nombre} no debe tener un valor mayor a ${input.attributes.getNamedItem("max").value}<br>`;
        else if (input.validity.stepMismatch)
            return `ERROR: El campo ${nombre} debe tener un valor múltiplo de ${input.attributes.getNamedItem("step").value}<br>`;
        else if (input.validity.typeMismatch || input.validity.patternMismatch)
            return `ERROR: El formato del campo ${nombre} es inválido<br>`;
    }

    return "";
}