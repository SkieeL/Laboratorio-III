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
    .done(function (objJson: any) {
        armaTabla(objJson.perfil);

        // Lee el archivo JSON de remeras
        $.ajax({
            url: 'remeras.json',
            dataType: "json"
        })
        .done(function (data: any) {
            localStorage.setItem("remeras", JSON.stringify(data));
            armarTablaDos(objJson.perfil/*, ''*/);
        })
        .fail(function (data: any){
            console.log('error');
        });
    })
    .fail(function (objJson: any){
        location.href = "login.html";
    });
};

function armarTablaDos(perfil: string/*, filtro: string*/) {
    // Trae las remeras del localStorage y los guarda en un array
    let arrayJSON : any = localStorage.getItem("remeras");
    let remeras : any[] = JSON.parse(arrayJSON);

    // Toma el DIV que contiene la tabla
    let divTabla : HTMLDivElement = (<HTMLDivElement> document.getElementById("tablaDos"));
    let texto : string = "";

    // Arma la tabla según el perfil del usuario
    if (perfil == "encargado") {
        // Agrega los encabezados
        texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th></tr>";

        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < remeras.length; i++) {
            texto += `<tr><td>${remeras[i].id}</td><td>${remeras[i].size}</td><td>${remeras[i].price}</td><td>${remeras[i].color}</td><td><img src='${remeras[i].logo}' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle="modal" data-target="#myModalBorrar" onclick='borrarRemera(${remeras[i].id}, "${perfil}")'></td></tr>`;
        }
    }
    else if (perfil == "dueño") {
        // Agrega los encabezados
        texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";

        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < remeras.length; i++) {
            texto += `<tr><td>${remeras[i].id}</td><td>${remeras[i].size}</td><td>${remeras[i].price}</td><td>${remeras[i].color}</td><td><img src='${remeras[i].logo}' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle="modal" data-target="#myModalBorrar" onclick='borrarRemera(${remeras[i].id}, "${perfil}")'></td><td><input type='button' class='btn btn-warning' value='Modificar' data-toggle="modal" data-target="#myModal" onclick='modificarRemera(${remeras[i].id}, "${perfil}")'></td></tr>`;
        }
    }
    else {
        if (perfil == "empleado" || perfil == "administrador") {
            // Si es empleado o administrador, le muestra los filtros
            texto = `<div class="form-group">
                        <label for="txtFiltro" class="control-label col-md-2">Filtrar por tamaño</label>
                        <div class="col-md-7 input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-resize-full"></i></span>
                            <input type="text" class="form-control" id="txtFiltro" name="txtFiltro" placeholder="Filtrar por tamaño" />
                        </div>
                    </div>
                    <!--<div class="form-group">
                        <input type="button" value="Enviar" id="btnEnviar" class="btn btn-primary col-md-3" />
                    </div>-->`;
            (<HTMLDivElement> document.getElementById("divFiltro")).innerHTML = texto;
        }

        (<HTMLInputElement>document.getElementById('txtFiltro')).onchange = function() { 
            armarTablaDos(perfil, /*(<HTMLSelectElement>document.getElementById('txtPais')).value*/);
        };

        // Agrega los encabezados
        if (perfil == "empleado")
            texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th></tr>";
        else if (perfil == "administrador")
            texto = "<h5>Listado de productos</h5><table class='table'><tr><th>ID</th><th>TAMAÑO</th><th>PRECIO</th><th>COLOR</th><th>LOGO</th><th>ELIMINAR</th><th>MODIFICAR</th></tr>";

        // Recorre el array de remeras agregando los datos de los mismos en la tabla
        for (let i : number = 0; i < remeras.length; i++) {
            /*if ((<HTMLSelectElement>document.getElementById('txtPais')).value != "" && filtro != remeras[i].size)
                continue;*/

            if (perfil == "empleado")
                texto += `<tr><td>${remeras[i].id}</td><td>${remeras[i].size}</td><td>${remeras[i].price}</td><td>${remeras[i].color}</td><td><img src='${remeras[i].logo}' height='50px' width='50px'</td></tr>`;
            else if (perfil == "administrador")
                texto += `<tr><td>${remeras[i].id}</td><td>${remeras[i].size}</td><td>${remeras[i].price}</td><td>${remeras[i].color}</td><td><img src='${remeras[i].logo}' height='50px' width='50px'</td><td><input type='button' class='btn btn-danger' value='Eliminar' data-toggle="modal" data-target="#myModalBorrar" onclick='borrarRemera(${remeras[i].id}, "${perfil}")'></td><td><input type='button' class='btn btn-warning' value='Modificar' onclick='modificarRemera(${remeras[i].id}, "${perfil}")'></td></tr>`;
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

function armaTabla(perfil : string) {
    // Trae los usuarios del localStorage y los guarda en un array
    let arrayJSON: any = localStorage.getItem("usuarios");
    let usuarios: any[] = JSON.parse(arrayJSON);

    // Toma el DIV que contiene la tabla
    let divTabla: HTMLDivElement = (<HTMLDivElement> document.getElementById("tabla"));
    let texto: string = "";

    // Agrega los encabezados
    texto = "<h5>Listado de usuarios</h5><table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>PERFIL</th><th>FOTO</th></tr>";

    // Recorre el array de usuarios agregando los datos de los mismos en la tabla
    for (let i : number = 0; i < usuarios.length; i++) {
        texto += `<tr><td>${usuarios[i].correo}</td><td>${usuarios[i].nombre}</td><td>${usuarios[i].perfil}</td><td><img class="" src='fotos/${usuarios[i].foto}' height='50px' width='50px'</td></tr>`;
    }

    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
}

function borrarRemera(id: number, perfil: string) {
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
        // Trae las remeras del localStorage y las guarda en un array
        let arrayJSON : any = localStorage.getItem("remeras");
        let remeras : any[] = JSON.parse(arrayJSON);

        // Recorre el array de remeras 
        for (let i : number = 0; i < remeras.length; i++) {
            // Si el id del ítem coincide
            if (remeras[i].id == id) {
                // Toma el index del objeto y lo borra en caso de que presione la confirmación de eliminar
                (<HTMLInputElement>document.getElementById('btnEliminar')).onclick = function() {
                    let index : number = remeras.indexOf(remeras[i]);
                    remeras.splice(index, 1);
                    localStorage.setItem("remeras", JSON.stringify(remeras));
                    armarTablaDos(perfil);
                };
                break;
            }
        }
    })
    .fail(function (objJson){
        location.href = "login.html";
    });
}

