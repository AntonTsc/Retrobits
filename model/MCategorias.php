<?php

require_once 'Conexion.php';

class MSecciones extends Conexion{

    public function getSecciones(){
        $sentencia = $this->getCon()->query('SELECT * FROM `seccion`');

        $secciones = [];

        while ($fila = $sentencia->fetch_assoc()) {
            $secciones[] = $fila;
        }

        return $secciones;
    }

}