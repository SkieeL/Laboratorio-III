/// <reference path="./Auto.ts" />

namespace Enlace {
    export class Manejadora {
        public static Agregar() : void {
            let patente : string = (<HTMLInputElement> document.getElementById('txtPatente')).value;
            let marca : string = (<HTMLSelectElement> document.getElementById('cboMarca')).value;
            let str_precio : string = (<HTMLInputElement> document.getElementById('txtPrecio')).value;
            let precio : number = Number(str_precio);

            let autito : Clases.Auto = new Clases.Auto(patente, marca, precio);
            let strAutitoJSON : string = JSON.stringify(autito.ToJson());

            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=agregar&cadenaJson=" + strAutitoJSON);

            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : any = JSON.parse(xhttp.responseText);

                    if (respuesta.TodoOK)
                        console.log("Auto agregado!");
                    else
                        console.error("Error: No se pudo agregar el auto!");
                }
            }
        }

        public static Mostrar() : void {
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");

            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : any = JSON.parse(xhttp.responseText);

                    let muestreo : string = "<table><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Edicion</th></tr>";

                    for (let i : number = 0; i < respuesta.length; i++) {
                        let jsonsito : string = JSON.stringify(respuesta[i]);
                        muestreo += `<tr><td>${respuesta[i].patente}</td><td>${respuesta[i].marca}</td><td>${respuesta[i].precio}</td><td><input type='button' value='Eliminar' onclick='Enlace.Manejadora.Eliminar(${jsonsito})' /><input type='button' value='Modificar' /></td></tr>`;
                    }

                    muestreo += "</table>";

                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = muestreo;

                }
            }
        }

        public static Eliminar(objEliminar : any) : void {
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            let strObjEliminar : string = JSON.stringify(objEliminar);
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=eliminar&cadenaJson=" + strObjEliminar);

            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    let respuesta : any = JSON.parse(xhttp.responseText);

                    if (respuesta.TodoOK) {
                        Manejadora.Mostrar();
                        console.log("Auto eliminado!");
                    }
                    else
                        console.error("Error: No se pudo eliminar el auto!");
                }
            }
        }
    }

}