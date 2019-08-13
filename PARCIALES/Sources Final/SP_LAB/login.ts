// Cuando carga la página
window.onload = function () {
    // Crea un array de objetos
    let arrayJSON : any[] = [  { "correo" : "ezemahafud@gmail.com", "clave" : "1235", "nombre" : "Ezequiel", "apellido" : "Mahafud", "legajo" : 1, "perfil" : "admin", "foto" : "img/1.jpg" }, 
                        { "correo" : "joemahafud@gmail.com", "clave" : "1234", "nombre" : "Joel", "apellido" : "Mahafud", "legajo" : 2, "perfil" : "usuario", "foto" : "img/2.jpg" }, 
                        { "correo" : "nadimahafud@gmail.com", "clave" : "1234", "nombre" : "Nadia", "apellido" : "Mahafud", "legajo" : 3, "perfil" : "usuario", "foto" : "img/3.jpg" }, 
                        { "correo" : "noepluis@gmail.com", "clave" : "1234", "nombre" : "Noemi", "apellido" : "Pluis", "legajo" : 4, "perfil" : "usuario", "foto" : "img/3.jpg" }, 
                        { "correo" : "luismahafud@gmail.com", "clave" : "1234", "nombre" : "Luis", "apellido" : "Mahafud", "legajo" : 5, "perfil" : "usuario", "foto" : "img/2.jpg" } ];

    // Si no existe la clave "usuarios" en el localStorage, la setea
    if (localStorage.getItem("usuarios") === null) {
        localStorage.setItem("usuarios", JSON.stringify(arrayJSON));
        console.log(arrayJSON);
    }
    else {
        console.log("Los usuarios ya están cargados en el Local Storage!");
    }
};

function enviarLogin() : void {
    // Trae los inputs y crea las variables que guardarán los errores
    let inputEmail : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtEmail"));
    let inputClave : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtClave"));
    let erroresInputs : string = "";
    let errorEmail : string = "";
    let errorClave : string = "";

    // Trae los errores que tengan los inputs
    errorEmail = retornarErrorInputs(inputEmail, "e-mail");
    errorClave = retornarErrorInputs(inputClave, "clave");

    // Si los errores del E-mail no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorEmail != "") (<HTMLSpanElement> document.getElementById("errorEmail")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorEmail")).style.display = "none";

    // Si los errores de la Clave no están vacíos muestra el span con el asterisco rojo, sino lo oculta
    if (errorClave != "") (<HTMLSpanElement> document.getElementById("errorClave")).style.display = "block";
    else (<HTMLSpanElement> document.getElementById("errorClave")).style.display = "none";

    // Junta los errores en una misma variable
    erroresInputs = errorEmail + errorClave;

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
            // Verifica que la contraseña sea correcta, si lo es, redirecciona a la página principal
            if (inputClave.value === usuarios[i].clave) {
                (<HTMLDivElement> document.getElementById("advertenciaLogin")).style.display = "none";
                location.href = "principal.html";
                noEncontro = false;
                break;
            }
            // Si la contraseña no es correcta, muestra la advertencia correspondiente
            else {
                (<HTMLDivElement> document.getElementById("advertenciaLogin")).style.display = "block";
                (<HTMLDivElement> document.getElementById("advertenciaLogin")).innerHTML = "Advertencia: La clave ingresada es inválida!";
                noEncontro = false;
                break;
            }
        }
    }

    // Si no encontró el e-mail, muestra la advertencia correspondiente
    if (noEncontro) {
        (<HTMLDivElement> document.getElementById("advertenciaLogin")).style.display = "block";
        (<HTMLDivElement> document.getElementById("advertenciaLogin")).innerHTML = "Advertencia: El usuario no se encuentra registrado!";
    }
}

// Retorna el mensaje de error correspondiente al input que recibe, también necesita recibir el nombre del input para armar el mensaje
function retornarErrorInputs(input : HTMLInputElement, nombre : string) : string {
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