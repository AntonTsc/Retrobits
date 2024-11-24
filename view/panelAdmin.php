<?php
session_start();
if (!isset($_SESSION['admin']) || $_SESSION['admin'] != "1") {
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

    <!-- LIBRERIAS -->
    <!--Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
    <!--SweetAlert2-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-default/default.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2/dist/sweetalert2.min.js" defer></script>
    <!--Crooper.js-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cropperjs/dist/cropper.min.css">
    <script src="https://cdn.jsdelivr.net/npm/cropperjs/dist/cropper.min.js" defer></script>
    <!--Driver.js-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.css"/>
    <script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.js.iife.js" defer></script>
    <script src="resources/js/guiaUsuarioAdmin.js" defer></script>
    <!-- FIN LIBRERIAS  -->
    
    <!-- Personalizados -->
    <link rel="stylesheet" href="resources/css/panelAdmin.css">
    <script src="resources/js/vistasAjaxAdmin.js" defer></script>
    <!-- Fin Personalizados -->

    <!-- Meta tags -->
    <meta http-equiv="content-language" content="es" />
    <meta http-equiv="content-script-type" content="text/javascript">
    <meta http-quiv="content-style-type" content="text/css">
    <!-- Fin Meta tags -->
</head>

<body>
    <header class="bg-dark">
        <h1 class="pt-2 ps-2 text-white">RetroBits - Panel de administración</h1>
        <ul id="headerLinks" class="nav nav-tabs px-2 pt-2 d-flex">
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
            <li class="nav-item">
                <button id="Codigos" class="nav-link text-light" onclick="cargarContenidoNuevo('Codigos')">CÓDIGOS</button>
            </li>
            <li class="nav-item  ms-auto">
                <button id="auto" class="nav-link text-light border-0" onclick="alternarModoAuto(this)">Actualizaciones automáticas <img class="giro" src="resources/images/svg/automatico.svg" alt=""></button>
            </li>
            <li class="nav-item">
                <button id="guia" class="nav-link text-light bi bi-patch-question" onclick="guiaDeUsuario()"> AYUDA</button>
            </li>
        </ul>
    </header>

    <div class="desactualizado bg-danger"></div>

    <!-- Contenedor donde se cargará el contenido dinámico -->
    <div id="contenido" class="p-3"></div>

    <div id="menuDesplegable" class="menu-desplegable border border-1 rounded-2">
        <ul>
            <li id="mdImagen" class="btnMenu btn btn-white bi bi-image rounded-bottom-0 w-100 text-start py-1 ps-3 bg-light d-none" onclick="clickDerechoAccionImagen()" data-bs-toggle="modal" data-bs-target="#modalVerFotoProducto"> Ver imagen</li>
            <li id="mdEditar" class="btnMenu btn btn-white bi bi-pencil-fill rounded-bottom-0 w-100 text-start py-1 ps-3 bg-light" onclick="clickDerechoAccionEditar()"> Editar</li>
            <li id="mdCancelar" class="btnMenu btn btn-white bi bi-x-circle-fill rounded-0 w-100 text-start py-1 ps-3 bg-light d-none" onclick="clickDerechoAccionCancelar()"> Cancelar</li>
            <li id="mdContrasena" class="btnMenu btn btn-white bi bi-key-fill rounded-0 w-100 text-start py-1 ps-3 bg-light d-none" onclick="clickDerechoAccionContrasena()"> Cambiar contraseña</li>
            <li id="mdEntregado" class="btnMenu btn btn-white bi bi-send-check-fill rounded-2 w-100 text-start py-1 ps-3 bg-light d-none" onclick="clickDerechoAccionEntregado()"> Entregado</li>
            <li id="mdEliminar" class="btnMenu btn btn-danger bi bi-trash-fill rounded-top-0 w-100 text-start py-1 ps-3 mt-1 " onclick="clickDerechoAccionEliminar()"> Eliminar</li>
        </ul>
    </div>
</div>

</body>
</html> 