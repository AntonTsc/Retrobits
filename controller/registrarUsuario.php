<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();

    $data = [
        "username" => $_POST['username'],
        "email" => $_POST['email'],
        "password" => $_POST['password']
    ];

    $datos = [];

    if($mUsuario->insertUsuario($data)){
        $datos = [
            'status' => 'OK',
            'message' => 'Usuario creado.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'Usuario ya existente.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>