<?php
class VLogin
{
    public static function inithtml()
    { ?>
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Retrobits - Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="stylesheet" href="../view/resources/css/nav.css">
            <meta http-equiv="content-language" content="es">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
        </head>

        <body>
        <?php
    }

    public static function formRegistro()
    { ?>
        <div class="logo text-center mt-4">
            <img src="../view/resources/images/img/LOGO_BARRA2.png"> 
        </div>
        <div class="container col-12 col-md-7 col-xl-5 align-self-center">
            <div class="titulo mt-4">
                <h1 class="display-1 fw-bold">REGISTRO</h1>
            </div>
            <form action="login.php" method="post" class="mt-4 ">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control form-control-lg" id="floatingInput" placeholder="Usuario">
                    <label for="floatingInput">Usuario</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="Correo electronico">
                    <label for="floatingInput">Correo electronico</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" class="btn btn-primary">Registrarse</button>
            </form>
        </div>
    <?php
    }

    public static function endhtml()
    { ?>
        </body>

        </html>
<?php
    }
}
