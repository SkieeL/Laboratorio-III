/// <reference path="./Interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        Auto.prototype.ToJson = function () {
            var cadena = "{ \"patente\" : \"" + this._patente + "\", \"marca\" : \"" + this._marca + "\", \"precio\" : " + this._precio + " }";
            return JSON.parse(cadena);
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
            var patente = document.getElementById('txtPatente').value;
            var marca = document.getElementById('cboMarca').value;
            var str_precio = document.getElementById('txtPrecio').value;
            var precio = Number(str_precio);
            var autito = new Clases.Auto(patente, marca, precio);
            var strAutitoJSON = JSON.stringify(autito.ToJson());
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=agregar&cadenaJson=" + strAutitoJSON);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = JSON.parse(xhttp.responseText);
                    if (respuesta.TodoOK)
                        console.log("Auto agregado!");
                    else
                        console.error("Error: No se pudo agregar el auto!");
                }
            };
        };
        Manejadora.Mostrar = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = JSON.parse(xhttp.responseText);
                    var muestreo = "<table><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Edicion</th></tr>";
                    for (var i = 0; i < respuesta.length; i++) {
                        var jsonsito = JSON.stringify(respuesta[i]);
                        muestreo += "<tr><td>" + respuesta[i].patente + "</td><td>" + respuesta[i].marca + "</td><td>" + respuesta[i].precio + "</td><td><input type='button' value='Eliminar' onclick='Enlace.Manejadora.Eliminar(" + jsonsito + ")' /><input type='button' value='Modificar' /></td></tr>";
                    }
                    muestreo += "</table>";
                    document.getElementById("divTabla").innerHTML = muestreo;
                }
            };
        };
        Manejadora.Eliminar = function (objEliminar) {
            var xhttp = new XMLHttpRequest();
            var strObjEliminar = JSON.stringify(objEliminar);
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=eliminar&cadenaJson=" + strObjEliminar);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = JSON.parse(xhttp.responseText);
                    if (respuesta.TodoOK) {
                        Manejadora.Mostrar();
                        console.log("Auto eliminado!");
                    }
                    else
                        console.error("Error: No se pudo eliminar el auto!");
                }
            };
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
