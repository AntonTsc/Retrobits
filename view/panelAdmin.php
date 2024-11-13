<?php
session_start();
if ($_SESSION['admin'] != "1") {
    header("Location: ../");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RB - Panel Admin</title>
    <link rel="icon" href="resources/images/img/retro-bits-logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="resources/css/panelAdmin.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
    <script src="resources/js/vistasAjaxAdmin.js" defer></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-default/default.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2/dist/sweetalert2.min.js" defer></script>
</head>

<body>
    <header class="bg-dark">
        <h1 class="pt-2 ps-2 text-white">RetroBits - Panel de administración</h1>
        <ul class="nav nav-tabs px-2 pt-2">
            <li class="nav-item">
                <a class="btn btn-primary me-2" href="../"><i class="bi bi-house-door-fill"> Inicio</i></a>
            </li>
            <li class="nav-item">
                <button id="Productos" class="nav-link text-light" onclick="cargarContenido('Productos')">PRODUCTOS</button>
            </li>
            <li class="nav-item">
                <button id="Usuarios" class="nav-link text-light" onclick="cargarContenido('Usuarios')">USUARIOS</button>
            </li>
            <li class="nav-item">
                <button id="Pedidos" class="nav-link text-light" onclick="cargarContenido('Pedidos')">PEDIDOS</button>
            </li>
        </ul>
    </header>

    <!-- Contenedor donde se cargará el contenido dinámico -->
    <div id="contenido" class="p-3"></div>

    <div id="menuDesplegable" class="menu-desplegable rounded-2">
    <ul>
        <li id="md1" class="btn btn-light bi bi-pencil-fill rounded-bottom-0 w-100" onclick="accion1()"> Editar</li>
        <li id="md2" class="btn btn-danger bi bi-trash-fill rounded-top-0 w-100" onclick="accion2()"> Eliminar</li>
    </ul>
</div>
</div>

</body>
</html> 