<?php

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../model/MProductos.php');

$con = new MProductos();
$productos = $con->getProductos();

header('Content-Type: application/json');

// Convertir el objeto/array a JSON
echo json_encode($productos);