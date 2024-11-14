<?php
    require_once("../model/MProductos.php");

    $mProductos = new MProductos();

    $datos = [];

    if($mProductos->eliminarProducto($_POST['id'])){
        // Elimina la imagen asociada al producto
        $rutaImagen = __dir__ . "/../view/resources/images/productos/" . $_POST['id'] . ".jpg";

        if (file_exists($rutaImagen)) {
            // Si la imagen existe, la borramos
            unlink($rutaImagen);
        }
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