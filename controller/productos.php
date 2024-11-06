<?php

require(__DIR__. '/../model/MCarrito.php');

$conexion = new MCarrito();
$productos = $conexion->getCarrito();

header('Content-Type: application/json');

echo json_encode($productos);

?>
