<?php
    require_once("../model/MUsuario.php");

    $mUsuarios = new MUsuario();

    $datos = [];

    if($mUsuarios->eliminarUsuario($_POST['id'])){
        $datos = [
            'status' => 'OK',
            'message' => 'Usuario Borrado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido eliminar el usuario.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>