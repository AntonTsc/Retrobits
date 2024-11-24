<?php
    require_once("../model/MCodigos.php");

    $mCodigos = new MCodigos();

    $datos = [];

    if($mCodigos->eliminarCodigo($_POST['id'])){
        $datos = [
            'status' => 'OK',
            'message' => 'Código eliminado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido eliminar el código.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>