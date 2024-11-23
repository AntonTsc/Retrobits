<?php

require_once 'Conexion.php';

class MCarrito extends Conexion{
    //Función que recoge un producto específico de productos_pedidos
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
    //Función para recoger los datos de los productos incluídos en productos_pedidos para mostrarlos en el carrito
    public function getCarrito(){

        $query = $this -> getCon() -> query('SELECT * from productos_pedidos');
        $productosCarrito = [];

        while($fila = $query -> fetch_assoc()){
            $productosCarrito[] = $fila;
        }

        return $productosCarrito;

    }

    //Función para eliminar el producto del carrito
    public function eliminarProductoCarrito($idProducto){
        
        $sentencia = $this->getCon()->prepare("DELETE FROM productos_pedidos WHERE idProducto = ?");
        $sentencia->bind_param("i", $idProducto);
        
        return $sentencia->execute();

    }

    //Función para enviar el pedido del carrito
    public function enviarPedidoCarrito($pedido, $productos){
        
        $sentenciaProductosPedidos = $this->getCon()->prepare("INSERT INTO pedidos (direccion, fecha, fechaEntrega,idUsuario ) VALUES (?, ?, ?, ?)");
        $sentenciaProductosPedidos->bind_param("sssi", $pedido['direccion'], $pedido['fecha'], $pedido['fechaEntrega'], $pedido['idUsuario']);
        
        $sentenciaProductosPedidos->execute();
        $sentenciaProductosPedidos->close();

    // Obtener el ID del pedido recién creado
    $idPedido = $this->getCon()->insert_id;
    
    // Insertar productos asociados en la tabla productos_pedidos
    $sentenciaProductos = $this->getCon()->prepare(
        "INSERT INTO productos_pedidos (idPedido, idProducto, cantidad) VALUES (?, ?, ?)"
    );

    foreach ($productos as $producto) {
        $sentenciaProductos->bind_param("iii", $idPedido, $producto['id'], $producto['cantidad']);
        $sentenciaProductos->execute();
    }

    // Cerrar la consulta de productos
    $sentenciaProductos->close();
        

    return true;

    }

}

?>