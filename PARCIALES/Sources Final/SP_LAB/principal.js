window.onload = function () {
    // Trae los usuarios del localStorage y los guarda en un array
    var arrayJSON = localStorage.getItem("usuarios");
    var usuarios = JSON.parse(arrayJSON);
    // Toma el DIV que contiene la tabla
    var divTabla = document.getElementById("tabla");
    var texto = "<table class='table'><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>LEGAJO</th><th>FOTO</th></tr>";
    // Recorre el array de usuarios agregando los datos de los mismos en la tabla
    for (var i = 0; i < usuarios.length; i++) {
        texto += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].apellido + "</td><td>" + usuarios[i].perfil + "</td><td>" + usuarios[i].legajo + "</td><td><img src='" + usuarios[i].foto + "' height='50px' width='50px'</td></tr>";
    }
    // Cierra la tabla y la muestra en el DIV
    texto += "</tbody></table>";
    divTabla.innerHTML = texto;
};
