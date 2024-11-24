<?php
require_once("Conexion.php");

class MDescuentos extends Conexion{
    public function getDescuento($codigo){
        $query = $this->getCon()->prepare("SELECT * FROM descuentos WHERE codigo = ?");
        $query->bind_param("s", $codigo);
        $query->execute();

        $result = $query->get_result();
        $pedidos = "";
        
        if($fila = $result->fetch_assoc()){
            $pedidos = $fila;
        }

        return $pedidos;
    }
}

?>