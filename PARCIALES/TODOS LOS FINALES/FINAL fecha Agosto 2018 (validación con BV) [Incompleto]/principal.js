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
        // Lee el archivo JSON de remeras
        $.ajax({
            url: 'remeras.json',
            dataType: "json"
        })
            .done(function (data) {
            localStorage.setItem("remeras", JSON.stringify(data));
            armarTablaDos(objJson.perfil /*, ''*/);
        })
            .fail(function (data) {
            console.log('error');
        });
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
};
function armarTablaDos(perfil /*, filtro: string*/) {
    // Trae las remeras del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("remeras");
    var remeras = JSON.parse(arrayJSON);
    // Toma el DIV que contiene la tabla
    var divTabla = document.getElementById("tablaDos");
    var texto = "";
    // Arma la tabla según el perfil del usuario
    if (perfil == "encargado") {
        // Agrega los encabezados
        texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th></tr>";
        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (var i = 0; i < remeras.length; i++) {
            texto += "<tr><td>" + remeras[i].id + "</td><td>" + remeras[i].size + "</td><td>" + remeras[i].price + "</td><td>" + remeras[i].color + "</td><td><img src='" + remeras[i].logo + "' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle=\"modal\" data-target=\"#myModalBorrar\" onclick='borrarRemera(" + remeras[i].id + ", \"" + perfil + "\")'></td></tr>";
        }
    }
    else if (perfil == "dueño") {
        // Agrega los encabezados
        texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";
        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (var i = 0; i < remeras.length; i++) {
            texto += "<tr><td>" + remeras[i].id + "</td><td>" + remeras[i].size + "</td><td>" + remeras[i].price + "</td><td>" + remeras[i].color + "</td><td><img src='" + remeras[i].logo + "' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle=\"modal\" data-target=\"#myModalBorrar\" onclick='borrarRemera(" + remeras[i].id + ", \"" + perfil + "\")'></td><td><input type='button' class='btn btn-warning' value='Modificar' data-toggle=\"modal\" data-target=\"#myModal\" onclick='modificarRemera(" + remeras[i].id + ", \"" + perfil + "\")'></td></tr>";
        }
    }
    else {
        if (perfil == "empleado" || perfil == "administrador") {
            // Si es empleado o administrador, le muestra los filtros
            texto = "<div class=\"form-group\">\n                        <label for=\"txtFiltro\" class=\"control-label col-md-2\">Filtrar por tama\u00F1o</label>\n                        <div class=\"col-md-7 input-group\">\n                            <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-resize-full\"></i></span>\n                            <input type=\"text\" class=\"form-control\" id=\"txtFiltro\" name=\"txtFiltro\" placeholder=\"Filtrar por tama\u00F1o\" />\n                        </div>\n                    </div>\n                    <!--<div class=\"form-group\">\n                        <input type=\"button\" value=\"Enviar\" id=\"btnEnviar\" class=\"btn btn-primary col-md-3\" />\n                    </div>-->";
            document.getElementById("divFiltro").innerHTML = texto;
        }
        document.getElementById('txtFiltro').onchange = function () {
            armarTablaDos(perfil);
        };
        // Agrega los encabezados
        if (perfil == "empleado")
            texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th></tr>";
        else if (perfil == "administrador")
            texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";
        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (var i = 0; i < remeras.length; i++) {
            /*if ((<HTMLSelectElement>document.getElementById('txtPais')).value != "" && filtro != remeras[i].size)
                continue;*/
            if (perfil == "empleado")
                texto += "<tr><td>" + remeras[i].id + "</td><td>" + remeras[i].size + "</td><td>" + remeras[i].price + "</td><td>" + remeras[i].color + "</td><td><img src='" + remeras[i].logo + "' height='50px' width='50px'</td></tr>";
            else if (perfil == "administrador")
                texto += "<tr><td>" + remeras[i].id + "</td><td>" + remeras[i].size + "</td><td>" + remeras[i].price + "</td><td>" + remeras[i].color + "</td><td><img src='" + remeras[i].logo + "' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle=\"modal\" data-target=\"#myModalBorrar\" onclick='borrarRemera(" + remeras[i].id + ", \"" + perfil + "\")'></td><td><input type='button' class='btn btn-warning' value='Modificar' onclick='modificarRemera(" + remeras[i].id + ", \"" + perfil + "\")'></td></tr>";
        }
    }
    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
}
/*function Filtrar(perfil: string) {
    console.log(perfil);
    armarTablaDos(perfil, (<HTMLSelectElement>document.getElementById('txtPais')).value);
}*/
function armaTabla(perfil) {
    // Trae los usuarios del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("usuarios");
    var usuarios = JSON.parse(arrayJSON);
    // Toma el DIV que contiene la tabla
    var divTabla = document.getElementById("tabla");
    var texto = "";
    // Agrega los encabezados
    texto = "<h5>Listado de usuarios</h5><table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>PERFIL</th><th>FOTO</th></tr>";
    // Recorre el array de usuarios agregando los datos de los mismos en la tabla
    for (var i = 0; i < usuarios.length; i++) {
        texto += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].perfil + "</td><td><img class=\"\" src='fotos/" + usuarios[i].foto + "' height='50px' width='50px'</td></tr>";
    }
    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
}
function borrarRemera(id, perfil) {
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
        // Trae las remeras del localStorage y las guarda en un array
        var arrayJSON = localStorage.getItem("remeras");
        var remeras = JSON.parse(arrayJSON);
        var _loop_1 = function (i) {
            // Si el id del ítem coincide
            if (remeras[i].id == id) {
                // Toma el index del objeto y lo borra en caso de que presione la confirmación de eliminar
                document.getElementById('btnEliminar').onclick = function () {
                    var index = remeras.indexOf(remeras[i]);
                    remeras.splice(index, 1);
                    localStorage.setItem("remeras", JSON.stringify(remeras));
                    armarTablaDos(perfil);
                };
                return "break";
            }
        };
        // Recorre el array de remeras 
        for (var i = 0; i < remeras.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
}
function modificarRemera(id, perfil) {
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
        // Trae los remeras del localStorage y los guarda en un array
        var arrayJSON = localStorage.getItem("remeras");
        var remeras = JSON.parse(arrayJSON);
        var _loop_2 = function (i) {
            // Si el id del ítem coincide
            if (remeras[i].id == id) {
                // Carga los campos con la información de la remera
                document.getElementById('txtID').value = remeras[i].id;
                document.getElementById('txtTam').value = remeras[i].size;
                document.getElementById('txtPrecio').value = remeras[i].price;
                document.getElementById('txtColor').value = remeras[i].color;
                //(<HTMLImageElement>document.getElementById('imgFoto')).src = "img/" + remeras[i].foto;
                // Guarda los cambios realizados
                document.getElementById('btnGuardar').onclick = function () {
                    remeras[i].id = document.getElementById('txtID').value;
                    remeras[i].size = document.getElementById('txtTam').value;
                    remeras[i].price = document.getElementById('txtPrecio').value;
                    remeras[i].color = document.getElementById('txtColor').value;
                    //remeras[i].clave = (<HTMLSelectElement>document.getElementById('txtClave')).value;
                    localStorage.setItem("remeras", JSON.stringify(remeras));
                    armaTabla(perfil);
                };
                return "break";
            }
        };
        // Recorre el array de remeras 
        for (var i = 0; i < remeras.length; i++) {
            var state_2 = _loop_2(i);
            if (state_2 === "break")
                break;
        }
    })
        .fail(function (objJson) {
        location.href = "login.html";
    });
}
