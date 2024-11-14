<?php
require_once("../model/MProductos.php");

$mProductos = new MProductos();
$datos = [];



// Llamar al método de inserción en la base de datos
if ($mProductos->insertProducto($_POST)) {

    $datos = [
        'status' => 'OK',
        'message' => 'Producto creado.'
    ];

    $nombreImagen = $mProductos->getLastProductoID();

    // Ruta donde se almacenarán las imágenes subidas
    $directorioSubida = __dir__ . "/../view/resources/images/productos/";

    // Verificar si el archivo de imagen fue enviado y no hay errores
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {

        // Obtener la extensión de la imagen
        $extensionImagen = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);

        // Crear un nombre único para la imagen basado en el nombre del producto y la extensión del archivo
        $nombreImagen = $nombreImagen . '.' . $extensionImagen;

        // Ruta completa donde se almacenará la imagen renombrada
        $rutaImagen = $directorioSubida . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
            // Si falla la subida del archivo al servidor, envía un error
            $datos = [
                'status' => 'ERROR-I',
                'message' => 'No se ha podido mover la imagen al servidor.'
            ];
            header("Content-Type: application/json");
            echo json_encode($datos);
            exit();
        }

    } else {
        // Si no se obtuvo ninguna imagen o hubo un error en la subida del archivo
        $datos = [
            'status' => 'ERROR-I',
            'message' => 'No se recibió ninguna imagen o hubo un error en la subida del archivo.'
        ];
        header("Content-Type: application/json");
        echo json_encode($datos);
        exit();
    }

} else {
    $datos = [
        'status' => 'ERROR',
        'message' => 'No se ha podido crear el producto.'
    ];
}

header("Content-Type: application/json");
echo json_encode($datos);
exit();
?>
