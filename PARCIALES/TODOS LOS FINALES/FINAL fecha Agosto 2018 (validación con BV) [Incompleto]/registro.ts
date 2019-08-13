// Cuando carga la página
window.onload = function () {
    // Trae los usuarios del localStorage, los guarda en un array y los muestra en consola
    let arrayJSON : any = localStorage.getItem("usuarios");
    let usuarios : any[] = JSON.parse(arrayJSON);
    console.log(usuarios);

    // Magia para hacer vista previa de la imagen
    $('#fileFoto').change(function(e) { addImage(e); });
};

// Magia para hacer vista previa de la imagen 1/2
function addImage(e: any){
    let file = e.target.files[0];
    let imageType = /image.*/;

    if (!file.type.match(imageType))
        return;

    var reader = new FileReader();
    reader.onload = fileOnload;
    reader.readAsDataURL(file);
}

// Magia para hacer vista previa de la imagen 2/2
function fileOnload(e: any) {
    let result = e.target.result;
    $('#imgSalida').attr("src",result);
}

function enviarRegistro() : void {
    // Trae los inputs y crea las variables que guardarán los errores
    let inputNombre : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtNombre"));
    let inputEmail : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtEmail"));
    let inputPerfil : HTMLSelectElement = (<HTMLSelectElement> document.getElementById("cboPerfil"));
    let inputFoto : any = (<HTMLInputElement> document.getElementById("fileFoto"));
    let inputClave : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtClave"));
    let inputConfirmar : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtConfirmar"));
    let errorNombre : string = "";
    let errorEmail : string = "";
    let errorFoto : string = "";
    let errorClave : string = "";
    let errorConfirmar : string = "";
    let erroresInputs : string = "";

    // Trae los errores que tengan los inputs
    errorNombre = retornarErrorInput(inputNombre, "nombre", 0, 10);
    errorEmail = retornarErrorInput(inputEmail, "e-mail");
    errorFoto = retornarErrorInput(inputFoto, "foto");
    if (errorFoto == "")
        errorFoto = validarExtension(inputFoto);
    errorClave = retornarErrorInput(inputClave, "clave", 4, 8);
    errorConfirmar = retornarErrorInput(inputConfirmar, "confirmar clave", 4, 8) + validarClaves(inputClave, inputConfirmar);

    // Junta los errores en una misma variable
    erroresInputs = errorNombre + errorEmail + errorFoto + errorClave + errorConfirmar;

    // Si el error de los inputs no está vacío, retorna evitando el registro del usuario (bugfix BootstrapValidator)
    if (erroresInputs != "") {
        return;
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
        // Toma la extensión de la foto
        let arrayPartesPath : string[] = inputFoto.value.split(".").reverse();
        let extension : string = arrayPartesPath[0];

        // Carga la foto en el servidor
        let form : FormData = new FormData();
        form.append("foto", inputFoto.files[0]);
        form.append("email", inputEmail.value.split('@', 1)[0]);

        $.ajax({
            type: 'POST',
            url: "backend/cargarFoto",
            dataType: "json",
            data: form,
            contentType: false,
            processData: false,
        })
        .done(function (objJson) {
            if(objJson == "error") {
                console.log("Hubo un error con la extensión!");
                return;
            }
        })
        .fail(function(objJson) {
            console.log(JSON.stringify(objJson));
            return;
        });

        // Registra el nuevo usuario en el array y actualiza la información en el localStorage
        let nuevoUsuario : any = { "correo" : inputEmail.value, "clave" : inputClave.value, "nombre" : inputNombre.value, "perfil" : inputPerfil.value, "foto" : inputEmail.value.split('@', 1)[0] + "." + extension };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario insertado: " + JSON.stringify(nuevoUsuario));
        location.href = "login.html";

        // Oculta el DIV de advertencia
        (<HTMLDivElement> document.getElementById("advertenciaRegistro")).style.display = "none";
    }
}

// Retorna el mensaje de error correspondiente al input que recibe, también necesita recibir el nombre del input para armar el mensaje
function retornarErrorInput(input : HTMLInputElement, nombre : string, min : number = 0, max : number = 0) : string {
    if (!input.validity.valid) {
        if (input.validity.valueMissing)
            return `ERROR: El campo ${nombre} no puede estar vacío<br>`;
        else if ((input.validity.tooShort || input.validity.tooLong) && min != 0 && max != 0)
            return `ERROR: El campo ${nombre} debe tener entre ${min} y ${max} caracteres<br>`;
        else if (input.validity.tooShort)
            return `ERROR: El campo ${nombre} debe tener al menos ${min} caracteres<br>`;
        else if (input.validity.tooLong)
            return `ERROR: El campo ${nombre} no debe tener más de ${max} caracteres<br>`;
        else if ((input.validity.rangeUnderflow || input.validity.rangeOverflow) && input.attributes.getNamedItem("min") != null && input.attributes.getNamedItem("max") != null)
            return `ERROR: El campo ${nombre} debe tener un valor entre ${min} y ${max}<br>`;
        else if (input.validity.rangeUnderflow)
            return `ERROR: El campo ${nombre} debe tener al menos el valor ${min}<br>`;
        else if (input.validity.rangeOverflow)
            return `ERROR: El campo ${nombre} no debe tener un valor mayor a ${max}<br>`;
        else if (input.validity.typeMismatch || input.validity.patternMismatch)
            return `ERROR: El formato del campo ${nombre} es inválido<br>`;
    }

    return "";
}

function validarClaves(clave : HTMLInputElement, confirmar : HTMLInputElement) : string {
    if (clave.value !== confirmar.value) {
        return "ERROR: La confirmación de clave no coincide con la clave ingresada<br>";
    }

    return "";
}

function validarExtension(input : HTMLInputElement) : string {
    let arrayPartesNombre : any[] = input.value.split(".").reverse();
    console.log(arrayPartesNombre);
    let extension : string = arrayPartesNombre[0];

    if (extension == "jpg" || extension == "png")
        return "";

    return "ERROR: El formato del archivo adjunto es inválido (sólo .jpg y .png)<br>";
}