function modificarRemera(id: number, perfil: string) {
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
    .done(function (objJson: any) {
        // Trae los remeras del localStorage y los guarda en un array
        let arrayJSON: any = localStorage.getItem("remeras");
        let remeras: any[] = JSON.parse(arrayJSON);

        // Recorre el array de remeras 
        for (let i : number = 0; i < remeras.length; i++) {
            // Si el id del ítem coincide
            if (remeras[i].id == id) {
                // Carga los campos con la información de la remera
                (<HTMLInputElement>document.getElementById('txtID')).value = remeras[i].id;
                (<HTMLInputElement>document.getElementById('txtTam')).value = remeras[i].size;
                (<HTMLInputElement>document.getElementById('txtPrecio')).value = remeras[i].price;
                (<HTMLInputElement>document.getElementById('txtColor')).value = remeras[i].color;
                //(<HTMLImageElement>document.getElementById('imgFoto')).src = "img/" + remeras[i].foto;

                // Guarda los cambios realizados
                (<HTMLInputElement>document.getElementById('btnGuardar')).onclick = function() {
                    remeras[i].id = (<HTMLInputElement>document.getElementById('txtID')).value;
                    remeras[i].size = (<HTMLInputElement>document.getElementById('txtTam')).value;
                    remeras[i].price = (<HTMLInputElement>document.getElementById('txtPrecio')).value;
                    remeras[i].color = (<HTMLInputElement>document.getElementById('txtColor')).value;
                    //remeras[i].clave = (<HTMLSelectElement>document.getElementById('txtClave')).value;

                    localStorage.setItem("remeras", JSON.stringify(remeras));
                    armaTabla(perfil);
                };
                break;
            }
        }
    })
    .fail(function (objJson: any){
        location.href = "login.html";
    });
}