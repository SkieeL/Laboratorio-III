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
        function Ciudadano(nombre, apellido, edad, dni, pais) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.dni = dni;
            _this.pais = pais;
            return _this;
        }
        Ciudadano.prototype.CiudadanoToJson = function () {
            return "{ " + _super.prototype.PersonaToString.call(this) + ", \"dni\" : " + this.dni + ", \"pais\" : \"" + this.pais + "\" }";
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
        Manejadora.AgregarCiudadano = function (caso) {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var dni = parseInt(document.getElementById("txtDni").value);
            var pais = document.getElementById("cboPais").value;
            var ciudadano = new Entidades.Ciudadano(nombre, apellido, edad, dni, pais);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("cadenaJson=" + ciudadano.CiudadanoToJson() + "&caso=" + caso);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = xhttp.responseText;
                    alert(respuesta);
                }
            };
        };
        Manejadora.MostrarCiudadanos = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = xhttp.responseText.split(",");
                    var ciudadano = void 0;
                    var tabla = "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>DNI</th><th>Pais</th><th>Eliminar</th><th>Modificar</th></tr>";
                    for (var i = 0; i < respuesta.length; i++) {
                        ciudadano = JSON.parse(respuesta[i]);
                        tabla += "<tr><td>" + ciudadano.GetNombre + "</td><td>" + ciudadano.GetApellido + "</td><td>" + ciudadano.GetEdad + "</td><td>" + ciudadano.GetDni + "</td><td>" + ciudadano.GetPais + "</td>";
                        tabla += "<td><input type=\"button\" onclick=\"EliminarCiudadano(" + respuesta[i] + ")\" value=\"Eliminar\"></td><td><input type=\"button\" onclick=\"ModificarCiudadano(" + respuesta[i] + ")\" value=\"Modificar\"></td></tr>";
                    }
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.EliminarCiudadano = function (ciudadano) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=eliminar&cadenaJson=" + ciudadano);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                }
            };
        };
        Manejadora.ModificarCiudadano = function (ciudadanoJSON) {
            var ciudadano = JSON.parse(ciudadanoJSON);
            document.getElementById("txtNombre").value = ciudadano.GetNombre();
            document.getElementById("txtApellido").value = ciudadano.GetApellido();
            document.getElementById("txtEdad").value = String(ciudadano.GetEdad());
            document.getElementById("txtDni").value = String(ciudadano.GetDni());
            document.getElementById("txtDni").readOnly = true;
            document.getElementById("cboPais").value = ciudadano.GetPais();
            Test.Manejadora.AgregarCiudadano("modificar");
        };
        // FALTA DESARROLLAR
        Manejadora.prototype.FiltrarCiudadanosPorPais = function () {
            Test.Manejadora.MostrarCiudadanos();
            var pais = document.getElementById("cboPais").value;
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApellido").value = "";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtDni").value = "";
            document.getElementById("cboPais").value = "Argentina";
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
