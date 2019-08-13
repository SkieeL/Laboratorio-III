<?php

require_once('AccesoDatos.php');

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

    public static function cargarUsuario($request, $response) {
        $arrayDeParametros = $request->getParsedBody();
        $correo = $arrayDeParametros["correo"];
        $clave = $arrayDeParametros["clave"];
        $nombre = $arrayDeParametros["nombre"];
        $apellido = $arrayDeParametros["apellido"];
        $perfil = $arrayDeParametros["perfil"];
        $archivos = $request->getUploadedFiles();
    
        $destino = "./fotos/";
        $nombreAnterior = $archivos['foto']->getClientFilename();
        $extension = explode(".", $nombreAnterior);
        $extension = array_reverse($extension);
        $destinoFinal = $destino . $correo . "." . $extension[0];
        $archivos['foto']->moveTo($destinoFinal);
    
        $usuario = new Usuario("", $correo, $clave, $nombre, $apellido, $perfil, $destinoFinal);
        $respuesta = $usuario->Agregar();
    
        if ($respuesta) {
            $json = '{ "status" : "Registro insertado exitosamente" }';
            $codigo = 200;
        }
            
        else {
            $json = '{ "status" : "Error, no se pudo ingresar el registro en la base de datos" }';
            $codigo = 409;
        }
            
        return $response->withJson(json_decode($json), $codigo);
    }

    public static function traerUsuarios($request, $response) {
        $usuarios = Usuario::TraerTodoObj();
    
        $str = "[ ";
    
        foreach ($usuarios as $usuario)  {
            if($str != "[ ")
                $str .= ", ";
    
            $str .= $usuario->toJson();
        }
    
        $str.=" ]";
    
        if($str == "[  ]") {
            $str = '{ "status" : "Error" }';
        }
    
        return $response->withJson(json_decode($str), 200);
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

    public function Agregar() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo, clave, nombre, apellido, perfil, foto) VALUES (:correo, :clave, :nombre, :apellido, :perfil, :foto)");
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil',$this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto',$this->foto, PDO::PARAM_STR);
        		
        return $consulta->execute();
    }

    public function Borrar() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM usuarios WHERE correo = :correo"); 
        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->rowCount();
    }

    public function Modificar() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET (correo, clave, nombre, apellido, perfil, foto) = (:correo, :clave, :nombre, :apellido, :perfil, :foto) WHERE correo = :correo");
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil',$this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto',$this->foto, PDO::PARAM_STR);
        		
        return $consulta->execute();
    }

    public function TraerEste() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE correo = :correo");
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }

    public function TraerEsteObj() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE correo = :correo");
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->execute();
        $obj = NULL;

        while($fila = $consulta->fetch()){
            $obj = new Usuario($fila[0], $fila[1], $fila[2], $fila[3], $fila[4], $fila[5], $fila[6]);
        }

        return $obj;
    }

    public static function TraerTodo() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function TraerTodoObj() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();
        $arrayObj = array();
        
        while($fila = $consulta->fetch()){
            $obj = new Usuario($fila[0], $fila[1], $fila[2], $fila[3], $fila[4], $fila[5], $fila[6]);
            array_push($arrayObj, $obj);
        }

        return $arrayObj;
    }
}