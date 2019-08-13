/// <reference path="./Auto.ts" />

namespace Enlace {
    export class Manejadora {
        public static Agregar() : void {
            // Traigo los valores de los inputs (si es necesario se convierte de string a number)
            let patente : string = (<HTMLInputElement> document.getElementById("txtPatente")).value;
            let marca : string = (<HTMLSelectElement> document.getElementById("cboMarca")).value;
            let precio : number = parseInt((<HTMLInputElement> document.getElementById("txtPrecio")).value);
            // Traigo el archivo
            let archivo : any = (<HTMLInputElement> document.getElementById("foto"));
            // Tomo la extensión
            let extension : string = archivo.value.split(".").pop();
            // Armo la ruta
            let path : string = patente + '_' + marca + '.' + extension;

            // Creo el objeto
            let auto : Clases.Auto = new Clases.Auto(patente, marca, precio, path);

            // Creo un objeto de tipo formulario
            let form : FormData = new FormData();

            // Creo una variable para el caso
            let caso : string = "agregar";

            // Dependiendo del valor del input hidden agrega o modifica el registro
            if ((<HTMLInputElement> document.getElementById("hdnIdModificacion")).value == "modificar") {
                caso = "modificar"; // Establezco el valor del caso a modificar
            }

            // Seteo los valores en el form a enviar
            form.append("foto", archivo.files[0]);
            form.append("cadenaJson", auto.ToJson());
            form.append("caso", caso);

            // Creo el objeto AJAX estableciendo el método POST y el enctype para subida de archivos
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);

            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);

            // Si está todo bien, toma la respuesta y muestra el resultado
            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    let respuesta : any = JSON.parse(xhttp.responseText);
                    alert('Formulario: ' + respuesta.TodoOK);

                    // Actualizo el listado
                    Enlace.Manejadora.Mostrar();
                }

                // Si terminó la petición
                if (xhttp.readyState == 4) {
                    // Limpio el formulario
                    Enlace.Manejadora.LimpiarForm(); 

                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static Mostrar(filtro : string = "ninguno") : void {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");

            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = () => {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array de obj JSON la respuesta
                    let respuesta : any[] = JSON.parse(xhttp.responseText);
                    // Establezco el encabezado de la tabla
                    let tabla : string = "<table><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Foto</th><th>Eliminar</th><th>Modificar</th></tr>";
                    
                    // Recorro el array de JSON
                    for (var i : number = 0; i < respuesta.length; i++) {
                        if (filtro == respuesta[i].marca || filtro == "ninguno") {
                            // Guardo una copia del JSON en formato string para transferirlo a otras funciones
                            let objJSON : string = JSON.stringify(respuesta[i]);
                            // Muestro la línea de datos del JSON
                            tabla += `<tr><td>${respuesta[i].patente}</td><td>${respuesta[i].marca}</td><td>${respuesta[i].precio}</td><td><img src="BACKEND/fotos/${respuesta[i].foto}" height="50px"></img></td>`
                            // Agrego botones para eliminar y modificar el registro
                            tabla += `<td><input type="button" onclick='Enlace.Manejadora.Eliminar(${objJSON})' value="Eliminar"></td><td><input type="button" onclick='Enlace.Manejadora.Modificar(${objJSON})' value="Modificar"></td></tr>`;
                        }
                    }

                    tabla += "</table>";

                    // Muestro la tabla en el div correspondiente
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;

                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static Eliminar(objetoJSON : string) : void {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            // Paso el objeto haciéndolo nuevamente string (ya que JS por defecto lo transforma a JSON)
            xhttp.send(`caso=eliminar&cadenaJson=${JSON.stringify(objetoJSON)}`);

            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            
            xhttp.onreadystatechange = () => {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    let respuesta : any = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                    // Actualizo el listado
                    Enlace.Manejadora.Mostrar();

                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static Modificar(objetoJSON : string) : void {
            // Hago nuevamente string el parámetro (ya que JS por defecto lo transforma a JSON)
            let objeto : any = JSON.stringify(objetoJSON);
            // Lo transformo nuevamente a objeto JSON
            objeto = JSON.parse(objeto);

            // Seteo los valores en los inputs
            (<HTMLInputElement> document.getElementById("txtPatente")).value = objeto.patente;
            (<HTMLSelectElement> document.getElementById("cboMarca")).value = objeto.marca;
            (<HTMLInputElement> document.getElementById("txtPrecio")).value = String(objeto.precio);

            // Muestro la foto
            (<HTMLImageElement> document.getElementById("imgFoto")).src = 'BACKEND/fotos/' + objeto.foto;

            // Seteo como sólo lectura el identificador 
            (<HTMLInputElement> document.getElementById("txtPatente")).readOnly = true;
            
            // Modifico el texto del botón de submit (AGREGAR ID EN FORM)
            (<HTMLInputElement> document.getElementById("submit")).value = "Modificar";

            // Seteo el valor del input hidden a "modificar"
            (<HTMLInputElement> document.getElementById("hdnIdModificacion")).value = "modificar";
        }

        public static CargarMarcasJSON() : void {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=marcas");

            // Muestro el spinner
            Enlace.Manejadora.AdministrarSpinner(true);
            
            xhttp.onreadystatechange = () => {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array los obj JSON
                    let respuesta : any[] = JSON.parse(xhttp.responseText);

                    // Recorro el array
                    for(let i : number = 0; i < respuesta.length; i++) {
                        // Creo un objeto de tipo HTMLOptionElement y le establezco el text y el ID del obj JSON
                        let opc : any = (<HTMLOptionElement> document.createElement("option"));
                        opc.text = respuesta[i].descripcion;
                        opc.id = respuesta[i].id;

                        // Agrego el objeto option al HTMLSelectElement
                        (<HTMLSelectElement> document.getElementById("cboMarca")).add(opc);
                        // OJO! No verifica si el país ya estaba agregado!
                    }

                    alert("Marcas agregadas!");

                    // Oculto el spinner
                    Enlace.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static FiltrarPorMarca() : void {
            // Tomo el valor del select y lo paso a la función Mostrar como filtro
            let marca : string = (<HTMLSelectElement> document.getElementById("cboMarca")).value; 
            Enlace.Manejadora.Mostrar(marca);
        }

        public static LimpiarForm() : void {
            // Seteo todos los inputs en su valor por defecto
            (<HTMLInputElement> document.getElementById("txtPatente")).value = "";
            (<HTMLInputElement> document.getElementById("txtPrecio")).value = "";
            (<HTMLSelectElement> document.getElementById("cboMarca")).value = "Renault";
            (<HTMLInputElement> document.getElementById("foto")).value = "";
            // Seteo nuevamente el identificador a modo editable
            (<HTMLInputElement> document.getElementById("txtPatente")).readOnly = false;
            // Seteo el valor por defecto del botón submit
            (<HTMLInputElement> document.getElementById("submit")).value = "Agregar";
            // Seteo el valor por defecto del input hidden 
            (<HTMLInputElement> document.getElementById("hdnIdModificacion")).value = "";
            // Muestro la img por defecto
            (<HTMLImageElement> document.getElementById("imgFoto")).src = 'BACKEND/auto_default.jpg';
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