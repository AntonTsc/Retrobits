<?php

require_once 'Conexion.php';

class MCarrito extends Conexion{

    public function getProductoCarrito($productoCarrito){

        $nombreProducto = null;
        $sentencia = $this ->getCon()->prepare("SELECT * FROM productos_pedidos WHERE idPedido = ?");

        $sentencia -> bind_param("i", $productoCarrito);
        $sentencia -> execute();

        $resultado = $sentencia -> get_result();

        if($fila = $resultado -> fetch_assoc()){
            $nombreProducto = $fila;
        }
        return $nombreProducto;

    }

    public function getCarrito(){

        $query = $this -> getCon() -> query('SELECT * from productos_pedidos');
        $productosCarrito = [];

        while($fila = $query -> fetch_assoc()){
            $productosCarrito[] = $fila;
        }

        return $productosCarrito;

    }

    public function eliminarProducto($idProducto){
        
        $sentencia = $this->getCon()->prepare("DELETE FROM productos_pedidos WHERE idProducto = ?");
        $sentencia->bind_param("i", $idProducto);
        
        return $sentencia->execute();

    }

}

?>