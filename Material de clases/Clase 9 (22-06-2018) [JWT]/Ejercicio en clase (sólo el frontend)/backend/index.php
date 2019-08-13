<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';

use \Firebase\JWT\JWT as JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/test', function () {
    $this->get('/{param}', function ($request, $response, $args) {
        try {
            $token = $args['param'];
            $resultado = JWT::decode($token, "qwer", ["HS256"]);
            $response->getBody()->write("Usuario: " . $resultado->usuario);
            echo "Usuario: " . $resultado->usuario;
    
            return $response;
        }
        catch (Exception $e) {
            echo "Se rompió toodo papá -> " . $e;
        }

    });

    $this->post('[/]', function ($request, $response) {
        $arrayVariables = $request->getParsedBody();
        $usuario = $arrayVariables['usuario'];
        $clave = $arrayVariables['clave'];

        $token = JWT::encode(array("usuario" => $usuario, "clave" => $clave), "qwer");

        return $response->withJson($token, 200);
    });
});

$app->post('[/]', function ($request, $response) {
    $arrayVariables = $request->getParsedBody();
    $titulo = $arrayVariables['titulo'];
    $cantante = $arrayVariables['cantante'];
    $anio = $arrayVariables['anio'];
    $token = $arrayVariables['token'];

    if (empty($token) || $token === "")
        echo "ERROR: El token está vacío";

    try {
        $resultado = JWT::decode($token, "qwer", ["HS256"]);
        // Cargar CD

        return $response;
    }
    catch (Exception $e) {
        echo "Token inválido -> " . $e;
    }

});

$app->get('[/]', function ($request, $response) {
    $header = $request->getHeader('token');
    $token = $header[0];

    if (empty($token) || $token === "")
        echo "ERROR: El token está vacío";

    try {
        $resultado = JWT::decode($token, "qwer", ["HS256"]);
        // Mostrar CDs

        return $response;
    }
    catch (Exception $e) {
        echo "{ 'ERROR' : 'Token inválido -> " . $e . "' }";
    }
});

$app->run();