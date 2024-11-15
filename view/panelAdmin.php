<?php
session_start();
if ($_SESSION['admin'] != "1") {
    header("Location: ../");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cropperjs/dist/cropper.min.css">
    <script src="https://cdn.jsdelivr.net/npm/cropperjs/dist/cropper.min.js"></script>

</head>

<body>
    <header class="bg-dark">
        <h1 class="pt-2 ps-2 text-white">RetroBits - Panel de administración</h1>
        <ul class="nav nav-tabs px-2 pt-2">
            <li class="nav-item">
                <a class="btn btn-primary me-2" href="../"><i class="bi bi-house-door-fill"> Inicio</i></a>
            </li>
            <li class="nav-item">
                <button id="Productos" class="nav-link text-light" onclick="cargarContenidoNuevo('Productos')">PRODUCTOS</button>
            </li>
            <li class="nav-item">
                <button id="Usuarios" class="nav-link text-light" onclick="cargarContenidoNuevo('Usuarios')">USUARIOS</button>
            </li>
            <li class="nav-item">
                <button id="Pedidos" class="nav-link text-light" onclick="cargarContenidoNuevo('Pedidos')">PEDIDOS</button>
            </li>
        </ul>
    </header>

    <div class="desactualizado bg-light"></div>

    <!-- Contenedor donde se cargará el contenido dinámico -->
    <div id="contenido" class="p-3"></div>

    <div id="menuDesplegable" class="menu-desplegable border border-1 rounded-2">
        <ul>
            <li id="mdImagen" class="btnMenu btn btn-white bi bi-image rounded-bottom-0 w-100 text-start py-1 ps-3 d-none bg-light" onclick="clickDerechoAccionImagen()" data-bs-toggle="modal" data-bs-target="#modalVerFotoProducto"> Ver imagen</li>
            <li id="mdEditar" class="btnMenu btn btn-white bi bi-pencil-fill rounded-bottom-0 w-100 text-start py-1 ps-3 bg-light" onclick="clickDerechoAccionEditar()"> Editar</li>
            <li id="mdCancelar" class="btnMenu btn btn-white bi bi-x-circle rounded-0 w-100 text-start py-1 ps-3 d-none bg-light" onclick="clickDerechoAccionCancelar()"> Cancelar</li>
            <li id="mdEliminar" class="btnMenu btn btn-danger bi bi-trash-fill rounded-top-0 w-100 text-start py-1 ps-3 mt-1 " onclick="clickDerechoAccionEliminar()"> Eliminar</li>
        </ul>
    </div>
</div>

</body>
</html> 