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

ob_start(); // Iniciar el almacenamiento en búfer de salida
include(__DIR__ . '/../controller/secciones.php');
$response = ob_get_clean(); // Capturar la salida

$categorias = json_decode($response, true);

?>

<div class="w-100 d-flex justify-content-between">
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
  
  <button id="agregar" class="btn btn-success bi bi-database-fill-add" data-bs-toggle="modal" data-bs-target="#modalAgregarProducto"> Añadir producto</button>
  <button id="agregarScroll"  class="btn btn-success bi bi-database-fill-add fs-3" data-bs-toggle="modal" data-bs-target="#modalAgregarProducto"></button>
</div>

<table class="table mb-5 pb-5">
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
      <th scope="col"></th>
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

<!-- Modal -->
<div class="modal fade" id="modalAgregarProducto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-transparent border-0">
      <div class="modal-body">
        <label class="modal-title fs-3 fw-bold m-0 bg-light p-1 px-3 rounded-top-2">Nuevo Producto</label>

        <div class="bg-light p-4 pt-1 rounded-2 rounded-top-0 rounded-end-2">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="nuevoNombre">
          </div>
          <div class="mb-3">
            <label for="nuevoDescripcion" class="form-label">Descripción:</label>
            <textarea class="form-control" id="nuevoDescripcion" rows="2"></textarea>
          </div>
  
          <label for="nuevoSeccion">Seccion:</label>
          <select id="nuevoSeccion" class="form-select mb-3" aria-label="Large select example">
            <option value="" selected>Seccion...</option>
            <?php foreach ($secciones as $seccion) {?>
            <option value="<?= $seccion["id"] ?>"><?= $seccion["nombre"] ?></option>
            <?php }?>
          </select>
  
          <div class="d-flex mb-3 justify-content-between gap-1">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Precio:</label>
            <input type="number" min="0" class="form-control text-end" id="nuevoPrecio">
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Stock:</label>
            <input type="number" min="0" class="form-control" id="nuevoStock">
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Descuento:</label>
            <input type="number" min="0" max="100" class="form-control" id="nuevoDescuento">
          </div>
          </div>

          <div class="mb-4">
            <label for="imagen" class="form-label">Imagen:</label>
            <input type="file" class="form-control" accept="image/*" id="imagen">
          </div>
  
          <div class="d-flex">
            <div class="form-check form-switch me-auto">
              <label class="form-check-label" for="nuevoBorrado">Borrado</label>
              <input class="form-check-input" type="checkbox" role="switch" id="nuevoBorrado">
            </div>
            <button id="cerrarModal" type="button" class="btn btn-danger me-2" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="nuevoProducto()">Añadir</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>