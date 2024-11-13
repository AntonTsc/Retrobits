<?php
    require_once("../model/MProductos.php");

    $mProductos = new MProductos();

    $datos = [];

    if($mProductos->eliminarProducto($_POST['id'])){
        $datos = [
            'status' => 'OK',
            'message' => 'Producto Borrado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido eliminar el producto.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>