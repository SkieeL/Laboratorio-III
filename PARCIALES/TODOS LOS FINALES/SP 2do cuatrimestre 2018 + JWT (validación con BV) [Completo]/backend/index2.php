<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';

use \Firebase\JWT\JWT as JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

// Creación del token
$app->post('/CrearToken', function ($request, $response) {
    $arrayVariables = $request->getParsedBody();
    $correo = $arrayVariables['correo'];
    $nombre = $arrayVariables['nombre'];
    $apellido = $arrayVariables['apellido'];
    $perfil = $arrayVariables['perfil'];
    $ahora = time();
    $payload = array("iat" => $ahora, "exp" => $ahora+15, "correo" => $correo, "nombre" => $nombre, "apellido" => $apellido, "perfil" => $perfil);
    
    $token = JWT::encode($payload, "qwer");
    
    //echo $token;

    return $response->withJson($token, 200);
});

// Verificación del token
$app->post('/VerificarToken', function ($request, $response) {
    $arrayVariables = $request->getParsedBody();
    $token = "$arrayVariables['token']";
    //PUTODEMIERDA
    if (empty($token) || $token === "")
        throw new Exception("El token está vacío!"); 

    try {
        $resultado = JWT::decode($token, "qwer", ["HS256"]);
    }
    catch (Exception $e) {
        echo "Token inválido -> " . $e->getMessage();
    }

    return "Todo OK!";
});

$app->run();