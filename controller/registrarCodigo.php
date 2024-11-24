<?php
    require_once("../model/MCodigos.php");

    $mCodigos = new MCodigos();

    $datos = [];

    if($mCodigos->insertCodigo($_POST)){
        $datos = [
            'status' => 'OK',
            'message' => 'Codigo creado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se pudo crear el codigo.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>