<?php

require(__DIR__ . '/../model/MCarrito.php');

$mCarrito = new MCarrito();

$pedido = [
    'direccion' => $_POST["direccion"],
    'fecha' => $_POST["fecha"],
    'fechaEntrega' => $_POST["fechaEntrega"],
    'idUsuario' => $_POST["idUsuario"],
    'descuento' => $_POST["descuento"]
];

$productos = json_decode($_POST["productos"], true);

$mCarrito->enviarPedidoCarrito($pedido, $productos);

header('Content-Type: application/json');
echo json_encode([
    'status' => 'OK',
    'message' => 'Pedido enviado.'
]);
