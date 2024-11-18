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

    public function getUsuario($user, $email){
        $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE username = ? OR email = ?");
        $query->bind_param("ss", $user, $email);
        $query->execute();

        $result = $query->get_result();
        $usuarios = [];

        while($fila = $result->fetch_assoc()){
            $usuarios[] = $fila;
        }

        return (count($usuarios) > 0) ? true : false;
    }

    public function getUsuarioXid($id){
        $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE id = ?");
        $query->bind_param("i", $id);
        $query->execute();

        $result = $query->get_result();
        $usuario = $result->fetch_assoc();

        $query->close();

        return $usuario;
    }

    public function getUsuarioXusername($user){
        $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE username = ?");
        $query->bind_param("s", $user);
        $query->execute();

        $result = $query->get_result();
        $usuarios = [];

        while($fila = $result->fetch_assoc()){
            $usuarios[] = $fila;
        }

        return (count($usuarios) > 0) ? true : false;
    }

    public function getUsuarioXemail($email){
        $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();

        $result = $query->get_result();
        $usuarios = [];

        while($fila = $result->fetch_assoc()){
            $usuarios[] = $fila;
        }

        return (count($usuarios) > 0) ? true : false;
    }

    public function insertUsuario($data){
        if(!($this->getUsuario($data['username'], $data['email']))){
            $query = $this->getCon()->prepare("INSERT INTO usuarios (`username`, `email`, `password`, `admin`, `deleted`) VALUES (?, ?, ?, ?, ?);");
            
            // Contraseña encriptada    
            $encPass = password_hash($data['password'], PASSWORD_DEFAULT);
            $query->bind_param("sssii", $data['username'], $data['email'], $encPass, $data["admin"], $data["deleted"]);
            $query->execute();
            $query->close();

            return true;
        } else {
            return false;
        }
    }

    public function loginUsuario($data){
        $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE (username = ? OR email = ?) AND deleted = 0");
        $query->bind_param("ss", $data['user'], $data['user']);
        $query->execute();

        $result = $query->get_result();
        $user = $result->fetch_assoc(); // Datos del usuario

        $query->close();

        // Verifica si el usuario existe y si la contraseña ingresada coincide con el hash en la base de datos
        if($user && password_verify($data['password'], $user['password'])){
            return $user;
        } else {
            return false;
        }
    }

    public function editUsuario($data){
        $query = $this->getCon()->prepare("UPDATE usuarios SET username = ?, email = ? WHERE id = ?");
        $query->bind_param("ssi", $data['username'], $data['email'], $data['id']);

        $comp = ($query->execute()) ? true : false;
        
        $query->close();

        return $comp;
    }

    public function editUsuarioEntero($data){
        $query = $this->getCon()->prepare("UPDATE usuarios SET username = ?, email = ?, `admin` = ?, deleted = ? WHERE id = ?");
        $query->bind_param("ssiii", $data['username'], $data['email'], $data['admin'], $data["borrado"], $data['userId']);

        $comp = ($query->execute()) ? true : false;
        
        $query->close();

        return $comp;
    }

    public function editPassword($data){
        $encPass = password_hash($data['password'], PASSWORD_DEFAULT);

        $query = $this->getCon()->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
        $query->bind_param("si", $encPass, $data['id']);
        $query->execute();
        $query->close();

        return true;
    }

    public function eliminarUsuario($id){
        $query = $this->getCon()->prepare("DELETE FROM `usuarios` WHERE id = ?;");
        $query->bind_param("i", $id);
        $comp = $query->execute() ? true : false;
        $query->close();

        return $comp;
    }
}
?>