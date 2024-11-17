<?php
    session_start();
    $datos = [];

    $admin = isset($_POST['isAdmin']) ? $_POST['isAdmin'] : false;

    if($admin || password_verify($_POST['oldPassword'], $_SESSION["password"])){
        require_once("../model/MUsuario.php");

        $mUsuario = new MUsuario();

        if($admin){
            $data = [
                "id" => $_POST['userId'],
                "password" => $_POST['password']
            ];
            $usuario = $mUsuario->getUsuarioXid($data['id']);
            if (password_verify($data["password"], $usuario["password"])) {
                $datos = [
                    'status' => 'SAME',
                    'message' => 'La contraseña ingresada es la misma.'
                ];
                header("Content-Type: application/json");
                echo json_encode($datos);
                exit();
            }
        }else{
            $data = [
                "id" => $_SESSION['id'],
                "password" => $_POST['password']
            ];
        }

        if($mUsuario->editPassword($data)){
            if(!$admin){
                $user = $mUsuario->getUsuarioXid($data['id']);
                $_SESSION['password'] = $user['password'];
            }

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

    }else{
        $datos = [
            'status' => 'INCORRECT',
            'message' => 'La contraseña actual no es correcta.'
        ];
    }
    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>