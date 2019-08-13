// Cuando carga la página
window.onload = function () {
    // Crea un array de objetos
    var arrayJSON = [{ "correo": "ezemahafud@gmail.com", "clave": "1235", "nombre": "Ezequiel", "apellido": "Mahafud", "legajo": 1, "perfil": "superadmin", "foto": "ezemahafud.jpg" },
        { "correo": "joemahafud@gmail.com", "clave": "1234", "nombre": "Joel", "apellido": "Mahafud", "legajo": 2, "perfil": "admin", "foto": "joemahafud.jpg" }];
    // Carga el usuario en la DB
    /*$.ajax({
        type: 'GET',
        url: "http://localhost:8080/FINAL/backend/TraerUsuarios",
        dataType: "json",
        contentType: false,
        processData: false,
    })
    .done(function (objJson) {
        if(objJson == "error") {
            console.log(objJson);
            console.log("Hubo un error con la extensión!");
            return;
        }
    })
    .fail(function(objJson) {
        console.log(JSON.stringify(objJson));
        return;
    });*/
    // Si no existe la clave "usuarios" en el localStorage, la setea
    if (localStorage.getItem("usuarios") === null) {
        localStorage.setItem("usuarios", JSON.stringify(arrayJSON));
        console.log(arrayJSON);
    }
    else {
        //console.log("Los usuarios ya están cargados en el Local Storage!");
    }
};
function enviarLogin() {
    // Trae los inputs y crea las variables que guardarán los errores
    var inputEmail = document.getElementById("txtEmail");
    var inputClave = document.getElementById("txtClave");
    // Trae los usuarios del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("usuarios");
    var usuarios = JSON.parse(arrayJSON);
    var noEncontro = true;
    // Recorre el array de usuarios
    for (var i = 0; i < usuarios.length; i++) {
        // Si encuentra el correo
        if (inputEmail.value === usuarios[i].correo) {
            // Verifica que la contraseña sea correcta, si lo es, redirecciona a la página principal
            if (inputClave.value === usuarios[i].clave) {
                // Generar token
                var form = new FormData();
                form.append("correo", usuarios[i].correo);
                form.append("nombre", usuarios[i].nombre);
                form.append("apellido", usuarios[i].apellido);
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
                document.getElementById("advertenciaLogin").style.display = "none";
                noEncontro = false;
                break;
            }
            else {
                document.getElementById("advertenciaLogin").style.display = "block";
                document.getElementById("advertenciaLogin").innerHTML = "Advertencia: La clave ingresada es inválida!";
                noEncontro = false;
                break;
            }
        }
    }
    // Si no encontró el e-mail, muestra la advertencia correspondiente
    if (noEncontro) {
        document.getElementById("advertenciaLogin").style.display = "block";
        document.getElementById("advertenciaLogin").innerHTML = "Advertencia: El usuario no se encuentra registrado!";
    }
}
