<?php
    require_once("../model/MProductos.php");

    $mProductos = new MProductos();
    $datos = [];
    if($mProductos->insertProducto($_POST)){
        $datos = [
            'status' => 'OK',
            'message' => 'Producto creado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'Error al crear el producto.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>