/// <reference path="ITributable.ts"/>
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio, path) {
            this._path = path;
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Auto.prototype.ToJson = function () {
            return "{ \"marca\" : \"" + this._marca + "\", \"precio\" : " + this._precio + ", \"patente\" : \"" + this._patente + "\", \"foto\" : \"" + this._path + "\" }";
        };
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
/// <reference path="./Auto.ts" />
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Agregar = function () {
            // Traigo los valores de los inputs (si es necesario se convierte de string a number)
            var patente = document.getElementById("txtPatente").value;
            var marca = document.getElementById("cboMarca").value;
            var precio = parseInt(document.getElementById("txtPrecio").value);
            // Traigo el archivo
            var archivo = document.getElementById("foto");
            // Tomo la extensión
            var extension = archivo.value.split(".").pop();
            // Armo la ruta
            var path = patente + '_' + marca + '.' + extension;
            // Creo el objeto
            var auto = new Clases.Auto(patente, marca, precio, path);
            // Creo un objeto de tipo formulario
            var form = new FormData();
            // Creo una variable para el caso
            var caso = "agregar";
            // Dependiendo del valor del input hidden agrega o modifica el registro
            if (document.getElementById("hdnIdModificacion").value == "modificar") {
                caso = "modificar"; // Establezco el valor del caso a modificar
            }
            // Seteo los valores en el form a enviar
            form.append("foto", archivo.files[0]);
            form.append("cadenaJson", auto.ToJson());
            form.append("caso", caso);
            // Creo el objeto AJAX estableciendo el método POST y el enctype para subida de archivos
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            // Si está todo bien, toma la respuesta y muestra el resultado
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    var respuesta = JSON.parse(xhttp.responseText);
                    alert('Formulario: ' + respuesta.TodoOK);
                    // Actualizo el listado
                    Enlace.Manejadora.Mostrar();
                }
                // Si terminó la petición
                if (xhttp.readyState == 4) {
                    // Limpio el formulario
                    Enlace.Manejadora.LimpiarForm();
                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.Mostrar = function (filtro) {
            if (filtro === void 0) { filtro = "ninguno"; }
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array de obj JSON la respuesta
                    var respuesta = JSON.parse(xhttp.responseText);
                    // Establezco el encabezado de la tabla
                    var tabla = "<table><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Foto</th><th>Eliminar</th><th>Modificar</th></tr>";
                    // Recorro el array de JSON
                    for (var i = 0; i < respuesta.length; i++) {
                        if (filtro == respuesta[i].marca || filtro == "ninguno") {
                            // Guardo una copia del JSON en formato string para transferirlo a otras funciones
                            var objJSON = JSON.stringify(respuesta[i]);
                            // Muestro la línea de datos del JSON
                            tabla += "<tr><td>" + respuesta[i].patente + "</td><td>" + respuesta[i].marca + "</td><td>" + respuesta[i].precio + "</td><td><img src=\"BACKEND/fotos/" + respuesta[i].foto + "\" height=\"50px\"></img></td>";
                            // Agrego botones para eliminar y modificar el registro
                            tabla += "<td><input type=\"button\" onclick='Enlace.Manejadora.Eliminar(" + objJSON + ")' value=\"Eliminar\"></td><td><input type=\"button\" onclick='Enlace.Manejadora.Modificar(" + objJSON + ")' value=\"Modificar\"></td></tr>";
                        }
                    }
                    tabla += "</table>";
                    // Muestro la tabla en el div correspondiente
                    document.getElementById("divTabla").innerHTML = tabla;
                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.Eliminar = function (objetoJSON) {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            // Paso el objeto haciéndolo nuevamente string (ya que JS por defecto lo transforma a JSON)
            xhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(objetoJSON));
            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    var respuesta = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                    // Actualizo el listado
                    Enlace.Manejadora.Mostrar();
                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.Modificar = function (objetoJSON) {
            // Hago nuevamente string el parámetro (ya que JS por defecto lo transforma a JSON)
            var objeto = JSON.stringify(objetoJSON);
            // Lo transformo nuevamente a objeto JSON
            objeto = JSON.parse(objeto);
            // Seteo los valores en los inputs
            document.getElementById("txtPatente").value = objeto.patente;
            document.getElementById("cboMarca").value = objeto.marca;
            document.getElementById("txtPrecio").value = String(objeto.precio);
            // Muestro la foto
            document.getElementById("imgFoto").src = 'BACKEND/fotos/' + objeto.foto;
            // Seteo como sólo lectura el identificador 
            document.getElementById("txtPatente").readOnly = true;
            // Modifico el texto del botón de submit (AGREGAR ID EN FORM)
            document.getElementById("submit").value = "Modificar";
            // Seteo el valor del input hidden a "modificar"
            document.getElementById("hdnIdModificacion").value = "modificar";
        };
        Manejadora.CargarMarcasJSON = function () {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=marcas");
            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array los obj JSON
                    var respuesta = JSON.parse(xhttp.responseText);
                    // Recorro el array
                    for (var i = 0; i < respuesta.length; i++) {
                        // Creo un objeto de tipo HTMLOptionElement y le establezco el text y el ID del obj JSON
                        var opc = document.createElement("option");
                        opc.text = respuesta[i].descripcion;
                        opc.id = respuesta[i].id;
                        // Agrego el objeto option al HTMLSelectElement
                        document.getElementById("cboMarca").add(opc);
                        // OJO! No verifica si el país ya estaba agregado!
                    }
                    alert("Marcas agregadas!");
                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.FiltrarPorMarca = function () {
            // Tomo el valor del select y lo paso a la función Mostrar como filtro
            var marca = document.getElementById("cboMarca").value;
            Enlace.Manejadora.Mostrar(marca);
        };
        Manejadora.LimpiarForm = function () {
            // Seteo todos los inputs en su valor por defecto
            document.getElementById("txtPatente").value = "";
            document.getElementById("txtPrecio").value = "";
            document.getElementById("cboMarca").value = "Renault";
            document.getElementById("foto").value = "";
            // Seteo nuevamente el identificador a modo editable
            document.getElementById("txtPatente").readOnly = false;
            // Seteo el valor por defecto del botón submit
            document.getElementById("submit").value = "Agregar";
            // Seteo el valor por defecto del input hidden 
            document.getElementById("hdnIdModificacion").value = "";
            // Muestro la img por defecto
            document.getElementById("imgFoto").src = 'BACKEND/auto_default.jpg';
        };
        Manejadora.AdministrarSpinner = function (mostrar) {
            var gif = "./BACKEND/gif-load.gif";
            var div = document.getElementById("divSpinner");
            var img = document.getElementById("imgSpinner");
            if (mostrar) {
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%";
                img.src = gif;
            }
            if (!mostrar) {
                div.style.display = "none";
                img.src = "";
            }
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
