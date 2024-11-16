<?php
session_start();
if ($_SESSION['admin'] != "1") {
     // Enviar un mensaje de permiso denegado con un código 403
     header("HTTP/1.1 403 Forbidden");
     echo json_encode(['error' => 'Acceso denegado']);
     exit();
}
?>

<h1>hola</h1>
<h1>hola</h1>
<h1>hola</h1>