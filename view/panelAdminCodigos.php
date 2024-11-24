<?php
session_start();
if ($_SESSION['admin'] != "1") {
     // Enviar un mensaje de permiso denegado con un código 403
     header("HTTP/1.1 403 Forbidden");
     echo json_encode(['error' => 'Acceso denegado']);
     exit();
}

ob_start(); // Iniciar el almacenamiento en búfer de salida
include(__DIR__ . '/../controller/codigos.php');
$response = ob_get_clean(); // Capturar la salida

$codigos = json_decode($response, true);
?>

<div class="w-100 d-flex justify-content-between gap-1">
  <div class="buscador input-group my-1 d-flex flex-nowrap">
      <select id="selector" class="border rounded-start-1 p-1">
          <option value="1" selected>Código</option>
          <option value="2">Descuento</option>
      </select>
    <input id="buscador" type="text" class="border rounded-end-1 p-1 flex-grow-1" placeholder="Buscar...">
</div>
<button id="agregar" class="btn btn-success bi bi-upc-scan" data-bs-toggle="modal" data-bs-target="#modalAgregarCodigo"> Añadir código</button>
<button id="agregarScroll"  class="btn btn-success bi bi-upc-scan fs-3" data-bs-toggle="modal" data-bs-target="#modalAgregarCodigo"></button>
</div>

<table class="table mt-1 mb-5 pb-5">
  <thead class="position-sticky top-0">
    <tr>
      <th scope="col">Código</th>
      <th scope="col">Descuento</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="cuerpoTabla" class="cuerpoTabla">
  <?php
    foreach ($codigos as $codigo) {?>
        <tr id="<?= $codigo["codigo"] ?>">
          <td class="editable text"><?= $codigo["codigo"] ?></td>
          <td class="editable number"><?= $codigo["porcentaje"] ?></td>
          <td>
                <!-- Default dropstart button -->
            <div class="btn-group dropstart m-a">
                <button id="opciones" class="rounded-pill bg-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu p-0 shadow">
                    <li><button id="btn<?= $codigo["codigo"] ?>" class="btnMenu dropdown-item bi bi-pencil-fill rounded-top-2 bg-light" onclick="editarFila(this)" href="#"> Editar</button></li>
                    <li><button class="btnMenu btnCancelar dropdown-item bi bi-x-circle-fill rounded-0 bg-light d-none" onclick="clickDerechoAccionCancelar()"> Cancelar</button></li>
                    <li class="mt-1"><button id="dElimiar" class="btnMenu dropdown-item bi bi-trash-fill bg-danger text-light rounded-bottom-2" onclick="eliminarConfirm(this)" href="#"> Eliminar</button></li>
                </ul>
            </div>
          </td>
        </tr>
      <?php } ?>
  </tbody>
</table>

<div class="modal fade" id="modalAgregarCodigo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-transparent border-0">
      <div class="modal-body">
        <label class="modal-title fs-3 fw-bold m-0 bg-light p-1 px-3 rounded-top-2">Nuevo Código</label>

        <div class="bg-light p-4 pt-1 rounded-2 rounded-top-0 rounded-end-2">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Código:</label>
            <input type="text" class="form-control" id="nuevoCodigo">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Descuento:</label>
            <input type="number" class="form-control" id="nuevoDescuento">
          </div>
          <div class="d-flex gap-1">
            <button id="cerrarModal" type="button" class="btn btn-danger ms-auto" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="nuevoCodigo()">Añadir</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>