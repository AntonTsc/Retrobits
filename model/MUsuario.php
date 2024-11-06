<?php
    require_once("Conexion.php");

    class MUsuario extends Conexion{
        public function getUsuarios(){
            $query = $this->getCon()->query("SELECT * FROM usuarios");
            $usuarios = [];

            while($fila = $query->fetch_assoc()){
                $usuarios[] = $fila;
            }

            return $usuarios;
        }

        //TODO: verificar que no deje crear un usuario, cuando está ya en la bbdd
        public function insertUsuario($data){
            $query = $this->getCon()->prepare("INSERT INTO usuarios (`nombre`, `email`, `password`, `admin`, `deleted`) VALUES (?, ?, ?, 0, 0);");
            $query->bind_param("sss", $data['username'], $data['email'], $data['password']);

            $comp = false;
            ($query->execute()) ? $comp = true : null;

            $query->close();

            return $comp;
        }
    }
?>