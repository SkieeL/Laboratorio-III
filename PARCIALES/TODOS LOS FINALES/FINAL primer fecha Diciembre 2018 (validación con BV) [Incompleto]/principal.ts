window.onload = function () {
    // Verifica el token
    let token : any = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token" : token }
    })
    .done(function (objJson) {
        armaTabla(objJson.perfil);
    })
    .fail(function (objJson){
        location.href = "login.html";
    });
};

function armaTabla(perfil : string) {
    // Trae los usuarios del localStorage y los guarda en un array
    let arrayJSON : any = localStorage.getItem("usuarios");
    let usuarios : any[] = JSON.parse(arrayJSON);

    // Toma el DIV que contiene la tabla
    let divTabla : HTMLDivElement = (<HTMLDivElement> document.getElementById("tabla"));
    let texto : string = "";

    // Arma la tabla según el perfil del usuario
    if (perfil == "admin") {
        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th><th>ELIMINAR</th></tr>";

        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < usuarios.length; i++) {
            texto += `<tr><td class="col-lg-2 col-md-3">${usuarios[i].correo}</td><td class="col-lg-2 col-md-3">${usuarios[i].nombre}</td><td class="col-lg-2 col-md-3">${usuarios[i].apellido}</td><td class="col-lg-2 col-md-3">${usuarios[i].perfil}</td><td class="col-lg-2 col-md-3">${usuarios[i].legajo}</td><td class="col-lg-2 col-md-3"><img src='fotos/${usuarios[i].foto}' height='50px' width='50px'</td><td class="col-lg-2 col-md-3"><input type='button' class='btn btn-danger' value='Eliminar' data-toggle="modal" data-target="#myModalBorrar" onclick='borrarUsuario(${usuarios[i].legajo}, "${perfil}")'></td></tr>`;
        }
    }
    else if (perfil == "superadmin") {
        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";

        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < usuarios.length; i++) {
            texto += `<tr><td class="col-lg-2 col-xs-3">${usuarios[i].correo}</td><td class="col-lg-2 col-xs-3">${usuarios[i].nombre}</td><td class="col-lg-2 col-xs-3">${usuarios[i].apellido}</td><td class="col-lg-2 col-xs-3">${usuarios[i].perfil}</td><td class="col-lg-2 col-xs-3">${usuarios[i].legajo}</td><td class="col-lg-2 col-xs-3"><img src='fotos/${usuarios[i].foto}' height='50px' width='50px'</td><td class="col-lg-2 col-xs-3"><input type='button' class='btn btn-danger' value='Eliminar' data-toggle="modal" data-target="#myModalBorrar" onclick='borrarUsuario(${usuarios[i].legajo}, "${perfil}")'></td><td class="col-lg-2 col-xs-3"><input type='button' class='btn btn-warning' value='Modificar' data-toggle="modal" data-target="#myModal" onclick='modificarUsuario(${usuarios[i].legajo}, "${perfil}")'></td></tr>`;
        }
    }
    else {
        if (perfil == "invitado") {
            // Si es invitado, le muestra las preferencias
            texto = `<div class="form-group">
                        <label for="cboColorFondo" class="control-label col-md-2">Color del fondo</label>
                        <div class="col-md-10 input-group">
                            <select name="cboColorFondo" id="cboColorFondo" class="form-control">
                                <option value='white'>Blanco</option>
                                <option value='black'>Negro</option>
                                <option value='gray'>Gris</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cboColorFuente" class="control-label col-md-2">Color de las letras</label>
                        <div class="col-md-10 input-group">
                            <select name="cboColorFuente" id="cboColorFuente" class="form-control">
                                <option value='black'>Negro</option>
                                <option value='white'>Blanco</option>
                                <option value='gray'>Gris</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cboDisplayImg" class="control-label col-md-2">Forma de las fotos</label>
                        <div class="col-md-10 input-group">
                            <select name="cboDisplayImg" id="cboDisplayImg" class="form-control">
                                <option value=''>Cuadrada</option>
                                <option value='img-rounded'>Redondeada</option>
                                <option value='img-circle'>Circular</option>
                            </select>
                        </div>
                    </div>`;
            (<HTMLDivElement> document.getElementById("opcInvitado")).innerHTML = texto;

            // Trae las preferencias del localStorage y las guarda en una variable
            let arrayPrefJSON : any = localStorage.getItem("preferencias");
            let preferencias : any = JSON.parse(arrayPrefJSON);

            // Si no recuperó preferencias del localStorage, establece valores por defecto
            if (preferencias == null) {
                preferencias = new Array<string>();
                preferencias['fondo'] = 'white';
                preferencias['fuente'] = 'black';
                preferencias['images'] = '';
            }

            // Establece las preferencias del usuario
            (<HTMLSelectElement>document.getElementById('cboColorFondo')).value = preferencias['fondo'];
            (<HTMLSelectElement>document.getElementById('cboColorFuente')).value = preferencias['fuente'];
            (<HTMLSelectElement>document.getElementById('cboDisplayImg')).value = preferencias['images'];
            (<HTMLDivElement>document.getElementById('contenedorPpal')).style.backgroundColor = preferencias['fondo'];
            (<HTMLDivElement>document.getElementById('contenedorPpal')).style.color = preferencias['fuente'];
            // Faltaría setearlo YA!

            // En caso de cambiar el color del fondo
            (<HTMLInputElement>document.getElementById('cboColorFondo')).onchange = function() { 
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', `{ "fondo" : "${(<HTMLSelectElement>document.getElementById('cboColorFondo')).value}", "fuente" : "${(<HTMLSelectElement>document.getElementById('cboColorFuente')).value}", "images" : "${(<HTMLSelectElement>document.getElementById('cboDisplayImg')).value}"}`);
                // Actualiza el contenido seleccionado en la página
                (<HTMLDivElement>document.getElementById('contenedorPpal')).style.backgroundColor = (<HTMLSelectElement>document.getElementById('cboColorFondo')).value;
            };

            // En caso de cambiar el color de las letras
            (<HTMLInputElement>document.getElementById('cboColorFuente')).onchange = function() { 
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', `{ "fondo" : "${(<HTMLSelectElement>document.getElementById('cboColorFondo')).value}", "fuente" : "${(<HTMLSelectElement>document.getElementById('cboColorFuente')).value}", "images" : "${(<HTMLSelectElement>document.getElementById('cboDisplayImg')).value}"}`);
                // Actualiza el contenido seleccionado en la página
                (<HTMLDivElement>document.getElementById('contenedorPpal')).style.color = (<HTMLSelectElement>document.getElementById('cboColorFuente')).value;
            };

            // En caso de cambiar el display de las imagenes
            (<HTMLInputElement>document.getElementById('cboDisplayImg')).onchange = function() { 
                // Guarda los cambios en el localStorage
                localStorage.setItem('preferencias', `{ "fondo" : "${(<HTMLSelectElement>document.getElementById('cboColorFondo')).value}", "fuente" : "${(<HTMLSelectElement>document.getElementById('cboColorFuente')).value}", "images" : "${(<HTMLSelectElement>document.getElementById('cboDisplayImg')).value}"}`);
                // Actualiza el contenido seleccionado en la página
                armaTabla(perfil);
            };
        }

        // Agrega los encabezados
        texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th></tr>";

        // Recorre el array de usuarios agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < usuarios.length; i++) {
            texto += `<tr><td>${usuarios[i].correo}</td><td>${usuarios[i].nombre}</td><td>${usuarios[i].apellido}</td><td>${usuarios[i].perfil}</td><td>${usuarios[i].legajo}</td><td><img class="${(<HTMLSelectElement>document.getElementById('cboDisplayImg')).value}" src='fotos/${usuarios[i].foto}' height='50px' width='50px'</td></tr>`;
        }
    }

    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
}

