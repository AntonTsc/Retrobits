<?php
    require_once("../model/MProductos.php");

    $con = new MProductos();

    $idProducto = $_POST['idProducto'];

    $productoDetalles = $con->getProductoDetalles($idProducto);

    header('Content-Type: application/json');
    echo json_encode($productoDetalles);
?>