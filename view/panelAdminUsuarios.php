<?php
session_start();
if (!isset($_SESSION['admin']) || $_SESSION['admin'] != "1") {
     // Enviar un mensaje de permiso denegado con un código 403
     header("HTTP/1.1 403 Forbidden");
     echo json_encode(['error' => 'Acceso denegado']);
     exit();
}

ob_start(); // Iniciar el almacenamiento en búfer de salida
include(__DIR__ . '/../controller/usuarios.php');
$response = ob_get_clean(); // Capturar la salida

$usuarios = json_decode($response, true);
?>

<div class="w-100 d-flex justify-content-between gap-1">
    <div class="buscador input-group my-1 d-flex flex-nowrap">
      <select id="selector" class="border rounded-start-1 p-1">
          <option value="2" selected>Usuario</option>
          <option value="1">ID</option>
          <option value="3">Email</option>
          <option value="4">Admin</option>
          <option value="5">Borrado</option>
      </select>
        <input id="buscador" type="text" class="border rounded-end-1 p-1 flex-grow-1" placeholder="Buscar...">
    </div>
    <button id="agregar" class="btn btn-success bi bi-person-plus-fill" data-bs-toggle="modal" data-bs-target="#modalAgregarUsuario"> Añadir usuario</button>
    <button id="agregarScroll"  class="btn btn-success bi bi-person-plus-fill fs-3" data-bs-toggle="modal" data-bs-target="#modalAgregarUsuario"></button>
</div>



<div class="accordion mt-2 mb-5 pb-5">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button accordion-button-admin fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        ADMINISTRADORES
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <!-- Tabla para administradores -->
        <table class="table">
            <thead class="position-sticky top-0">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Usuario</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col">Borrado</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="cuerpoTablaAdmins" class="cuerpoTabla">
                <?php foreach ($usuarios as $usuario) { 
                if ($usuario["admin"]) { // Solo usuarios admin
                ?>
                    <tr id="<?= $usuario["id"] ?>">
                    <td scope="row" class="fw-bold"><?= $usuario["id"] ?></td>
                    <td class="editable text"><?= $usuario["username"] ?></td>
                    <td class="editable text"><?= $usuario["email"] ?></td>
                    <td class="editable boolean fw-bold <?= $usuario["admin"] ? "text-success" : "text-danger" ?>"><?= $usuario["admin"] ? "Si" : "No" ?></td>
                    <td class="editable boolean fw-bold <?= $usuario["deleted"] ? "text-danger" : "text-success" ?>"><?= $usuario["deleted"] ? "Si" : "No" ?></td>
                    <td>
                        <div class="btn-group dropstart m-a">
                            <button id="opciones" class="rounded-pill bg-light" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu p-0 shadow">
                            <li><button class="btnMenu dropdown-item bi bi-upc-scan rounded-top-2 bg-light" onclick="" data-bs-toggle="modal" data-bs-target="#"> Codigos de descuento</button></li>
                                <li><button id="btn<?= $usuario["id"] ?>" class="btnMenu dropdown-item bi bi-pencil-fill rounded-0 bg-light" onclick="editarFila(this)" href="#"> Editar</button></li>
                                <li><button class="btnMenu btnCancelar dropdown-item bi bi-x-circle-fill rounded-0 bg-light d-none" onclick="clickDerechoAccionCancelar()"> Cancelar</button></li>
                                <li><button class="btnMenu dropdown-item bi bi-key-fill rounded-0 bg-light" onclick="cambiarContrasena(this)">  Cambiar contraseña</button></li>
                                <li class="mt-1"><button id="dElimiar" class="btnMenu dropdown-item bi bi-trash-fill bg-danger text-light rounded-bottom-2" onclick="eliminarProductoConfirm(<?= $producto['id'] ?>, '<?= $producto['nombre'] ?>')" href="#"> Eliminar</button></li>
                            </ul>
                        </div>
                    </td>
                    </tr>
                <?php } } ?>
            </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button accordion-button-user fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
        USUARIOS
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <!-- Tabla para usuarios no administradores -->
        <table class="table">
            <thead class="position-sticky top-0">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Usuario</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col">Borrado</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="cuerpoTablaNoAdmins" class="cuerpoTabla">
                <?php foreach ($usuarios as $usuario) { 
                if (!$usuario["admin"]) { // Solo usuarios no admin
                ?>
                    <tr id="<?= $usuario["id"] ?>">
                    <td scope="row" class="fw-bold"><?= $usuario["id"] ?></td>
                    <td class="editable text"><?= $usuario["username"] ?></td>
                    <td class="editable text"><?= $usuario["email"] ?></td>
                    <td class="editable boolean fw-bold <?= $usuario["admin"] ? "text-success" : "text-danger" ?>"><?= $usuario["admin"] ? "Si" : "No" ?></td>
                    <td class="editable boolean fw-bold <?= $usuario["deleted"] ? "text-danger" : "text-success" ?>"><?= $usuario["deleted"] ? "Si" : "No" ?></td>
                    <td>
                        <div class="btn-group dropstart m-a">
                            <button id="opciones" class="rounded-pill bg-light" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu p-0 shadow">
                                <li><button class="btnMenu dropdown-item bi bi-upc-scan rounded-top-2 bg-light" onclick="" data-bs-toggle="modal" data-bs-target="#"> Codigos de descuento</button></li>
                                <li><button id="btn<?= $usuario["id"] ?>" class="btnMenu dropdown-item bi bi-pencil-fill rounded-0 bg-light" onclick="editarFila(this)" href="#"> Editar</button></li>
                                <li><button class="btnMenu btnCancelar dropdown-item bi bi-x-circle-fill rounded-0 bg-light d-none" onclick="clickDerechoAccionCancelar()"> Cancelar</button></li>
                                <li><button class="btnMenu dropdown-item bi bi-key-fill rounded-0 bg-light" onclick="cambiarContrasena(this)">  Cambiar contraseña</button></li>
                                <li class="mt-1"><button id="dElimiar" class="btnMenu dropdown-item bi bi-trash-fill bg-danger text-light rounded-bottom-2" onclick="eliminarProductoConfirm(<?= $producto['id'] ?>, '<?= $producto['nombre'] ?>')" href="#"> Eliminar</button></li>
                            </ul>
                        </div>
                    </td>
                    </tr>
                <?php } } ?>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>






