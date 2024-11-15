<?php
require_once("../model/MProductos.php");

$mProductos = new MProductos();

    $datos = [];

    if($mProductos->updateProducto($_POST)){
        $datos = [
            'status' => 'OK',
            'message' => 'Producto actualizado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido actualizar el producto.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>