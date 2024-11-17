<?php
    session_start();
    $datos = [];

    if(password_verify($_POST['oldPassword'], $_SESSION["password"])){
        require_once("../model/MUsuario.php");
    
        $mUsuario = new MUsuario();
    
        $data = [
            "id" => $_SESSION['id'],
            "password" => $_POST['password']
        ];
    
    
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