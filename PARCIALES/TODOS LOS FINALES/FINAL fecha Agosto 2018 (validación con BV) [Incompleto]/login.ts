// Cuando carga la página
window.onload = function () {
    // Crea un array de objetos
    let arrayJSON : any[] = [  { "correo" : "ezemahafud@gmail.com", "clave" : "1235", "nombre" : "Ezequiel", "perfil" : "administrador", "foto" : "ezemahafud.jpg" }, 
                        { "correo" : "joemahafud@gmail.com", "clave" : "1234", "nombre" : "Joel", "perfil" : "empleado", "foto" : "joemahafud.jpg" }, 
                        { "correo" : "nadimahafud@gmail.com", "clave" : "1234", "nombre" : "Nadia", "perfil" : "encargado", "foto" : "nadimahafud.jpg" }, 
                        { "correo" : "noepluis@gmail.com", "clave" : "1234", "nombre" : "Noemi", "perfil" : "dueño", "foto" : "noepluis.jpg" }, 
                        { "correo" : "luismahafud@gmail.com", "clave" : "1234", "nombre" : "Luis", "perfil" : "administrador", "foto" : "luismahafud.jpg" } ];

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
                // Generar token
                let form : FormData = new FormData();
                form.append("correo", usuarios[i].correo);
                form.append("nombre", usuarios[i].nombre);
                form.append("perfil", usuarios[i].perfil);

                $.ajax({
                    type: 'POST',
                    url: "backend/setToken",
                    dataType: "json",
                    contentType: false,
                    processData: false,
                    data: form
                })
                .done(function (objJson) {
                    localStorage.setItem("token", objJson);
                    location.href = "principal.html";
                });

                (<HTMLDivElement> document.getElementById("advertenciaLogin")).style.display = "none";
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