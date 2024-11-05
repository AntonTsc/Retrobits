<?php

require(__DIR__ . '/../model/MCarrito.php');
require_once(__DIR__ . '/../view/VCarrito.php');


    VCarrito::inithtml();
    VCarrito::tablaCarrito($productosCarrito);
    VCArrito::endhtml();

?>