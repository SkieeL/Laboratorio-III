/// <reference path="./Ciudadano.ts" />

namespace Test {
    export class Manejadora {
        public static AgregarCiudadano(caso : string) : void {
            let nombre : string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
            let apellido : string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
            let edad : number = parseInt((<HTMLInputElement> document.getElementById("txtEdad")).value);
            let dni : number = parseInt((<HTMLInputElement> document.getElementById("txtDni")).value);
            let pais : string = (<HTMLSelectElement> document.getElementById("cboPais")).value;

            let ciudadano : Entidades.Ciudadano = new Entidades.Ciudadano(nombre, apellido, edad, dni, pais);

            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send(`cadenaJson=${ciudadano.CiudadanoToJson()}&caso=${caso}`);

            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : string = xhttp.responseText;
                    alert(respuesta);
                }
            }
        }

        public static MostrarCiudadanos() : void {
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send(`caso=mostrar`);

            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : string[] = xhttp.responseText.split(",");
                    let ciudadano : Entidades.Ciudadano;
                    let tabla : string = "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>DNI</th><th>Pais</th><th>Eliminar</th><th>Modificar</th></tr>";
                    
                    for (var i : number = 0; i < respuesta.length; i++) {
                        ciudadano = JSON.parse(respuesta[i]);
                        tabla += `<tr><td>${ciudadano.GetNombre}</td><td>${ciudadano.GetApellido}</td><td>${ciudadano.GetEdad}</td><td>${ciudadano.GetDni}</td><td>${ciudadano.GetPais}</td>`
                        tabla += `<td><input type="button" onclick="EliminarCiudadano(${respuesta[i]})" value="Eliminar"></td><td><input type="button" onclick="ModificarCiudadano(${respuesta[i]})" value="Modificar"></td></tr>`;
                    }
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            }
        }

        public static EliminarCiudadano(ciudadano : string) : void {
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send(`caso=eliminar&cadenaJson=${ciudadano}`);
            
            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : any = JSON.parse(xhttp.responseText);

                    alert(respuesta.TodoOK);
                }
            }
        }

        public static ModificarCiudadano(ciudadanoJSON : string) : void {
            let ciudadano : Entidades.Ciudadano = JSON.parse(ciudadanoJSON);

            (<HTMLInputElement> document.getElementById("txtNombre")).value = ciudadano.GetNombre();
            (<HTMLInputElement> document.getElementById("txtApellido")).value = ciudadano.GetApellido();
            (<HTMLInputElement> document.getElementById("txtEdad")).value = String(ciudadano.GetEdad());
            (<HTMLInputElement> document.getElementById("txtDni")).value = String(ciudadano.GetDni());
            (<HTMLInputElement> document.getElementById("txtDni")).readOnly = true;
            (<HTMLSelectElement> document.getElementById("cboPais")).value = ciudadano.GetPais();

            Test.Manejadora.AgregarCiudadano("modificar");
        }

        // FALTA DESARROLLAR
        public FiltrarCiudadanosPorPais() : void {
            Test.Manejadora.MostrarCiudadanos();

            let pais : string = (<HTMLSelectElement> document.getElementById("cboPais")).value;            
        }

        public static LimpiarForm() : void {
            (<HTMLInputElement> document.getElementById("txtNombre")).value = "";
            (<HTMLInputElement> document.getElementById("txtApellido")).value = "";
            (<HTMLInputElement> document.getElementById("txtEdad")).value = "";
            (<HTMLInputElement> document.getElementById("txtDni")).value = "";
            (<HTMLSelectElement> document.getElementById("cboPais")).value = "Argentina";
        }

        public static AdministrarSpinner(mostrar : boolean) : void {
            var gif : string = "./BACKEND/gif-load.gif";
            let div = <HTMLDivElement> document.getElementById("divSpinner");
            let img = <HTMLImageElement> document.getElementById("imgSpinner");
        
            if(mostrar){
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%"
                img.src = gif;
            }
        
            if(!mostrar){
                div.style.display = "none";
                img.src = "";
            }
        }
    }
}