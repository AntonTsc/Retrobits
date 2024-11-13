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

    public function eliminarProducto($id){
        $query = $this->getCon()->prepare("DELETE FROM `productos` WHERE id = ?;");
        $query->bind_param("i", $id);
        $comp = $query->execute() ? true : false;
        $query->close();

        return $comp;
    }

}