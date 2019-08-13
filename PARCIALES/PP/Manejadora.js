/// <reference path="./Ciudadano.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadano = function () {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var dni = parseInt(document.getElementById("txtDni").value);
            var pais = document.getElementById("cboPais").value;
            var ciudadano = new Entidades.Ciudadano(nombre, apellido, edad, dni, pais);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("cadenaJson=" + ciudadano.CiudadanoToJson + "&caso=agregar");
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
                        tabla += "<td><input type=\"button\" onclick=\"EliminarCiudadano(" + ciudadano + ")\" value=\"Eliminar\"></td><td><input type=\"button\" onclick=\"ModificarCiudadano(" + ciudadano + ")\" value=\"Modificar\"></td></tr>";
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
        };
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
