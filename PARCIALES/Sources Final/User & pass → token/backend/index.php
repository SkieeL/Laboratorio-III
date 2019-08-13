<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';

use \Firebase\JWT\JWT as JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

// Creación del token
$app->any('/CrearToken[/]', function ($request, $response) {
    $arrayVariables = $request->getParsedBody();
    $usuario = $arrayVariables['usuario'];
    $ahora = time();
    $payload = array("iat" => $ahora, "exp" => $ahora+60, "usuario" => $usuario);

    $token = JWT::encode($payload, "qwer");

    return $response->withJson($token, 200);
});

// Verificación del token
$app->post('[/]', function ($request, $response) {
    $arrayVariables = $request->getParsedBody();
    $titulo = $arrayVariables['titulo'];
    $cantante = $arrayVariables['cantante'];
    $anio = $arrayVariables['anio'];
    $token = $arrayVariables['token'];

    if (empty($token) || $token === "")
        throw new Exception("El token está vacío!"); 

    try {
        $resultado = JWT::decode($token, "qwer", ["HS256"]);
        // Cargar CD
    }
    catch (Exception $e) {
        echo "Token inválido -> " . $e->getMessage();
    }

    return "Todo OK!";
});

// Otra verificación del token
$app->get('[/]', function ($request, $response) {
    $header = $request->getHeader('token');
    $token = $header[0];

    if (empty($token) || $token === "")
    throw new Exception("El token está vacío!"); 

    try {
        $resultado = JWT::decode($token, "qwer", ["HS256"]);
        // Mostrar CDs
    }
    catch (Exception $e) {
        echo "{ 'ERROR' : 'Token inválido -> " . $e->getMessage() . "' }";
    }

    return "{ 'OK' : 'Todo OK!' }";
});

$app->run();