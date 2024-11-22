<?php

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../model/MProductos.php');

$con = new MProductos();
if(isset($_POST["id"])){
    $producto = $con->getOneProducto($_POST["id"]);
}else{
    $producto = $con->getProductos();
}

header('Content-Type: application/json');

// Convertir el objeto/array a JSON
echo json_encode($producto);