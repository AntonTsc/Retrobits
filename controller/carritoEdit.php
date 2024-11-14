<?php

require(__DIR__ . '/../model/MCarrito.php');

$data = json_decode(file_get_contents("php://input"), true);

$direccion = $data["direccion"];
$idUsuario = $data["idUsuario"];
$productosCarrito = $data["productos"];

$con = new MCarrito();
$resultado = $con->enviarPedidoCarrito($direccion, $idUsuario, $productosCarrito);

header('Content-Type: application/json');

echo json_encode(["success" => $resultado]);

