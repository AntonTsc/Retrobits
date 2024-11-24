<?php
require_once("Conexion.php");

class MPedido extends Conexion{

    public function getAllPedidos() {
        $sentencia = $this->getCon()->prepare("SELECT * FROM `pedidos`");
        //sentencia->bind_param("si", nombre, cant_nec);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        $all = [];
        while ($fila = $resultado->fetch_assoc()) {
            $all[] = $fila;
        }
        $sentencia->close();
        return $all;
    }
    public function getPedidosXid($id){
        $query = $this->getCon()->prepare("SELECT id, direccion, fecha, fechaEntrega, descuento FROM pedidos WHERE idUsuario = ?");
        $query->bind_param("i", $id);
        $query->execute();

        $result = $query->get_result();
        $pedidos = [];
        
        while($fila = $result->fetch_assoc()){
            $pedidos[] = $fila;
        }

        return $pedidos;
    }

    public function entregarPedido($datos) {
        $sentencia = $this->getCon()->prepare("UPDATE pedidos SET fechaEntrega = ? WHERE id = ?");
        $sentencia->bind_param("si", $datos["hoy"], $datos["id"]);
        $comp = ($sentencia->execute()) ? true : false;
        $sentencia->close();
        return $comp;
    }
}

?>