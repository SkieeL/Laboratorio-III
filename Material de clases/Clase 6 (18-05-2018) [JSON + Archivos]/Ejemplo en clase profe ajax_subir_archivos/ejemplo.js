"use strict";
/*! Comentario visible en .js

Función para subir una foto al servidor web y
mostrarla en un tag img, utilizando AJAX

*/
function SubirFoto() {
    var xhr = new XMLHttpRequest();
    var foto = document.getElementById("foto");
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('op', "subirFoto");
    xhr.open('POST', './BACKEND/nexo.php', true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var retJSON = JSON.parse(xhr.responseText);
            if (!retJSON.Ok) {
                console.error("NO se subió la foto!!!");
            }
            else {
                console.info("Foto subida OK!!!");
                document.getElementById("imgFoto").src = "./BACKEND/" + retJSON.Path;
            }
        }
    };
}
//# sourceMappingURL=ejemplo.js.map