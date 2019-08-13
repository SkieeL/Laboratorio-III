function Saludar() {
    var input = $('#inputID').val();
    var div = $('#divID');

    $.ajax({
        type : "POST",
        url : "manejador.php",
        data : JSON.parse('{ "valor" : { "nombre" : "' + input +'" } }'),
        dataType : "json",
        async : true
    }).done(function(param) {
        div.html("Hola " + param.nombre);
    }).fail(function() {
        alert('Falló todo!');
    });
}