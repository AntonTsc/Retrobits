<?php
    session_start();
    $datos = [];

    if(!isset($_SESSION['id'])){
        $datos = [
            'status' => 'ERROR',
            'message' => 'Sesión no iniciada.'
        ];
    } else {
        $datos = [
            'status' => 'OK',
            'message' => 'Sesión iniciada.',
            'user' => $_SESSION
        ];
    }

    header("Content-Type: application/json");
    echo json_encode($datos);
    exit();
?>