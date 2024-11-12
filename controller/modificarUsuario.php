<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();
    session_start();
    
    $data = [
        "id" => $_SESSION['id'],
        "username" => $_POST['username'],
        "email" => $_POST['email'],
        "password" => $_POST['password']
    ];

    $datos = [];

    if(password_verify($data['password'], $_SESSION['password'])){
        if($mUsuario->editUsuario($data)){
            $_SESSION['username'] = $data['username'];
            $_SESSION['email'] = $data['email'];

            $datos = [
                'status' => 'OK',
                'message' => 'Los datos se han modificado.',
                'sesionUsername' => $_SESSION['username']
            ];
        } else {
            $datos = [
                'status' => 'ERROR',
                'message' => 'No se han modificado los datos.'
            ];
        }
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'Contraseña incorrecta.'
        ];
    }
    
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>