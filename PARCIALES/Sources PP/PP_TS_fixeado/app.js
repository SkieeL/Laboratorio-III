var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.PersonaToString = function () {
            return "\"nombre\" : \"" + this.nombre + "\", \"apellido\" : \"" + this.apellido + "\", \"edad\" : " + this.edad;
        };
        Persona.prototype.GetNombre = function () {
            return this.nombre;
        };
        Persona.prototype.GetApellido = function () {
            return this.apellido;
        };
        Persona.prototype.GetEdad = function () {
            return this.edad;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="./Persona.ts" />
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, pais, dni) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.pais = pais;
            _this.dni = dni;
            return _this;
        }
        Ciudadano.prototype.CiudadanoToJson = function () {
            return "{ " + _super.prototype.PersonaToString.call(this) + ", \"pais\" : \"" + this.pais + "\", \"dni\" : " + this.dni + " }";
        };
        Ciudadano.prototype.GetDni = function () {
            return this.dni;
        };
        Ciudadano.prototype.GetPais = function () {
            return this.pais;
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
/// <reference path="./Ciudadano.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadano = function () {
            // Traigo los valores de los inputs (si es necesario se convierte de string a number)
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var dni = parseInt(document.getElementById("txtDni").value);
            var pais = document.getElementById("cboPais").value;
            //let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            // Creo el objeto
            var ciudadano = new Entidades.Ciudadano(nombre, apellido, edad, pais, dni);
            // Creo un objeto de tipo formulario
            var form = new FormData();
            // Creo una variable para el caso
            var caso = "agregar";
            // Dependiendo del valor del input hidden agrega o modifica el registro
            if (document.getElementById("hdnIdCiudadano").value == "modificar") {
                caso = "modificar"; // Establezco el valor del caso a modificar
                Test.Manejadora.LimpiarForm(); // Limpio el formulario
            }
            // Seteo los valores en el form a enviar
            //form.append("foto", foto.files[0]);
            form.append("cadenaJson", ciudadano.CiudadanoToJson());
            form.append("caso", caso);
            // Creo el objeto AJAX estableciendo el método POST y el enctype para subida de archivos
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
            // Si está todo bien, toma la respuesta y muestra el resultado
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    var respuesta = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                    // Actualizo el listado
                    Test.Manejadora.MostrarCiudadanos();
                    // Limpio el formulario
                    Test.Manejadora.LimpiarForm();
                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.MostrarCiudadanos = function (filtro) {
            if (filtro === void 0) { filtro = "ninguno"; }
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array de obj JSON la respuesta
                    var respuesta = JSON.parse(xhttp.responseText);
                    // Establezco el encabezado de la tabla
                    var tabla = "<table><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>DNI</th><th>Pais</th><th>Eliminar</th><th>Modificar</th></tr>";
                    // Recorro el array de JSON
                    for (var i = 0; i < respuesta.length; i++) {
                        if (filtro == respuesta[i].pais || filtro == "ninguno") {
                            // Guardo una copia del JSON en formato string para transferirlo a otras funciones
                            var ciudadanoJSON = JSON.stringify(respuesta[i]);
                            // Muestro la línea de datos del JSON
                            tabla += "<tr><td>" + respuesta[i].nombre + "</td><td>" + respuesta[i].apellido + "</td><td>" + respuesta[i].edad + "</td><td>" + respuesta[i].dni + "</td><td>" + respuesta[i].pais + "</td>";
                            // Agrego botones para eliminar y modificar el registro
                            tabla += "<td><input type=\"button\" onclick='Test.Manejadora.EliminarCiudadano(" + ciudadanoJSON + ")' value=\"Eliminar\"></td><td><input type=\"button\" onclick='Test.Manejadora.ModificarCiudadano(" + ciudadanoJSON + ")' value=\"Modificar\"></td></tr>";
                        }
                    }
                    tabla += "</table>";
                    // Muestro la tabla en el div correspondiente
                    document.getElementById("divTabla").innerHTML = tabla;
                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.EliminarCiudadano = function (ciudadano) {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            // Paso el objeto haciéndolo nuevamente string (ya que JS por defecto lo transforma a JSON)
            xhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(ciudadano));
            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    var respuesta = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                    // Actualizo el listado
                    Test.Manejadora.MostrarCiudadanos();
                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.ModificarCiudadano = function (ciudadanoJSON) {
            // Hago nuevamente string el parámetro (ya que JS por defecto lo transforma a JSON)
            var ciudadano = JSON.stringify(ciudadanoJSON);
            // Lo transformo nuevamente a objeto JSON
            ciudadano = JSON.parse(ciudadano);
            // Seteo los valores en los inputs
            document.getElementById("txtNombre").value = ciudadano.nombre;
            document.getElementById("txtApellido").value = ciudadano.apellido;
            document.getElementById("txtEdad").value = String(ciudadano.edad);
            document.getElementById("txtDni").value = String(ciudadano.dni);
            document.getElementById("cboPais").value = ciudadano.pais;
            // Seteo como sólo lectura el identificador
            document.getElementById("txtDni").readOnly = true;
            // Modifico el texto del botón de submit
            document.getElementById("submit").value = "Modificar";
            // Seteo el valor del input hidden a "modificar"
            document.getElementById("hdnIdCiudadano").value = "modificar";
        };
        Manejadora.CargarPaisesJSON = function () {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=paises");
            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
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
                        document.getElementById("cboPais").add(opc);
                        // OJO! No verifica si el país ya estaba agregado!
                    }
                    alert("Paises agregados!");
                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.FiltrarCiudadanosPorPais = function () {
            // Tomo el valor del select y lo paso a la función Mostrar como filtro
            var pais = document.getElementById("cboPais").value;
            Test.Manejadora.MostrarCiudadanos(pais);
        };
        Manejadora.LimpiarForm = function () {
            // Seteo todos los inputs en su valor por defecto
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApellido").value = "";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtDni").value = "";
            document.getElementById("cboPais").value = "Argentina";
            // Seteo nuevamente el identificador a modo editable
            document.getElementById("txtDni").readOnly = false;
            // Seteo el valor por defecto del botón submit
            document.getElementById("submit").value = "Agregar";
            // Seteo el valor por defecto del input hidden 
            document.getElementById("hdnIdCiudadano").value = "";
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
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
