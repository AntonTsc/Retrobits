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
                $query->bind_param("sss", $data['username'], $data['email'], $data['password']);
                $query->execute();
                $query->close();

                return true;
            } else {
                return false;
            }
        }
    }
?>