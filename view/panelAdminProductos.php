<?php
session_start();
if ($_SESSION['admin'] != "1") {
    header("Location: ../");
    exit();
}

ob_start(); // Iniciar el almacenamiento en búfer de salida
include(__DIR__ . '/../controller/productos.php');
$response = ob_get_clean(); // Capturar la salida

$productos = json_decode($response, true);
?>


<div class="buscador input-group my-1 d-flex flex-nowrap">
    <select id="selector" class="border rounded-start-1 p-1">
        <option value="nombre" selected>Nombre</option>
        <option value="id">ID</option>
        <option value="descripcion">Descripción</option>
        <option value="precio">Precio</option>
        <option value="stock">Stock</option>
        <option value="descuento">Descuento</option>
        <option value="idSeccion">ID Sección</option>
        <option value="deleted">Borrado</option>
    </select>
  <input id="buscador" type="text" class="border rounded-end-1 p-1 flex-grow-1" placeholder="Buscar...">
</div>

<table class="table">
  <thead class="position-sticky top-0">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>
      <th scope="col">Precio</th>
      <th scope="col">Stock</th>
      <th scope="col">Descuento</th>
      <th scope="col">ID&nbsp;Sección</th>
      <th scope="col">Borrado</th>
      <th scope="col">&nbsp;</th>
    </tr>
  </thead>
  <tbody id="cuerpoTabla">
      <?php foreach ($productos as $producto) {?>
        <tr id="<?= $producto["id"] ?>">
          <td scope="row"><?= $producto["id"] ?></td>
          <td class="editable"><?= $producto["nombre"] ?></td>
          <td class="editable"><?= $producto["descripcion"] ?></td>
          <td class="editable"><?= $producto["precio"] ?></td>
          <td class="editable"><?= $producto["stock"] ?></td>
          <td class="editable"><?= $producto["descuento"] ?></td>
          <td class="editable"><?= $producto["idSeccion"] ?></td>
          <td class="editable"><?= $producto["deleted"] ?></td>
          <td>
                <!-- Default dropstart button -->
            <div class="btn-group dropstart">
                <button id="opciones" class="rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu p-0">
                    <li><button id="btn<?= $producto["id"] ?>" class="dropdown-item bi bi-pencil-fill rounded-top-2" onclick="editarFila(this)" href="#"> Editar</button></li>
                    <li><button class="dropdown-item bi bi-trash-fill bg-danger text-light rounded-bottom-2" onclick="eliminarProductoConfirm(<?= $producto['id'] ?>, '<?= $producto['nombre'] ?>')" href="#"> Eliminar</button></li>
                </ul>
            </div>
          </td>
        </tr>
      <?php } ?>
  </tbody>
</table>
