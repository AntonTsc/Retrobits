<?php

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../model/MUsuario.php');

$con = new MUsuario();
$productos = $con->getUsuarios();

header('Content-Type: application/json');

// Convertir el objeto/array a JSON
echo json_encode($productos);