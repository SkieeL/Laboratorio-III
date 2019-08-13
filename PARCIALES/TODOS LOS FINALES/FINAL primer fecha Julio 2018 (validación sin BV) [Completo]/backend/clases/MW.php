<?php

require_once('Usuario.php');

use Firebase\JWT\JWT as JWT;

class MW {
    public function verificarToken($request, $response, $next) {
        $token = ($request->getHeader("token")[0]);

        try {
            $todo = JWT::decode($token, "1235", ["HS256"]);
        }
        catch(Exception $e) {
            $json = '{ "Error" : "Token inválido" }';
            return $response->withJson(json_decode($json), 409);
        }

        return $next($request, $response);
    }

    public static function verificarPropietario($request, $response, $next) {
        $token = ($request->getHeader("token")[0]);

        $data = JWT::decode($token, "1235", ["HS256"]);

        if ($data->perfil == "propietario") 
            $request = $request->withAttribute('propietario', true);
        else 
            $request = $request->withAttribute('propietario', false);

        return $next($request, $response);
    }

    public static function validarPropietario($request, $response, $next) {
        $propietario = $request->getAttribute('propietario');

        if (!$propietario) {
            $json = '{ "Error" : "Acceso denegado: No es propietario" }';
            return $response->withJson(json_decode($json), 409);
        }

        return $next($request, $response);
    }
}