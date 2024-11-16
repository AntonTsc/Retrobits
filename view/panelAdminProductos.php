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

$stockBajo=0;
foreach ($productos as $producto) {
  $producto["stock"] <=25 ? $stockBajo++ : null;
}
?>

<div class="w-100 d-flex justify-content-between gap-1">
  <div class="buscador input-group my-1 d-flex flex-nowrap">
      <select id="selector" class="border rounded-start-1 p-1">
          <option value="2" selected>Nombre</option>
          <option value="1">ID</option>
          <option value="3">Descripción</option>
          <option value="4">Sección</option>
          <option value="5">Precio</option>
          <option value="6">Stock</option>
          <option value="7">Descuento</option>
          <option value="8">Borrado</option>
      </select>
    <input id="buscador" type="text" class="border rounded-end-1 p-1 flex-grow-1" placeholder="Buscar...">
</div>
<button id="agregar" class="btn btn-success bi bi-database-fill-add" data-bs-toggle="modal" data-bs-target="#modalAgregarProducto"> Añadir producto</button>
<button id="agregarScroll"  class="btn btn-success bi bi-database-fill-add fs-3" data-bs-toggle="modal" data-bs-target="#modalAgregarProducto"></button>
</div>
<?= $stockBajo > 0 ? "<button id='btnVerStockBajo' class='btn btn-warning text-dark p-0 px-2 rounded-pill' onclick='comprobarStock(this)'>$stockBajo " . ($stockBajo > 1 ? "productos" : "producto") . " con stock limitado <i class='bi bi-caret-up-fill'></i></button>" : "" ?>


<table class="table mt-1 mb-5 pb-5">
  <thead class="position-sticky top-0">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>
      <th scope="col">Sección</th>
      <th scope="col" class="text-end">Precio</th>
      <th scope="col" class="text-end">Stock</th>
      <th scope="col" class="text-end">Descuento</th>
      <th scope="col">Borrado</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="cuerpoTabla">
      <?php foreach ($productos as $producto) {?>
        <tr id="<?= $producto["id"] ?>" class="<?= $producto["stock"] <=25 ? "bg-warning-subtle": null ?>">
          <td scope="row" class="fw-bold"><?= $producto["id"] ?></td>
          <td class="editable text"><?= $producto["nombre"] ?></td>
          <td class="editable text"><?= $producto["descripcion"] ?></td>
          <td class="editable select">
            <?php foreach ($categorias as $categoria) {
              if ($categoria["id"] == $producto["idSeccion"]) echo $categoria["nombre"] ;
            } ?>
          </td>
          <td class="editable number text-end"><?= $producto["precio"] ?></td>
          <td class="editable number text-end"><?= $producto["stock"] ?></td>
          <td class="editable number text-end"><?= $producto["descuento"] ?></td>
          <td class="editable boolean fw-bold text-center <?= $producto["deleted"] ? "text-danger" : "text-success" ?>"><?= $producto["deleted"] ? "Si" : "No" ?></td>
          <td>
                <!-- Default dropstart button -->
            <div class="btn-group dropstart m-a">
                <button id="opciones" class="rounded-pill bg-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu p-0 shadow">
                    <li><button class="btnMenu dropdown-item bi bi-image rounded-top-2 bg-light" onclick="verFotoProducto(this)" data-bs-toggle="modal" data-bs-target="#modalVerFotoProducto"> Ver imagen</button></li>
                    <li><button id="btn<?= $producto["id"] ?>" class="btnMenu dropdown-item bi bi-pencil-fill rounded-0 bg-light" onclick="editarFila(this)" href="#"> Editar</button></li>
                    <li><button class="btnMenu btnCancelar dropdown-item bi bi-x-circle rounded-0 bg-light d-none" onclick="clickDerechoAccionCancelar()"> Cancelar</button></li>
                    <li class="mt-1"><button id="dElimiar" class="btnMenu dropdown-item bi bi-trash-fill bg-danger text-light rounded-bottom-2" onclick="eliminarProductoConfirm(<?= $producto['id'] ?>, '<?= $producto['nombre'] ?>')" href="#"> Eliminar</button></li>
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
  
          <div id="inputsNumberAdd" class="d-flex mb-3 justify-content-between gap-1">
            <div  id="precioAddContainer">
              <label for="exampleFormControlInput1" class="form-label">Precio:</label>
              <input type="number" min="0" class="form-control text-end" id="nuevoPrecio">
            </div>
            <div>
              <label for="exampleFormControlInput1" class="form-label">Stock:</label>
              <input type="number" min="0" class="form-control" id="nuevoStock">
            </div>
            <div id="descuentoAddContainer">
              <label for="exampleFormControlInput1" class="form-label">Descuento:</label>
              <input type="number" min="0" max="100" class="form-control" id="nuevoDescuento">
            </div>
          </div>

          <div id="imagenAddContainer" class="mb-4">
            <label for="imagen" class="form-label">Imagen:</label>
            <input type="file" class="form-control" accept="image/*" id="imagen">
            <img class="d-none" id="imagenPreview" src="#" alt="Imagen para recortar" style="max-width: 100%;">
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

<div class="modal fade" id="modalVerFotoProducto" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-transparent border-0">
      <div class="modal-body">
        <label id="modalFotoNombre" class="modal-title fs-3 fw-bold m-0 bg-light p-1 px-3 rounded-top-2">Producto</label>
        <div class="bg-light p-4 pt-1 rounded-2 rounded-top-0 rounded-end-2">
          <img id="modalFoto" class="w-100 mt-4 rounded-2" src="" alt="">
          <label id="modalNoFoto" class="text-center w-100 fs-3 mb-3"></label>
          <div class="d-flex">
            <div class="ms-auto">
              <button id="cerrarModal" type="button" class="btn btn-danger me-2" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>