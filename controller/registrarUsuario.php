<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();

    $data = [
        "username" => $_POST['username'],
        "email" => $_POST['email'],
        "password" => $_POST['password']
    ];

    if($mUsuario->insertUsuario($data)){
        http_response_code(200); //Esto envía un OK
    } else {
        http_response_code(409); //Este envía que NO, no funciona esto porque siempre sale la alerta de que se hizo la inserción.
    }
    
    header("Content-Type: application/json");
    echo json_encode([]);
    exit();
?>