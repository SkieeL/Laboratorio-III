function ValidarUsuario() : void {
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    let user : string = (<HTMLInputElement> document.getElementById("user")).value;
    let pass : string = (<HTMLInputElement> document.getElementById("pass")).value;

    xhttp.open("GET", "validar.php?user=" + user + "&pass=" + pass, true);
    xhttp.send("");

    xhttp.onreadystatechange = () => {
        if (xhttp.status == 200 && xhttp.readyState == 4) {
            let respuesta : string = xhttp.responseText;

            if (respuesta === "OK") {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#00FF00";
            }
            else {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#FF0000";
            }

            alert(respuesta);
        }
    }
}