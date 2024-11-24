<?php

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../model/MCodigos.php');

$con = new MCodigos();
$codigos = $con->getAllCodigos();

header('Content-Type: application/json');

// Convertir el objeto/array a JSON
echo json_encode($codigos);