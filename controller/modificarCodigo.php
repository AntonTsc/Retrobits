<?php
require_once("../model/MCodigos.php");

$mCodigos = new MCodigos();

    $datos = [];

    if($mCodigos->updateCodigos($_POST)){
        $datos = [
            'status' => 'OK',
            'message' => 'Codigo actualizado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido actualizar el codigo.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>