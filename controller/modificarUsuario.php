<?php
    require_once("../model/MUsuario.php");

    $mUsuario = new MUsuario();
    session_start();
    
    $data = [
        "id" => $_SESSION['id'],
        "userId" => isset($_POST["userId"]) ? $_POST["userId"] : "",
        "username" => $_POST['username'],
        "userOldName" => isset($_POST['userOldName']) ? $_POST['userOldName'] : "",
        "email" => $_POST['email'],
        "userOldEmail" => isset($_POST['userOldEmail']) ? $_POST['userOldEmail'] : "",
        "password" => isset($_POST['password']) ? $_POST['password'] : "",
        "admin" => isset($_POST['admin']) ? $_POST['admin'] : "",
        "borrado" => isset($_POST['borrado']) ? $_POST['borrado'] : "",
        "isAdmin" => isset($_POST['isAdmin']) ? $_POST['isAdmin'] : false
    ];

    $datos = [];

    $modificar = false;
    //Verificar si el nombre de usuario ha cambiado y validar que no exista en la base de datos
    if ($_SESSION['username'] != $data['username']) {
        if ($data['userOldName'] != $data['username']) {
            if ($mUsuario->getUsuarioXusername($data['username'])) {
                $datos = [
                    'status' => 'ERROR',
                    'message' => 'El nombre de usuario ya está en uso.',
                    'prueba' => $data['admin']
                ];
                echo json_encode($datos);
                exit;
            }
            $modificar = true;
        }
    }
    
    //Verificar si el correo electrónico ha cambiado y validar que no exista en la base de datos
    if ($_SESSION['email'] != $data['email']) {
        if ($data['userOldEmail'] != $data['email']) {
            if ($mUsuario->getUsuarioXemail($data['email'])) {
                $datos = [
                    'status' => 'ERROR',
                    'message' => 'El correo electrónico ya está en uso.',
                    'erros' => $data['userOldEmail'] . " - " . $data['email']
                ];
                echo json_encode($datos);
                exit;
            }
        }
        $modificar = true; // Hay un cambio en el email
    }
    
    
    //Verificar la contraseña antes de realizar cambios
    if (!$data["isAdmin"] && !password_verify($data['password'], $_SESSION['password'])) {
        $datos = [
            'status' => 'ERROR',
            'message' => 'Contraseña incorrecta.'
        ];
        echo json_encode($datos);
        exit;
    }
    
    //Si no hay cambios, devolver un mensaje indicando que no hay nada que actualizar
    if (!$data["isAdmin"] && !$modificar) {
        $datos = [
            'status' => 'INFO',
            'message' => 'No hay cambios en los datos.'
        ];
        echo json_encode($datos);
        exit;
    }

    //Realizar la actualización en la base de datos
    
    //Si el cambio es ejecutado desde el panel de administración
    if($data["isAdmin"] && $mUsuario->editUsuarioEntero($data)){
        if($_SESSION["id"] == $data["userId"]){
            if ($_SESSION['username'] != $data['username']) {
                $_SESSION['username'] = $data['username'];
            }
            if ($_SESSION['email'] != $data['email']) {
                $_SESSION['email'] = $data['email'];
            }
        }
        $datos = [
            'status' => 'OK',
            'message' => 'Los datos se han modificado correctamente.',
            'test' => $data["admin"]
        ];
    }else if($mUsuario->editUsuario($data)) {
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