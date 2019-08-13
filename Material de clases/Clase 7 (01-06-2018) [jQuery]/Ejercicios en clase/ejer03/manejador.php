<?php

$persona = json_decode(json_encode($_POST['valor']));

echo json_encode($persona);