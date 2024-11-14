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

    public function insertProducto($data){
        $query = $this->getCon()->prepare("INSERT INTO `productos`(`nombre`, `descripcion`, `precio`, `stock`, `descuento`, `idSeccion`, `deleted`) VALUES (?,?,?,?,?,?,?)");

        $query->bind_param("ssdiiii", $data["nombre"], $data["descripcion"], $data["precio"], $data["stock"], $data["descuento"], $data["idSeccion"], $data["deleted"]);

        $comp = $query->execute() ? true : false;
        $query->close();

        return $comp;
    }

    public function getLastProductoID(){
        $sentencia = $this->getCon()->query('SELECT id FROM productos ORDER BY id DESC LIMIT 1;');

        $productos = $sentencia->fetch_assoc();

        return $productos["id"];
    }

}