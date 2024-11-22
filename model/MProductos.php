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

    public function getOneProducto($id) {
        $sentencia = $this->getCon()->prepare('SELECT * FROM productos WHERE id = ?');
        $sentencia->bind_param("i", $id);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        $producto = null;
        if ($fila = $resultado->fetch_assoc()) {
            $producto = $fila;
        }
        $sentencia->close();
        return $producto;
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

    public function updateProducto($data){
        $query = $this->getCon()->prepare("UPDATE `productos` SET `nombre` = ?,`descripcion` = ?,`precio` = ?,`stock` = ?,`descuento` = ?,`idSeccion` = ?,`deleted` = ? WHERE id = ?");

        $query->bind_param("ssdiiiii", $data["nombre"], $data["descripcion"], $data["precio"], $data["stock"], $data["descuento"], $data["idSeccion"], $data["deleted"], $data["id"]);

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