<!-- Modal -->
<div class="modal fade" id="modalAgregarUsuario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-transparent border-0">
      <div class="modal-body">
        <label class="modal-title fs-3 fw-bold m-0 bg-light p-1 px-3 rounded-top-2">Nuevo Usuario</label>

        <div class="bg-light p-4 pt-1 rounded-2 rounded-top-0 rounded-end-2">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Username:</label>
            <input type="text" class="form-control" id="nuevoUsername">
          </div>
          <div class="mb-3">
            <label for="nuevoDescripcion" class="form-label">Email:</label>
            <input type="text" class="form-control" id="nuevoEmail">
          </div>
          <div class="mb-3">
            <label for="nuevoDescripcion" class="form-label">Contraseña:</label>
            <input type="password" class="form-control" id="nuevoContrasena">
          </div>
          <div class="d-flex">
              <div class="form-check form-switch d-flex justify-content-between p-0 me-auto">
                  <div class="form-check form-switch">
                    <label class="form-check-label" for="nuevoBorrado">Admin</label>
                    <input class="form-check-input" type="checkbox" role="switch" id="nuevoAdmin">
                  </div>
                  <div class="form-check form-switch ms-3">
                    <label class="form-check-label" for="nuevoBorrado">Borrado</label>
                    <input class="form-check-input" type="checkbox" role="switch" id="nuevoBorrado">
                  </div>
            </div>
            <button id="cerrarModal" type="button" class="btn btn-danger me-2" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="nuevoUsuario()">Añadir</button>
          </div>
  
        </div>

      </div>
    </div>
  </div>
</div>