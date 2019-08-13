/// <reference path="./Ciudadano.ts" />

namespace Test {
    export class Manejadora {
        public static AgregarCiudadano() : void {
            // Traigo los valores de los inputs (si es necesario se convierte de string a number)
            let nombre : string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
            let apellido : string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
            let edad : number = parseInt((<HTMLInputElement> document.getElementById("txtEdad")).value);
            let dni : number = parseInt((<HTMLInputElement> document.getElementById("txtDni")).value);
            let pais : string = (<HTMLSelectElement> document.getElementById("cboPais")).value;
            //let foto : any = (<HTMLInputElement> document.getElementById("foto"));

            // Creo el objeto
            let ciudadano : Entidades.Ciudadano = new Entidades.Ciudadano(nombre, apellido, edad, pais, dni);

            // Creo un objeto de tipo formulario
            let form : FormData = new FormData();

            // Creo una variable para el caso
            let caso : string = "agregar";

            // Dependiendo del valor del input hidden agrega o modifica el registro
            if ((<HTMLInputElement> document.getElementById("hdnIdCiudadano")).value == "modificar") {
                caso = "modificar"; // Establezco el valor del caso a modificar
                Test.Manejadora.LimpiarForm(); // Limpio el formulario
            }

            // Seteo los valores en el form a enviar
            //form.append("foto", foto.files[0]);
            form.append("cadenaJson", ciudadano.CiudadanoToJson());
            form.append("caso", caso);

            // Creo el objeto AJAX estableciendo el método POST y el enctype para subida de archivos
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);

            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);

            // Si está todo bien, toma la respuesta y muestra el resultado
            xhttp.onreadystatechange = () => {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    let respuesta : any = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);

                    // Actualizo el listado
                    Test.Manejadora.MostrarCiudadanos();

                    // Limpio el formulario
                    Test.Manejadora.LimpiarForm();

                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static MostrarCiudadanos(filtro : string = "ninguno") : void {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");

            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = () => {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Guardo en un array de obj JSON la respuesta
                    let respuesta : any[] = JSON.parse(xhttp.responseText);
                    // Establezco el encabezado de la tabla
                    let tabla : string = "<table><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>DNI</th><th>Pais</th><th>Eliminar</th><th>Modificar</th></tr>";
                    
                    // Recorro el array de JSON
                    for (var i : number = 0; i < respuesta.length; i++) {
                        if (filtro == respuesta[i].pais || filtro == "ninguno") {
                            // Guardo una copia del JSON en formato string para transferirlo a otras funciones
                            let ciudadanoJSON : string = JSON.stringify(respuesta[i]);
                            // Muestro la línea de datos del JSON
                            tabla += `<tr><td>${respuesta[i].nombre}</td><td>${respuesta[i].apellido}</td><td>${respuesta[i].edad}</td><td>${respuesta[i].dni}</td><td>${respuesta[i].pais}</td>`
                            // Agrego botones para eliminar y modificar el registro
                            tabla += `<td><input type="button" onclick='Test.Manejadora.EliminarCiudadano(${ciudadanoJSON})' value="Eliminar"></td><td><input type="button" onclick='Test.Manejadora.ModificarCiudadano(${ciudadanoJSON})' value="Modificar"></td></tr>`;
                        }
                    }

                    tabla += "</table>";

                    // Muestro la tabla en el div correspondiente
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;

                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static EliminarCiudadano(ciudadano : string) : void {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            // Paso el objeto haciéndolo nuevamente string (ya que JS por defecto lo transforma a JSON)
            xhttp.send(`caso=eliminar&cadenaJson=${JSON.stringify(ciudadano)}`);

            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
            
            xhttp.onreadystatechange = () => {
                // Si está todo bien
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Creo un objeto JSON de la respuesta y muestro el valor de TodoOK
                    let respuesta : any = JSON.parse(xhttp.responseText);
                    alert(respuesta.TodoOK);
                    // Actualizo el listado
                    Test.Manejadora.MostrarCiudadanos();

                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static ModificarCiudadano(ciudadanoJSON : string) : void {
            // Hago nuevamente string el parámetro (ya que JS por defecto lo transforma a JSON)
            let ciudadano : any = JSON.stringify(ciudadanoJSON);
            // Lo transformo nuevamente a objeto JSON
            ciudadano = JSON.parse(ciudadano);

            // Seteo los valores en los inputs
            (<HTMLInputElement> document.getElementById("txtNombre")).value = ciudadano.nombre;
            (<HTMLInputElement> document.getElementById("txtApellido")).value = ciudadano.apellido;
            (<HTMLInputElement> document.getElementById("txtEdad")).value = String(ciudadano.edad);
            (<HTMLInputElement> document.getElementById("txtDni")).value = String(ciudadano.dni);
            (<HTMLSelectElement> document.getElementById("cboPais")).value = ciudadano.pais;

            // Seteo como sólo lectura el identificador
            (<HTMLInputElement> document.getElementById("txtDni")).readOnly = true;
            
            // Modifico el texto del botón de submit
            (<HTMLInputElement> document.getElementById("submit")).value = "Modificar";

            // Seteo el valor del input hidden a "modificar"
            (<HTMLInputElement> document.getElementById("hdnIdCiudadano")).value = "modificar";
        }

        public static CargarPaisesJSON() {
            // Creo el objeto AJAX estableciendo el método POST y el enctype correspondiente
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=paises");

            // Muestro el spinner
            Test.Manejadora.AdministrarSpinner(true);
            
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
                        (<HTMLSelectElement> document.getElementById("cboPais")).add(opc);
                        // OJO! No verifica si el país ya estaba agregado!
                    }

                    alert("Paises agregados!");

                    // Oculto el spinner
                    Test.Manejadora.AdministrarSpinner(false);
                }
            }
        }

        public static FiltrarCiudadanosPorPais() : void {
            // Tomo el valor del select y lo paso a la función Mostrar como filtro
            let pais : string = (<HTMLSelectElement> document.getElementById("cboPais")).value; 
            Test.Manejadora.MostrarCiudadanos(pais);
        }

        public static LimpiarForm() : void {
            // Seteo todos los inputs en su valor por defecto
            (<HTMLInputElement> document.getElementById("txtNombre")).value = "";
            (<HTMLInputElement> document.getElementById("txtApellido")).value = "";
            (<HTMLInputElement> document.getElementById("txtEdad")).value = "";
            (<HTMLInputElement> document.getElementById("txtDni")).value = "";
            (<HTMLSelectElement> document.getElementById("cboPais")).value = "Argentina";
            // Seteo nuevamente el identificador a modo editable
            (<HTMLInputElement> document.getElementById("txtDni")).readOnly = false;
            // Seteo el valor por defecto del botón submit
            (<HTMLInputElement> document.getElementById("submit")).value = "Agregar";
            // Seteo el valor por defecto del input hidden 
            (<HTMLInputElement> document.getElementById("hdnIdCiudadano")).value = "";
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