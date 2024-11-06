<?php

require_once 'Conexion.php';

class MProductos extends Conexion{

    public function getProductos(){
        $sentencia = $this->getCon()->query('SELECT * FROM `productos`');

        $productos = [];

        while ($fila = $sentencia->fetch_assoc()) {
            $productos[] = $fila;
        }

        return $productos;
    }

}