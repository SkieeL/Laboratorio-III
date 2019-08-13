var Entidades;
(function (Entidades) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.VerificarUsuario = function () {
            var xhttp = new XMLHttpRequest();
            var user = document.getElementById("usuario").value;
            var pass = document.getElementById("clave").value;
            xhttp.open("POST", "../backend/test", true);
            xhttp.send("usuario=" + user + "&clave=" + pass);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    var respuesta = xhttp.responseText;
                    JSON.stringify(respuesta);
                    alert(respuesta);
                }
            };
        };
        return Manejadora;
    }());
    Entidades.Manejadora = Manejadora;
})(Entidades || (Entidades = {}));
