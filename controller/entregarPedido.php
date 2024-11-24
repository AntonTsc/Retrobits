<?php
    require_once("../model/MPedido.php");

    $mPedido = new MPedido();

    $datos = [];

    if($mPedido->entregarPedido($_POST)){
        $datos = [
            'status' => 'OK',
            'message' => '¡Pedido entregado!'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido entregar el pedido.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>