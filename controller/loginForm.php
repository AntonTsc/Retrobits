<?php
    require_once("../view/VLogin.php");
    require_once("../view/VGeneral.php");

    VLogin::inithtml();
    VGeneral::nav();
    VLogin::formRegistro();
    VLogin::endhtml();
?>