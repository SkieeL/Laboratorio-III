<?php

if (isset($_GET['user']) && isset($_GET['pass'])) {
    $user = $_GET['user'];
    $pass = $_GET['pass'];
    $archivo = fopen("usuarios.txt", "r");
    $respuesta = "";

    while (!feof($archivo)) {
        $linea = fgets($archivo);
        $linea = trim($linea);
        $data = explode(" - ", $linea);

        if ($user == $data[0] && $pass == $data[1]) {
            $respuesta = "OK";
            break;
        }
    }

    if (empty($respuesta)) {
        $respuesta = "NO OK";
    }

    echo $respuesta;

    fclose($archivo);
}

?>