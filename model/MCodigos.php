<?php
require_once("Conexion.php");

class MCodigos extends Conexion{

    public function getAllCodigos() {
        $sentencia = $this->getCon()->prepare("SELECT * FROM `descuentos`");
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

    public function eliminarCodigo($id) {
        $sentencia = $this->getCon()->prepare('DELETE FROM descuentos WHERE codigo = ?');
        $sentencia->bind_param("s", $id);
        $comp = false;
        ($sentencia->execute()) ? $comp = true : null;
        $sentencia->close();
        return $comp;
    }

    public function insertCodigo($datos) {
        $sentencia = $this->getCon()->prepare("INSERT INTO descuentos(codigo, porcentaje) VALUES (?,?)");
        $sentencia->bind_param("si", $datos["codigo"], $datos["descuento"]);
        $comp = false;
        ($sentencia->execute()) ? $comp = true : null;
        $sentencia->close();
        return $comp;
    }

    public function updateCodigos($datos) {
        $sentencia = $this->getCon()->prepare("UPDATE descuentos SET codigo = ?, porcentaje = ? WHERE codigo = ?");
        $sentencia->bind_param("sis", $datos["nuevoCodigo"], $datos["descuento"], $datos["codigo"]);
        $comp = ($sentencia->execute()) ? true : false;
        $sentencia->close();
        return $comp;
    }
}

?>