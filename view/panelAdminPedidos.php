<?php
session_start();
if ($_SESSION['admin'] != "1") {
    header("Location: ../");
    exit();
}
?>

<h1>hola</h1>
<h1>hola</h1>
<h1>hola</h1>