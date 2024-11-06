<?php
require(__DIR__ . '/../model/MCarrito.php');

header('Content-Type: application/json');

$eleccion = json_decode(file_get_contents("php://input"), true);
$idProducto = $eleccion['idProducto'] ?? null;

if($idProducto){
    $conexion = new MCarrito();
    $resultado = $conexion->eliminarProducto($idProducto);

    if ($resultado) {
            echo json_encode(['message' => 'Producto eliminado correctamente']);
        } else {
            echo json_encode(['message' => 'Error al eliminar el producto']);
        }

}
?>