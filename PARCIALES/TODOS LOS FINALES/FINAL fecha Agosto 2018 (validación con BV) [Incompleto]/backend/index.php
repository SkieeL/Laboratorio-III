<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "./vendor/autoload.php";
require_once "./clases/Usuario.php";
require_once "./clases/MW.php";

use Firebase\JWT\JWT as JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new Slim\App(["settings" => $config]);

$app->post('/setToken[/]', function ($request, $response) {
    $correo = $_POST["correo"];
    $nombre = $_POST["nombre"];
    $perfil = $_POST["perfil"];

    try {
        $payload = array("valido" => true, "correo" => $correo, "nombre" => $nombre, "perfil" => $perfil, "exp" => (time() + 3000), "iat" => time());
        $token = JWT::encode($payload, "1235");
        return $response->withJson($token, 200);
    }
    catch(Exception $e) {
        throw $e;
    }
});

$app->get('/token[/]', function ($request, $response) {
    $token = ($request->getHeader("token")[0]);
    //return $response->withJson(json_decode($token), 200);

    try {
        $respuesta = JWT::decode($token, "1235", ["HS256"]);
        return $response->withJson($respuesta, 200);
    }
    catch(Exception $e) {
        $respuesta = '{ "valido" : false }';
        return $response->withJson($respuesta, 409);
    }
});

$app->post('/cargarFoto[/]', function ($request, $response) {
    if(isset($_FILES["foto"])) {
        $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);

        if($extension != "jpg" && $extension != "png") {
            return $response->withJson("Error", 200);
        }
        else {
            $tmp_name = $_FILES["foto"]["tmp_name"];
            move_uploaded_file($tmp_name,"../fotos/".$_POST["email"].".".$extension);   
            return $response->withJson("Ok", 200);
        }
    }    
});

$app->run();

?>