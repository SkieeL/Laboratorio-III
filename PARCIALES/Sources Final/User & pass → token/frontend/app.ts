namespace Entidades {
    export class Manejadora {
        public static VerificarUsuario() {
            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            let user : string = (<HTMLInputElement> document.getElementById("usuario")).value;
            let pass : string = (<HTMLInputElement> document.getElementById("clave")).value;
        
            xhttp.open("POST", "../backend/test", true);
            xhttp.send("usuario=" + user + "&clave=" + pass);
        
            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : string = xhttp.responseText;
                    JSON.stringify(respuesta);
        
                    alert(respuesta);
                }
            }
        }
    }
}