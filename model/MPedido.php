<?php
require_once("Conexion.php");

class MPedido extends Conexion{
    public function getPedidosXid($id){
        $query = $this->getCon()->prepare("SELECT * FROM pedidos WHERE idUsuario = ?");
        $query->bind_param("i", $id);
        $query->execute();

        $result = $query->get_result();
        $pedidos = [];
        
        while($fila = $result->fetch_assoc()){
            $pedidos[] = $fila;
        }

        return $pedidos;
    }
}

?>