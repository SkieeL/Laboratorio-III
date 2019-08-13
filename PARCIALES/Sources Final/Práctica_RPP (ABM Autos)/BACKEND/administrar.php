<?php
$caso = isset($_POST["caso"]) ? $_POST["caso"] : null;

sleep(1);

switch ($caso) {

    case 'agregar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $objJSON = json_decode($cadenaJSON);

        $ar = fopen("./autos.json", "a");
		
		$cant = fwrite($ar, $cadenaJSON . "\r\n");

        fclose($ar);

        $destino = "./fotos/" . $objJSON->foto;
        
        if( ! move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
            $resultado["FotoOK"] = false;
        }
        else{
            $resultado["FotoOK"] = true;
        }

        $resultado["TodoOK"] = $cant > 0 ? true : false;

        echo json_encode($resultado);

        break;

    case 'mostrar':
    
        $a = fopen("./autos.json", "r");

        $string = "";

        while(!feof($a)){
        
            $linea = trim(fgets($a));
        
            if(strlen($linea) > 0)
                $string .=  $linea . ',';        
        }
        
        fclose($a);

        $string = substr($string, 0, strlen($string)-1);        
        
        echo ('['.$string.']');
        
        break;

    case 'eliminar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./autos.json","r");

        $string = '';

        while(!feof($a)){

            $linea = trim(fgets($a));

            if(strlen($linea) > 0){

                $objLinea = json_decode($linea);

                if($objLinea->patente == $obj->patente){
                    continue;
                }

                $string .= $linea . "\r\n";
            }         
        }

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./autos.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        echo json_encode($objRetorno);        
        
        break;

    case 'modificar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./autos.json","r");

        $string = '';

        while(!feof($a)){

            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                
                $objLinea = json_decode($linea);

                if($objLinea->patente == $obj->patente){
                    continue;
                }
                
                $string .= $linea . "\r\n";
            }         
        }

        $string .=  $cadenaJSON . "\r\n";

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./autos.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        echo json_encode($objRetorno);        

        break;

    case "marcas":
    
        $a = fopen("./marcas.json","r");
        $paises = fread($a, filesize("./marcas.json"));
        fclose($a);

        echo ($paises);

        break;

    case "subirFoto":

        $objRetorno = new stdClass();
        $objRetorno->Exito = true;

        $destino = "./" . date("Ymd_His") . ".jpg";
        
        if( ! move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
            $objRetorno->Exito = false;
        }

        echo json_encode($objRetorno);

        break;

    default:
        echo ":(";
        break;
}