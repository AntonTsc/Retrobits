<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();

    $data = [
        "username" => $_POST['username'],
        "email" => $_POST['email'],
        "password" => $_POST['password'],
        "admin" => isset($_POST['admin']) ? $_POST['admin'] : 0,
        "deleted" => isset($_POST['deleted']) ? $_POST['deleted'] : 0
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
            'message' => 'El nombre de usuario/email ya esta en uso.'
        ];
    }
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>