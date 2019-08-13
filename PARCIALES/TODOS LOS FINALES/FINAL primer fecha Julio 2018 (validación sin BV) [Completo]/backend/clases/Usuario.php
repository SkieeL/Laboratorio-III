<?php

use Firebase\JWT\JWT as JWT;

class Usuario {
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public $foto;

    public function __construct($id = "", $correo = "", $clave = "", $nombre = "", $apellido = "", $perfil = "", $foto = "") {
        $this->id = $id;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->perfil = $perfil;
        $this->foto = $foto;
    }

    public function toJson() {
        return '{"id":'.$this->id.',"correo":"'.$this->correo.'","clave":"'.$this->clave.'","nombre":"'.$this->nombre.'","apellido":"'.$this->apellido.'","perfil":"'.$this->perfil.'","foto":"'.$this->foto.'"}';
    }

    public static function crearToken($request, $response) {
        $arrayDeParametros = $request->getParsedBody();
        $correo = $arrayDeParametros["correo"];
        $clave = $arrayDeParametros["clave"];
    
        try {
            $usuario = new Usuario("", $correo, $clave);
            $respuesta = $usuario->TraerEsteObj();
    
            if($respuesta !== NULL) {
                $payload = array("correo" => $respuesta->correo, "nombre" => $respuesta->nombre, "apellido" => $respuesta->apellido, "perfil" => $respuesta->perfil, "foto" => $respuesta->foto, "exp" => (time() + 20), "iat" => time());
                $token = JWT::encode($payload, "1235");
                return $response->withJson($token, 200);
            }
    
            $json = '{ "valido" : false }';
            return $response->withJson(json_decode($json), 200);
        }
        catch(Exception $e) {
            throw $e;
        }
    }

    public static function verificarToken($request, $response) {
        $token = ($request->getHeader("token")[0]);
    
        try {
            $todo = JWT::decode($token, "1235", ["HS256"]);
            $json = '{ "status" : "Válido" }';
            return $response->withJson(json_decode($json), 200);
        }
        catch(Exception $e) {
            $json = '{ "status" : "Error" }';
            return $response->withJson(json_decode($json), 409);
        }
    }
}