<?php

require(__DIR__. '/../model/MCarrito.php');

require_once(__DIR__ . '/../view/VCarrito.php');

$conexion = new MCarrito();
$productos = $conexion->getCarrito();

$vista = new VCarrito();
$vista -> tablaCarrito($productoCarrito);