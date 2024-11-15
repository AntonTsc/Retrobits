<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();
    session_start();

    $data = [
        "id" => $_SESSION['id'],
        "password" => $_POST['password']
    ];

    $datos = [];

    if($mUsuario->editPassword($data)){
        $datos = [
            'status' => 'OK',
            'message' => 'Contraseña modificada.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido modificar la contraseña'
        ];
    }

    header("Content-Type: apllication/json");
    echo json_encode($datos);
    exit();
?>