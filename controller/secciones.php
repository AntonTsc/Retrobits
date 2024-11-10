<?php

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../model/MCategorias.php');

$con = new MSecciones();
$secciones = $con->getSecciones();

header('Content-Type: application/json');

// Convertir el objeto/array a JSON
echo json_encode($secciones);