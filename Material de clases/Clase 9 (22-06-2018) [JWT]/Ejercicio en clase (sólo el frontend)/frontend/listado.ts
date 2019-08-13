window.onload = function () {
    //alert('Holis!');
    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    let token : any = localStorage.getItem("miToken");

    xhttp.open("GET", "../backend/test", true);
    xhttp.setRequestHeader("token", token);

    xhttp.onreadystatechange = () => {
        if (xhttp.status == 200 && xhttp.readyState == 4) {
            let respuesta : string = xhttp.responseText;
        }
    }
}