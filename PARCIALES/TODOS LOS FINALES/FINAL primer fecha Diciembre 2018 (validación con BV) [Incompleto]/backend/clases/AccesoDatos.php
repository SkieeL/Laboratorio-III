<?php

class AccesoDatos {
    private static $ObjetoAccesoDatos;
    private $objetoPDO;
 
    private function __construct() {
        try { 
            $this->objetoPDO = new PDO('mysql:host=localhost;dbname=final;charset=utf8', 'root', '');
        } 
        catch (PDOException $e) { 
            print "Error!: " . $e->getMessage(); 
            die();
        }
    }
 
    public function RetornarConsulta($sql) { 
        return $this->objetoPDO->prepare($sql); 
    }
 
    public static function dameUnObjetoAcceso() { 
        if (!isset(self::$ObjetoAccesoDatos)) {          
            self::$ObjetoAccesoDatos = new AccesoDatos(); 
        } 

        return self::$ObjetoAccesoDatos;        
    }
 
    // Evita que el objeto se pueda clonar
    public function __clone() { 
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR); 
    }
}

?>