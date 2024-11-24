<?php
    require_once("Conexion.php");

    class MProductos_pedidos extends Conexion{
        public function getProductos_pedidosXid($id){
            $query = $this->getCon()->prepare("SELECT * FROM productos_pedidos WHERE idPedido = ?");
            $query->bind_param("i", $id);
            $query->execute();

            $resultado = $query->get_result();
            $productos_pedidos = [];

            while($fila = $resultado->fetch_assoc()){
                $productos_pedidos[] = $fila;
            }

            return $productos_pedidos;
        }
    }

?>