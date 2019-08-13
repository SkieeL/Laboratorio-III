window.onload = function () {
    // Verifica el token
    var token = localStorage.getItem("token");
    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token": token }
    })
        .done(function (objJson) {
        armaTabla(objJson.perfil);
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
};
function armaTabla(perfil) {
    // Trae los usuarios del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("usuarios");
    var usuarios = JSON.parse(arrayJSON);
    // Toma el DIV que contiene la tabla
    var divTabla = document.getElementById("tabla");
    var texto = "";
    // Arma la tabla según el perfil del usuario
    if (perfil == "admin") {
        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th><th>ELIMINAR</th></tr>";
        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (var i = 0; i < usuarios.length; i++) {
            texto += "<tr><td class=\"col-lg-2 col-md-3\">" + usuarios[i].correo + "</td><td class=\"col-lg-2 col-md-3\">" + usuarios[i].nombre + "</td><td class=\"col-lg-2 col-md-3\">" + usuarios[i].apellido + "</td><td class=\"col-lg-2 col-md-3\">" + usuarios[i].perfil + "</td><td class=\"col-lg-2 col-md-3\">" + usuarios[i].legajo + "</td><td class=\"col-lg-2 col-md-3\"><img src='fotos/" + usuarios[i].foto + "' height='50px' width='50px'</td><td class=\"col-lg-2 col-md-3\"><input type='button' class='btn btn-danger' value='Eliminar' data-toggle=\"modal\" data-target=\"#myModalBorrar\" onclick='borrarUsuario(" + usuarios[i].legajo + ", \"" + perfil + "\")'></td></tr>";
        }
    }
    else if (perfil == "superadmin") {
        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";
        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (var i = 0; i < usuarios.length; i++) {
            texto += "<tr><td class=\"col-lg-2 col-xs-3\">" + usuarios[i].correo + "</td><td class=\"col-lg-2 col-xs-3\">" + usuarios[i].nombre + "</td><td class=\"col-lg-2 col-xs-3\">" + usuarios[i].apellido + "</td><td class=\"col-lg-2 col-xs-3\">" + usuarios[i].perfil + "</td><td class=\"col-lg-2 col-xs-3\">" + usuarios[i].legajo + "</td><td class=\"col-lg-2 col-xs-3\"><img src='fotos/" + usuarios[i].foto + "' height='50px' width='50px'</td><td class=\"col-lg-2 col-xs-3\"><input type='button' class='btn btn-danger' value='Eliminar' data-toggle=\"modal\" data-target=\"#myModalBorrar\" onclick='borrarUsuario(" + usuarios[i].legajo + ", \"" + perfil + "\")'></td><td class=\"col-lg-2 col-xs-3\"><input type='button' class='btn btn-warning' value='Modificar' data-toggle=\"modal\" data-target=\"#myModal\" onclick='modificarUsuario(" + usuarios[i].legajo + ", \"" + perfil + "\")'></td></tr>";
        }
    }
    else {
        if (perfil == "invitado") {
            // Si es invitado, le muestra las preferencias
            texto = "<div class=\"form-group\">\n                        <label for=\"cboColorFondo\" class=\"control-label col-md-2\">Color del fondo</label>\n                        <div class=\"col-md-10 input-group\">\n                            <select name=\"cboColorFondo\" id=\"cboColorFondo\" class=\"form-control\">\n                                <option value='white'>Blanco</option>\n                                <option value='black'>Negro</option>\n                                <option value='gray'>Gris</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"cboColorFuente\" class=\"control-label col-md-2\">Color de las letras</label>\n                        <div class=\"col-md-10 input-group\">\n                            <select name=\"cboColorFuente\" id=\"cboColorFuente\" class=\"form-control\">\n                                <option value='black'>Negro</option>\n                                <option value='white'>Blanco</option>\n                                <option value='gray'>Gris</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"cboDisplayImg\" class=\"control-label col-md-2\">Forma de las fotos</label>\n                        <div class=\"col-md-10 input-group\">\n                            <select name=\"cboDisplayImg\" id=\"cboDisplayImg\" class=\"form-control\">\n                                <option value=''>Cuadrada</option>\n                                <option value='img-rounded'>Redondeada</option>\n                                <option value='img-circle'>Circular</option>\n                            </select>\n                        </div>\n                    </div>";
            document.getElementById("opcInvitado").innerHTML = texto;
            // Trae las preferencias del localStorage y las guarda en una variable
            var arrayPrefJSON = localStorage.getItem("preferencias");
            var preferencias = JSON.parse(arrayPrefJSON);
            // Si no recuperó preferencias del localStorage, establece valores por defecto
            if (preferencias == null) {
                preferencias = new Array();
                preferencias['fondo'] = 'white';
                preferencias['fuente'] = 'black';
                preferencias['images'] = '';
            }
            // Establece las preferencias del usuario
            document.getElementById('cboColorFondo').value = preferencias['fondo'];
            document.getElementById('cboColorFuente').value = preferencias['fuente'];
            document.getElementById('cboDisplayImg').value = preferencias['images'];
            document.getElementById('contenedorPpal').style.backgroundColor = preferencias['fondo'];
            document.getElementById('contenedorPpal').style.color = preferencias['fuente'];
            // Faltaría setearlo YA!
            // En caso de cambiar el color del fondo
            document.getElementById('cboColorFondo').onchange = function () {
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', "{ \"fondo\" : \"" + document.getElementById('cboColorFondo').value + "\", \"fuente\" : \"" + document.getElementById('cboColorFuente').value + "\", \"images\" : \"" + document.getElementById('cboDisplayImg').value + "\"}");
                // Actualiza el contenido seleccionado en la página
                document.getElementById('contenedorPpal').style.backgroundColor = document.getElementById('cboColorFondo').value;
            };
            // En caso de cambiar el color de las letras
            document.getElementById('cboColorFuente').onchange = function () {
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', "{ \"fondo\" : \"" + document.getElementById('cboColorFondo').value + "\", \"fuente\" : \"" + document.getElementById('cboColorFuente').value + "\", \"images\" : \"" + document.getElementById('cboDisplayImg').value + "\"}");
                // Actualiza el contenido seleccionado en la página
                document.getElementById('contenedorPpal').style.color = document.getElementById('cboColorFuente').value;
            };
            // En caso de cambiar el display de las imagenes
            document.getElementById('cboDisplayImg').onchange = function () {
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', "{ \"fondo\" : \"" + document.getElementById('cboColorFondo').value + "\", \"fuente\" : \"" + document.getElementById('cboColorFuente').value + "\", \"images\" : \"" + document.getElementById('cboDisplayImg').value + "\"}");
                // Actualiza el contenido seleccionado en la página
                armaTabla(perfil);
            };
        }
        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th></tr>";
        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (var i = 0; i < usuarios.length; i++) {
            texto += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].apellido + "</td><td>" + usuarios[i].perfil + "</td><td>" + usuarios[i].legajo + "</td><td><img class=\"" + document.getElementById('cboDisplayImg').value + "\" src='fotos/" + usuarios[i].foto + "' height='50px' width='50px'</td></tr>";
        }
    }
    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
}
function borrarUsuario(legajo, perfil) {
    // Verifica el token
    var token = localStorage.getItem("token");
    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token": token }
    })
        .done(function (objJson) {
        // Trae los usuarios del localStorage y los guarda en un array
        var arrayJSON = localStorage.getItem("usuarios");
        var usuarios = JSON.parse(arrayJSON);
        var _loop_1 = function (i) {
            // Si el legajo del ítem coincide
            if (usuarios[i].legajo == legajo) {
                // Toma el index del objeto y lo borra
                document.getElementById('btnEliminar').onclick = function () {
                    var index = usuarios.indexOf(usuarios[i]);
                    usuarios.splice(index, 1);
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    armaTabla(perfil);
                };
                return "break";
            }
        };
        // Recorre el array de usuarios 
        for (var i = 0; i < usuarios.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
}
function modificarUsuario(legajo, perfil) {
    // Verifica el token
    var token = localStorage.getItem("token");
    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token": token }
    })
        .done(function (objJson) {
        // Trae los usuarios del localStorage y los guarda en un array
        var arrayJSON = localStorage.getItem("usuarios");
        var usuarios = JSON.parse(arrayJSON);
        var _loop_2 = function (i) {
            // Si el legajo del ítem coincide
            if (usuarios[i].legajo == legajo) {
                // Carga los campos con la información del usuario
                document.getElementById('txtApellido').value = usuarios[i].apellido;
                document.getElementById('txtNombre').value = usuarios[i].nombre;
                document.getElementById('txtEmail').value = usuarios[i].correo;
                document.getElementById('txtLegajo').value = usuarios[i].legajo;
                document.getElementById('cboPerfil').value = usuarios[i].perfil;
                document.getElementById('imgFoto').src = "fotos/" + usuarios[i].foto;
                // Guarda los cambios realizados
                document.getElementById('btnGuardar').onclick = function () {
                    usuarios[i].apellido = document.getElementById('txtApellido').value;
                    usuarios[i].nombre = document.getElementById('txtNombre').value;
                    usuarios[i].correo = document.getElementById('txtEmail').value;
                    usuarios[i].legajo = document.getElementById('txtLegajo').value;
                    usuarios[i].perfil = document.getElementById('cboPerfil').value;
                    usuarios[i].clave = document.getElementById('txtClave').value;
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    armaTabla(perfil);
                };
                return "break";
            }
        };
        // Recorre el array de usuarios 
        for (var i = 0; i < usuarios.length; i++) {
            var state_2 = _loop_2(i);
            if (state_2 === "break")
                break;
        }
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
}