function borrarUsuario(legajo : number, perfil : string) {
    // Verifica el token
    let token : any = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token" : token }
    })
    .done(function (objJson) {
        // Trae los usuarios del localStorage y los guarda en un array
        let arrayJSON : any = localStorage.getItem("usuarios");
        let usuarios : any[] = JSON.parse(arrayJSON);

        // Recorre el array de usuarios 
        for (let i : number = 0; i < usuarios.length; i++) {
            // Si el legajo del ítem coincide
            if (usuarios[i].legajo == legajo) {
                // Toma el index del objeto y lo borra
                (<HTMLInputElement>document.getElementById('btnEliminar')).onclick = function() {
                    let index : number = usuarios.indexOf(usuarios[i]);
                    usuarios.splice(index, 1);
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    armaTabla(perfil);

                    
                };
                break;
            }
        }
    })
    .fail(function (objJson){
        location.href = "login.html";
    });
}

function modificarUsuario(legajo : number, perfil : string) {
    // Verifica el token
    let token : any = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: "backend/token",
        dataType: "json",
        contentType: false,
        processData: false,
        headers: { "token" : token }
    })
    .done(function (objJson) {
        // Trae los usuarios del localStorage y los guarda en un array
        let arrayJSON : any = localStorage.getItem("usuarios");
        let usuarios : any[] = JSON.parse(arrayJSON);

        // Recorre el array de usuarios 
        for (let i : number = 0; i < usuarios.length; i++) {
            // Si el legajo del ítem coincide
            if (usuarios[i].legajo == legajo) {
                // Carga los campos con la información del usuario
                (<HTMLInputElement>document.getElementById('txtApellido')).value = usuarios[i].apellido;
                (<HTMLInputElement>document.getElementById('txtNombre')).value = usuarios[i].nombre;
                (<HTMLInputElement>document.getElementById('txtEmail')).value = usuarios[i].correo;
                (<HTMLInputElement>document.getElementById('txtLegajo')).value = usuarios[i].legajo;
                (<HTMLSelectElement>document.getElementById('cboPerfil')).value = usuarios[i].perfil;
                (<HTMLImageElement>document.getElementById('imgFoto')).src = "fotos/" + usuarios[i].foto;

                // Guarda los cambios realizados
                (<HTMLInputElement>document.getElementById('btnGuardar')).onclick = function() {
                    usuarios[i].apellido = (<HTMLInputElement>document.getElementById('txtApellido')).value;
                    usuarios[i].nombre = (<HTMLInputElement>document.getElementById('txtNombre')).value;
                    usuarios[i].correo = (<HTMLInputElement>document.getElementById('txtEmail')).value;
                    usuarios[i].legajo = (<HTMLInputElement>document.getElementById('txtLegajo')).value;
                    usuarios[i].perfil = (<HTMLSelectElement>document.getElementById('cboPerfil')).value;
                    usuarios[i].clave = (<HTMLSelectElement>document.getElementById('txtClave')).value;

                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    armaTabla(perfil);
                };
                break;
            }
        }
    })
    .fail(function (objJson){
        location.href = "login.html";
    });
}