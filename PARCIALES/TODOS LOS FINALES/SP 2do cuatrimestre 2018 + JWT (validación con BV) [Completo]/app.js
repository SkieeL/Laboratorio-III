//AL TERMINAR DE CARGAR TODO EL DOM, SE ASIGNAN LOS MANEJADORES DE EVENTOS
$(document).ready(function () {
    ValidatorLogin();
    Load();
    ValidatorRegistro();
});

function ValidatorLogin() {
    $("#loginForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido!!!'
                    },
                    emailAddress: {
                        message: 'El campo email no posee un formato válido!'
                    }
                }
            },
            txtClave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida!!!'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres!!!'
                    }
                }
            }
        }
    });
}

function Load() {
    var token = localStorage.getItem("JSON");
    if (token != null) {
        console.info("Ya existe un array JSON cargado");
        console.log(localStorage.getItem("JSON"));
    }
    else {
        var objJson = '[{"correo":"v.c@gmail.com","clave":"1234","nombre":"Cristian","apellido":"Vega","legajo":107679,"perfil":"invitado","foto":"foto1.jpg"},{"correo":"l.e@gmail.com","clave":"4321","nombre":"Luz","apellido":"Estefania","legajo":107680,"perfil":"administrador","foto":"foto2.jpg"},{"correo":"v.j@gmail.com","clave":"1234","nombre":"Juana","apellido":"Vega","legajo":107681,"perfil":"invitado","foto":"foto3.jpg"},{"correo":"a.r@gmail.com","clave":"1234","nombre":"Rafa","apellido":"Aguera","legajo":107678,"perfil":"invitado","foto":"foto4.jpg"},{"correo":"admin@admin.com","clave":"1234","nombre":"Fran","apellido":"Vega","legajo":107675,"perfil":"administrador","foto":"foto5.jpg"}]';
        console.log(objJson);
        localStorage.setItem("JSON", objJson); //Seteo
    }
}

function GetDatos() {
    var email = $("#txtEmail").val();
    var clave = $("#txtClave").val();

    var cadJSON = localStorage.getItem('JSON');
    var arrayJson = JSON.parse(cadJSON);
    var existeUser = false;
    for (var i = 0; i < arrayJson.length; i++) {
        /*if (email != arrayJson[i].correo && clave != arrayJson[i].clave) {
        }
        if (email == arrayJson[i].correo && clave != arrayJson[i].clave) {
            
        }
        if (email != arrayJson[i].correo && clave == arrayJson[i].clave) {
            
        }*/
        if (email == arrayJson[i].correo && clave == arrayJson[i].clave) //Si los valores coinsiden, recupero datos del usuario
            {
            existeUser = true;
            $("#alert").hide();
            location.href = "./principal.html"; // Y redirecciono
                
        }
        
    }
    if (existeUser == false) {
        $("#alert").show();
    }
}

function ValidatorRegistro() {
    $("#registroForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtApellido: {
                validators: {
                    notEmpty: {
                        message: 'El apellido es requerido!!!'
                    },
                    stringLength: {
                        max: 15,
                        message: 'Por favor, ingrese hasta 15 caracteres!!!'
                    }
                }
            },
            txtNombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es requerida!!!'
                    },
                    stringLength: {
                        max: 10,
                        message: 'Por favor, ingrese hasta 10 caracteres!!!'
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido!!!'
                    },
                    emailAddress: {
                        message: 'El campo email no posee un formato válido!'
                    }
                }
            },
            txtLegajo: {
                validators: {
                    notEmpty: {
                        message: 'El legajo es requerida!!!'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: 'Por favor, ingrese entre 3 y 6 caracteres!!!'
                    },
                    integer:{
                        message:'Debe ingresar un numero entero!!!'
                    }
                }
            },
            file: {
                validators: {
                    notEmpty: {
                        message: 'Seleccione una imagen'
                    },
                    file: {
                        extension: 'jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 699392, //=> 1024 * 683 //2097152 => 2048 * 1024
                        message: 'El archivo seleccionado no es válido!'
                    },
                }
            },
            txtClave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida!!!'
                    },
                    identical: {
                        field: 'txtConfirm',
                        message: 'La contraseña y su confirmación no coinciden!'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres!!!'
                    }
                    
                }
            },txtConfirm: {
                validators: {
                    notEmpty: {
                        message: 'El campo Confirmar Clave es requerido!'
                    },
                    identical: {
                        field: 'txtClave',
                        message: 'La contraseña y su confirmación no coinciden!'
                    }
                }
            }
            
        }
    });
}

