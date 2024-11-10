<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();

    $data = [
        "user" => $_POST['user'],
        "password" => $_POST['password']
    ];

    $datos = [];
    $user = $mUsuario->loginUsuario($data);

    if(!$user){
        $datos = [
            'status' => 'ERROR',
            'message' => 'Usuario o contraseña incorrectos.'
        ];
    } else {
        session_start();
        $_SESSION['id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['password'] = $user['password'];
        $_SESSION['admin'] = $user['admin'];
        $_SESSION['deleted'] = $user['deleted'];

        $datos = [
            'status' => 'OK',
            'message' => 'Inicio de sesión exitoso.'
        ];
    }

    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>