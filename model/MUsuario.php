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

        public function insertUsuario($data){
            if(!($this->getUsuario($data['username'], $data['email']))){
                $query = $this->getCon()->prepare("INSERT INTO usuarios (`username`, `email`, `password`, `admin`, `deleted`) VALUES (?, ?, ?, 0, 0);");
                
                // Contraseña encriptada    
                $encPass = password_hash($data['password'], PASSWORD_DEFAULT);
                $query->bind_param("sss", $data['username'], $data['email'], $encPass);
                $query->execute();
                $query->close();

                return true;
            } else {
                return false;
            }
        }

        public function loginUsuario($data){
            $query = $this->getCon()->prepare("SELECT * FROM usuarios WHERE username = ? OR email = ?");
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
    }
?>