function Alta() {
    $('#alertReg').hide();
    var apellido = $("#txtApellido").val();
    var nombre = $("#txtNombre").val();
    var email = $("#txtEmail").val();
    var legajo = $("#txtLegajo").val();
    var perfil = $("#slcPerfil").val();
    var archivo = document.getElementById("file");
    var clave = $("#txtClave").val();
    var confirm = $("#txtConfirmar").val();
    var existeCorreo = false;

    var objJSON = localStorage.getItem("JSON");
    var datos = JSON.parse(objJSON);
    var array = [];
    console.log(objJSON);
    for (var i = 0; i < datos.length; i++) {
        array.push('{"correo":"' + datos[i].correo + '","clave":"' + datos[i].clave + '","nombre":"' + datos[i].nombre + '","apellido":"' + datos[i].apellido + '","legajo":' + datos[i].legajo + ',"perfil":"' + datos[i].perfil + '","foto":"' + datos[i].foto + '"}');
        if (email == datos[i].correo) {
            existeCorreo = true;
            break;
        }
    }
    if (existeCorreo == false) {
        
        var imagen = email + ".jpg";
        var objetoJSON = '{"correo":"' + email + '","clave":"' + clave + '","nombre":"' + nombre + '","apellido":"' + apellido + '","legajo":' + legajo + ',"perfil":"' + perfil + '","foto":"' + imagen + '"}';
        array.push(objetoJSON);
        localStorage.setItem("JSON", "[" + JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(array)))) + "]"); //Sobreescribo
        //console.log(objJSON);
        //alert(objJSON);
        location.href = "./login.html"; // Y redirecciono
        /*}
        else
        {
            console.error(resultado.Mensaje);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        //AdministrarGif(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });*/
    }
    else {
        $('#alertReg').show();
    }
}

function GetData() {
    //let token:any = localStorage.getItem("miToken"); //Recupero el token
    var array = localStorage.getItem("JSON");
    var users = JSON.parse(array);

    var fila = '';
    for (var i = 0; i < users.length; i++) {
        fila += "<tr><td class=\"a\">" + users[i].correo + "</td><td class=\"a\">" + users[i].nombre + "</td><td class=\"a\">" + users[i].apellido + "</td><td class=\"a\">" + users[i].perfil + "</td><td class=\"a\">" + users[i].legajo + "</td>";
        fila += "<td class=\"a\"><img src='fotos/" + users[i].foto + "' width='50px' height='50px' /></td>";
        fila += "<td class=\"b\" style=\"display: none\"><button class=\"btn-danger\" type=\"button\" id=\"btnEliminar\"  onclick='Eliminar(" + JSON.stringify(users[i]) + ")'>Eliminar</button>";
    }
    $("#settings").hide();
    //Spinner(false);
    $("#content").html(fila);
    /*$.ajax({
        type: "POST",
        url: "manejadora.php/validar_token/",
        dataType: "JSON",
        headers: { "token": token },
        async: true
    })
        .done(function (xmlhttp) {
        var respuesta = xmlhttp;
        if (respuesta.Token == "no admin") {
            var users = datos;
            var fila = '';
            //fila+=`<thead><tr><th>Id</th><th>Titulo</th><th>Interprete</th><th>Año</th><th>Foto</th><th>Edicion</th><tr></thead>`;
            for (var i = 0; i < users.length; i++) {
                fila += "<tr><td class=\"a\">" + users[i].correo + "</td><td class=\"a\">" + users[i].nombre + "</td><td class=\"a\">" + users[i].apellido + "</td><td class=\"a\">" + users[i].perfil + "</td><td class=\"a\">" + users[i].legajo + "</td>";
                fila += "<td class=\"a\"><img src='fotos/" + users[i].foto + "' width='50px' height='50px' /></td>";
                fila += "<td class=\"b\" style=\"display: none\"><button class=\"btn-danger\" type=\"button\" id=\"btnEliminar\"  onclick='Eliminar(" + JSON.stringify(users[i]) + ")'>Eliminar</button>";
            }
            $("#settings").hide();
            //Spinner(false);
            $("#content").html(fila);
        }
        if (respuesta.Token == "admin") {
            var users = datos;
            var fila = '';
            //fila+=`<thead><tr><th>Id</th><th>Titulo</th><th>Interprete</th><th>Año</th><th>Foto</th><th>Edicion</th><tr></thead>`;
            for (var i = 0; i < users.length; i++) {
                fila += "<tr><td class=\"a\">" + users[i].correo + "</td><td class=\"a\">" + users[i].nombre + "</td><td class=\"a\">" + users[i].apellido + "</td><td class=\"a\">" + users[i].perfil + "</td><td class=\"a\">" + users[i].legajo + "</td>";
                fila += "<td class=\"a\"><img src='fotos/" + users[i].foto + "' width='50px' height='50px' /></td>";
                fila += "<td class=\"b\" style=\"display: block\"><button class=\"btn-danger\" type=\"button\" id=\"btnEliminar\"  onclick='Eliminar(" + JSON.stringify(users[i]) + ")'>Eliminar</button>";
            }
            $("#settings").show();
            //Spinner(false);
            $("#content").html(fila);
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        window.location.href = "login.html";
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });*/
}