<?php

require(__DIR__. '/../model/MCarrito.php');

require_once(__DIR__ . '/../view/VCarrito.php');

$conexion = new MCarrito();
$productos = $conexion->getCarrito();

header('Content-Type: application/json');

echo json_encode($productos);

?>
