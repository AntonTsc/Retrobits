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

    $modificar = false;

    //Verificar si el nombre de usuario ha cambiado y validar que no exista en la base de datos
    if ($_SESSION['username'] != $data['username']) {
        if ($mUsuario->getUsuarioXusername($data['username'])) {
            $datos = [
                'status' => 'ERROR',
                'message' => 'El nombre de usuario ya está en uso.'
            ];
            echo json_encode($datos);
            exit;
        }
        $modificar = true;
    }
    
    //Verificar si el correo electrónico ha cambiado y validar que no exista en la base de datos
    if ($_SESSION['email'] != $data['email']) {
        if ($mUsuario->getUsuarioXemail($data['email'])) {
            $datos = [
                'status' => 'ERROR',
                'message' => 'El correo electrónico ya está en uso.'
            ];
            echo json_encode($datos);
            exit;
        }
        $modificar = true; // Hay un cambio en el email
    }
    
    
    //Verificar la contraseña antes de realizar cambios
    if (!password_verify($data['password'], $_SESSION['password'])) {
        $datos = [
            'status' => 'ERROR',
            'message' => 'Contraseña incorrecta.'
        ];
        echo json_encode($datos);
        exit;
    }
    
    //Si no hay cambios, devolver un mensaje indicando que no hay nada que actualizar
    if (!$modificar) {
        $datos = [
            'status' => 'INFO',
            'message' => 'No hay cambios en los datos.'
        ];
        echo json_encode($datos);
        exit;
    }

    //Realizar la actualización en la base de datos
    if ($mUsuario->editUsuario($data)) {
        // Actualizar los datos en la sesión si se realizaron cambios
        if ($_SESSION['username'] != $data['username']) {
            $_SESSION['username'] = $data['username'];
        }
        if ($_SESSION['email'] != $data['email']) {
            $_SESSION['email'] = $data['email'];
        }

        $datos = [
            'status' => 'OK',
            'message' => 'Los datos se han modificado correctamente.'
        ];
    } else {
        $datos = [
            'status' => 'ERROR',
            'message' => 'No se pudieron modificar los datos.'
        ];
    }
    
    
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>