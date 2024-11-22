<?php

require(__DIR__ . '/../model/MCarrito.php');

$mCarrito = new MCarrito();

$pedido = [
    'direccion' => $_POST["direccion"],
    'fecha' => $_POST["fecha"],
    'fechaEntrega' => $_POST["fechaEntrega"],
    'idUsuario' => $_POST["idUsuario"]
];

$datos = [];

    if($mCarrito->enviarPedidoCarrito($pedido)){
        $datos = [
            'status' => 'OK',
            'message' => 'Pedido enviado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido enviar el pedido.'
        ];
    }

header('Content-Type: application/json');
echo json_encode(["Pedido enviado"]);

