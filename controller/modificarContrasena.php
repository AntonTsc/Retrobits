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
        $user = $mUsuario->getUsuarioXid($data['id']);
        $_SESSION['password'] = $user['password'];

        $datos = [
            'status' => 'OK',
            'message' => 'Contraseña modificada.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se ha podido modificar la contraseña.'
        ];
    }

    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>