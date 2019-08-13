<?php

$nombre = $_POST['nombre'];
$obj = new stdClass();
$obj->nombre = $nombre;

echo json_encode($obj);

?>