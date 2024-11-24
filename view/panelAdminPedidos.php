<?php
session_start();
if ($_SESSION['admin'] != "1") {
     // Enviar un mensaje de permiso denegado con un código 403
     header("HTTP/1.1 403 Forbidden");
     echo json_encode(['error' => 'Acceso denegado']);
     exit();
}

ob_start(); // Iniciar el almacenamiento en búfer de salida
include(__DIR__ . '/../controller/todosPedidos.php');
$response = ob_get_clean(); // Capturar la salida

$pedidos = json_decode($response, true);
?>
<div>
     <div class="w-100 d-flex justify-content-between gap-1">
     <div class="buscador input-group my-1 d-flex flex-nowrap">
           <select id="selector" class="border rounded-start-1 p-1">
               <option value="1" selected>ID</option>
               <option value="2">Dirección</option>
               <option value="3">F. Compra</option>
               <option value="4">F. Entrega</option>
               <option value="5">Usuario</option>
               <option value="6">Descuento</option>¡
           </select>
         <input id="buscador" type="text" class="border rounded-end-1 p-1 flex-grow-1" placeholder="Buscar...">
     </div>
</div>


<table class="table mt-1 mb-5 pb-5">
  <thead class="position-sticky top-0">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Dirección</th>
      <th scope="col">F. Compra</th>
      <th scope="col">F. Entrega</th>
      <th scope="col">Usuario</th>
      <th scope="col">Descuento</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="cuerpoTabla" class="cuerpoTabla">
  <?php
    // Obtener la fecha actual
    $fechaHoy = date('Y-m-d');

        // Verificar si la fecha de entrega es hoy
        foreach ($pedidos as $pedido) {

          $claseEntrega = ($pedido["fechaEntrega"] === $fechaHoy) ? "text-success fw-bold" : "text-danger fw-bold";?>
        <tr id="<?= $pedido["id"] ?>" onclick="mostrarDetalles(this)" style="cursor: pointer;">
          <td scope="row" class="fw-bold"><?= $pedido["id"] ?></td>
          <td ><?= $pedido["direccion"] ?></td>
          <td ><?= $pedido["fecha"] ?></td>
          <td class="<?= $claseEntrega ?>"><?= $pedido["fechaEntrega"] ?></td>
          <td ><?= $pedido["idUsuario"] ?></td>
          <td ><?= $pedido["descuento"] ?></td>
          <td>
                <!-- Default dropstart button -->
            <div class="btn-group dropstart m-a">
                <button id="opciones" class="rounded-pill bg-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu p-0 shadow">
                    <li><button class="btnMenu dropdown-item bi-send-check-fill rounded-2 bg-light" onclick="entregado(this)" href="#"> Entregado</button></li>
                </ul>
            </div>
          </td>
        </tr>
      <?php } ?>
  </tbody>
</table>