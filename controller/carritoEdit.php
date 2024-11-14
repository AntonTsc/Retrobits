<?php

require(__DIR__ . '/../model/MCarrito.php');

$con = new MCarrito();
$productosCarrito = $con->enviarPedidoCarrito($productosCarrito);

header('Content-Type: application/json');

echo json_encode($productos);

