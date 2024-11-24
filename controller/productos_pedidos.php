<?php
    require_once("../model/MProductos_pedidos.php");

    $con = new MProductos_pedidos();

    $id = $_POST['id'];

    $productos_pedidos = $con->getProductos_pedidosXid($id);

    header('Content-Type: application/json');
    echo json_encode($productos_pedidos);
?>