function ValidarUsuario() {
    var xhttp = new XMLHttpRequest();
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    xhttp.open("GET", "validar.php?user=" + user + "&pass=" + pass, true);
    xhttp.send("");
    xhttp.onreadystatechange = function () {
        if (xhttp.status == 200 && xhttp.readyState == 4) {
            var respuesta = xhttp.responseText;
            if (respuesta === "OK") {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#00FF00";
            }
            else {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#FF0000";
            }
            alert(respuesta);
        }
    };
}
