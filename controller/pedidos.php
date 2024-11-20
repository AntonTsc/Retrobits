<?php
    require_once("../model/MPedido.php");

    $mPedidos = new MPedido();
    session_start();

    $id = $_SESSION['id'];
    $pedidos = $mPedidos->getPedidosXid($id);

    header('Content-Type: application/json');
    echo json_encode($pedidos);
?>