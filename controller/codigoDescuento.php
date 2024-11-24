<?php
    require_once("../model/MDescuentos.php");

    $con = new MDescuentos(); 

    $descuento = $con->getDescuento($_POST["cd"]);

    header('Content-Type: application/json');
    echo json_encode($descuento);
?>