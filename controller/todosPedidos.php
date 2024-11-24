<?php
    require_once("../model/MPedido.php");

    $mPedidos = new MPedido();

    $pedidos = $mPedidos->getAllPedidos();

    header('Content-Type: application/json');
    echo json_encode($pedidos);
?>