//* GLOBALES =========================================================
let ultimoContenido = "";//Guarda el contenido que hemos mostrado en pantalla
let nuevoContenido = "";//Guarda el contenido de la ultima solicitud
let tabulacion = "";
let intervaloProductos = null;
let intervaloUsuarios = null;
let intervaloPedidos = null;
let elementoClickDerecho;
let cropper;
let valoresOriginales = {};
let alternarStock = false;
let modoAuto = true;


//* FUNCIONES =========================================================
//Se encarga de cargar el contenido por completo reiniciando los comparadores
function cargarContenidoNuevo(tab, desactualizado = false) {
    document.getElementById("mdImagen").classList.add("d-none");
    document.getElementById("mdContrasena").classList.add("d-none");
    document.getElementById("mdEditar").classList.remove("d-none");
    document.getElementById("mdEditar").classList.replace("rounded-0", "rounded-bottom-0");
    document.getElementById("mdEntregado").classList.add("d-none");
    document.getElementById("mdEliminar").classList.remove("d-none");
    

    vaciarIntervalos();
    //Vacia el contenido que deveriamos ver para poder cargar nuevo contenido
    ultimoContenido = "";
    alternarStock = false;

    cargarContenido(tab);
    if (desactualizado) {
        Swal.fire({
            position: "top",
            title: "Cambios cargados",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
    }
}
//Se encarga de obtener por ajax el contenido que mostraremos en la pagina
function cargarContenido(tab) {
    tabulacion = tab;
    const xhr = new XMLHttpRequest(); // Crear una solicitud AJAX
    
    //POST = método
    //panelAdmin${tab}.php = lo que solicito
    //true = usar un proceso asincrono para la solicitud
    xhr.open("POST", `panelAdmin${tab}.php`, true);//configura una solicitud
    // Cuando la solicitud se complete, la función onload se ejecutará
    xhr.onload = () => {
        if (xhr.status === 200) {//si la conexion ha sido correcta/OK
            nuevoContenido = xhr.responseText
            analizarContenido(tab);
        } else if (xhr.status === 404) {//si la conexion ha sido erronea o no encontrada
            alert("404 Página no encontrada")
        } else if (xhr.status === 403) {// Si el permiso fue denegado
            //Esto se activara cuando se detecte que el usuario administrador a cerrado sesion en otra pestaña mientras el panel de administracion estaba abierto
            vaciarIntervalos();
            Swal.fire({
                grow: "fullscreen",
                icon: "error",
                title: "ACCESO DENEGADO",
                html: "No tienes permisos para ver esta página.<br>Serás redirigido automaticamente en:<br><br><b>15</b>.",
                allowOutsideClick: false,
                confirmButtonText: "Salir",
                confirmButtonColor: "#dc3545",
                timer: 15000,
                timerProgressBar: true, // Opcional: agrega una barra de progreso
                didOpen: () => {
                    const timerElement = Swal.getHtmlContainer().querySelector("b");
                    setInterval(() => {
                        if (timerElement) {
                            timerElement.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}s`;
                        }
                    }, 1000);
                },
                willClose: () => {
                    window.location.href = "../";
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../";
                }
            });
        }
    };

    xhr.onerror = () => {
        alert("Error en la solicitud. No se pudo conectar con el servidor.");
    };
    xhr.send(); //Manda la solicitud
}

//Analiza el contenido obtenido desde Request
function analizarContenido(tab) {
    if (ultimoContenido === "") {
        document.getElementById("contenido").innerHTML = nuevoContenido;
        ultimoContenido = nuevoContenido;
        document.querySelector(".desactualizado").innerHTML = "";
        actualizarClasesTab(tab);
        configurarBotonAgregar();
        gestionarIntervalos(tab);
        setClickDerecho(tab);

    } else if (nuevoContenido !== ultimoContenido) {
        vaciarIntervalos();
        notificarCambio(tab);
    }
}

//Le da el diseño a la pestaña activa
function actualizarClasesTab(tab) {
    document.querySelectorAll(".nav-link").forEach(pestana => {
        pestana.classList.remove("active", "text-dark");
    });
    document.getElementById(tab).classList.add("active", "text-dark");
}

//Los intervalos solo estaran activos en la pestaña actual y se ocupan de comprobar si hay cambios en la base de datos comparado con los datos mostrados.
//Se desactivan si recibimos cambios y no actualizamos los datos.
function gestionarIntervalos(tab) {
    switch (tab) {
        case "Productos":
            funcionesProductos();
            if (!intervaloProductos) intervaloProductos = setInterval(() => cargarContenido("Productos"), 5000)
            break;
        case "Usuarios":
            funcionesUsuarios();
            if (!intervaloUsuarios) intervaloUsuarios = setInterval(() => cargarContenido("Usuarios"), 5000);
            break;
        case "Pedidos":
            funcionesPedidos();
            if (!intervaloPedidos) intervaloPedidos = setInterval(() => cargarContenido("Pedidos"), 5000);
            break;
        case "Codigos":
            funcionesCodigos();
            if (!intervaloPedidos) intervaloPedidos = setInterval(() => cargarContenido("Codigos"), 5000);
            break;
        default:
            console.warn("Pestaña desconocida:", tab);
    }
    vaciarIntervalos(tab);
}

//Desactiva todos los intervalos menos el de la pestaña recibida, puede no recibir una pestaña, con lo cual, desactivara todos los intervalos.
function vaciarIntervalos(gestor = "") {
    if (gestor !== "Productos" && intervaloProductos) {
        clearInterval(intervaloProductos);
        intervaloProductos = null;
    }
    if (gestor !== "Usuarios" && intervaloUsuarios) {
        clearInterval(intervaloUsuarios);
        intervaloUsuarios = null;
    }
    if (gestor !== "Pedidos" && intervaloPedidos) {
        clearInterval(intervaloPedidos);
        intervaloPedidos = null;
    }
    if (gestor !== "Codigos" && intervaloPedidos) {
        clearInterval(intervaloPedidos);
        intervaloPedidos = null;
    }
}

function alternarModoAuto(btn){
    modoAuto = !modoAuto;
    if(modoAuto) {
        btn.innerHTML = "Actualizaciones automáticas <img class='giro' src='resources/images/svg/automatico.svg'>";
    } else {
        btn.innerHTML = "Actualizaciones manuales <img src='resources/images/svg/manual.svg'>";
    }
}
//SweetAlert2 es una libreria para mostrar alertas dinamicas
//Muestra un mensaje que nos permitira mantener la pagina actual o refescar los datos por Ajax
function notificarCambio(tab) {
    if (modoAuto){
        cargarContenidoNuevo(tab, false);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
            });
            Toast.fire({
            icon: "success",
            title: `Datos actualizados`
        });
        return;
    } 
    Swal.fire({
        position: "top",
        title: "Se han detectado cambios en la base de datos",
        text: `Se han realizado cambios de '${tab}' de la base de datos, ¿Desea ver los datos actualizados?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cargar nuevos datos",
        cancelButtonText: "Mantener datos actuales",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector("#cerrarModal").click();
            cargarContenidoNuevo(tab, true);
        } else {
            mostrarMensajeDatosDesactualizados(tab);
        }
    });
}

//Muestra un mensaje con las consecuencias de no actualizar los datos, y un recordatorio del estado de la paglina
function mostrarMensajeDatosDesactualizados(tab) {

    const fecha = new Date();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    document.querySelector(".desactualizado").innerHTML = `Los datos de la página están desactualizados desde las ${horas}:${minutos} - <button class="cargarDesactualizado" onclick="cargarContenidoNuevo('${tab}', true)">actualizar</button><br>⚠ Seguridad de detección automática de cierre de sesión inactiva.`;

    Swal.fire({
        position: "top",
        html: "Los cambios que puedas hacer a partir de ahora podrían llegar a reescribir los cambios de los nuevos datos actuales de la base de datos o devolver errores.<br><br><i>(Cualquier acción (editar, eliminar y añadir) después de ejecutarse actualizara la información de la tabla)</i>",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Vale",
        allowOutsideClick: false
    });
}

//Esta funcion hace que si el boton de añadir desaparece de pantalla nos muestra una version pequeña en pantalla
function configurarBotonAgregar() {
    try{
        const botonPrincipal = document.getElementById("agregar");
        const botonScroll = document.getElementById("agregarScroll");
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                botonScroll.style.display = !entry.isIntersecting ? "inline-block" : "none";
            });
        }, { threshold: 0 });
    
        observer.observe(botonPrincipal);
    }catch{/*No hay boton añadir*/}
}

//Devuevle un String, separa las letras con caracter especial y luego elimina el caracter especial
function eliminarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//* MANIPULACIONES DE DOM =============================================
//Muestra un menú en la posición del clic derecho si es en la tabla. Este menú permite editar o guardar una fila dependiendo de su estado ademas de permitir eliminar la misma.
//Está configurado para que el menú no se muestre fuera de la pantalla
function setClickDerecho(tab) {
    const tablas = document.querySelectorAll('.cuerpoTabla');
    const menu = document.getElementById('menuDesplegable');
    const mdEditar = document.getElementById('mdEditar');

    // Mostrar menú en la posición del clic derecho
    tablas.forEach((tabla) =>{
        tabla.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            elementoClickDerecho = event.target;
    
            const filaEditando = document.querySelector('tr.editando');
            const btnCancelar = document.getElementById('mdCancelar');
            if (filaEditando === elementoClickDerecho.closest('tr')) {
                btnCancelar.classList.remove('d-none');  // Muestra el botón
            }else{
                btnCancelar.classList.add('d-none');  // Oculta el botón
            }
    
            //Cambiar opciones según el estado de la fila
            // Esto -> ?. se utiliza para que en caso de no encontrar un elemento tr cercano no falle y devuelva undefined, de esta forma el codigo continua sin interrumpirse
            const enEdicion = elementoClickDerecho.closest('tr').classList.contains('editando');
            mdEditar.innerHTML = enEdicion ? " Guardar" : " Editar";
            mdEditar.classList.toggle('bi-pencil-fill', !enEdicion);
            mdEditar.classList.toggle('bi-floppy-fill', enEdicion);
    
            //Muestra el menu
            menu.style.display = 'block';
    
            //Obtengo el ancho y alto del menu
            const menuWidth = menu.offsetWidth;
            const menuHeight = menu.offsetHeight;
    
            //Obtengo el ancho y alto de la ventana
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
    
            //Obtengo las posiciones del raton cuando hizo el click
            let posicionDesdeIzquierda = event.pageX;//Devuelve los pixeles desde el lateral izquierdo de la pagina hasta el raton
            let posicionDesdeArriba = event.pageY;//Devuelve los pixeles desde el lateral superior de la pagina hasta el raton
            
            //La comparacion se hace con clientX ya que necesito comparar el tamaño de la pantalla y no la de la pagina
            if (event.clientX + menuWidth > windowWidth) {//Si la posicionX del click + el ancho del menu son mas grandes que el ancho de la ventana
    
                //Le doy a la posicionX el valor normal menos el ancho del menu
                posicionDesdeIzquierda = event.pageX - menuWidth;
            }
    
            
            if (event.clientY + menuHeight > windowHeight) {//Si la posicionY del click + la altura del menu son mas grandes que la altura de la ventana
    
                //Le doy a la posicionY el valor normal menos el alto del menu
                posicionDesdeArriba = event.pageY - menuHeight;
            }
    
            //muestro el menu en las posiciones guardadas
            menu.style.left = `${posicionDesdeIzquierda}px`;
            menu.style.top = `${posicionDesdeArriba}px`;
        });
    })

    // Ocultar menú al hacer clic fuera de él o al hacer scroll
    document.addEventListener('click', () => menu.style.display = 'none');
    window.addEventListener('scroll', () => menu.style.display = 'none');
}

function clickDerechoAccionImagen(){
    verFotoProducto(elementoClickDerecho);
}
// Ejecutar acción de edición o guardado según el estado del menú
function clickDerechoAccionEditar() {
    if (document.getElementById('mdEditar').innerText.trim() === "Editar") {
        editarFila(elementoClickDerecho);
    } else {
        guardarEdiciones(elementoClickDerecho);
    }
}

function clickDerechoAccionCancelar(){
    cargarContenidoNuevo(tabulacion);
}

function clickDerechoAccionContrasena(){
    cambiarContrasena(elementoClickDerecho);
}
// Ejecutar acción para eliminar producto
function clickDerechoAccionEntregado() {
    entregado(elementoClickDerecho);
}
// Ejecutar acción para eliminar producto
function clickDerechoAccionEliminar() {
    eliminarConfirm(elementoClickDerecho);
}

// Función genérica para configurar el buscador
function configurarBuscador(buscador, selector, filas, esNumerico = false) {
    buscador.addEventListener("input", () => {
        const filtro = eliminarTildes(buscador.value.toLowerCase());
        const indice = selector.value;

        filas.forEach(fila => {
            const celda = fila.querySelector(`td:nth-child(${indice})`);
            const textoCelda = celda ? eliminarTildes(celda.textContent.toLowerCase()) : "";
            let mostrarFila = false;

            if (esNumerico && ["5", "6", "7"].includes(indice)) {
                const valorCelda = parseFloat(textoCelda);
                const match = filtro.match(/^([<>=])(\d+.?\d{0,2}?)$/);

                if (match) {
                    const operador = match[1];
                    const valorFiltro = parseFloat(match[2]);

                    switch (operador) {
                        case "<":
                            mostrarFila = valorCelda <= valorFiltro;
                            break;
                        case ">":
                            mostrarFila = valorCelda >= valorFiltro;
                            break;
                        case "=":
                            mostrarFila = valorCelda == valorFiltro;
                            break;
                    }
                } else {
                    mostrarFila = textoCelda.includes(filtro);
                }
            } else {
                mostrarFila = textoCelda.includes(filtro);
            }

            fila.style.display = mostrarFila ? "" : "none";
        });
    });
}

// Funciones para cada pestaña
function funcionesProductos() {
    document.getElementById("mdEditar").classList.replace("rounded-bottom-0", "rounded-0");
    document.getElementById("mdImagen").classList.remove("d-none");

    const buscador = document.getElementById("buscador");
    const selector = document.getElementById("selector");
    const filas = document.querySelectorAll("table tbody tr");

    configurarBuscador(buscador, selector, filas, true);

    const btnStock = document.querySelector("#btnVerStockBajo");
    if (btnStock) {
        btnStock.querySelector("i").classList.replace("bi-caret-down-fill", "bi-caret-up-fill");
    }

    configurarCropper();
}

function funcionesUsuarios() {
    document.getElementById("mdContrasena").classList.remove("d-none");

    const buscador = document.getElementById("buscador");
    const selector = document.getElementById("selector");
    const filas = document.querySelectorAll("table tbody tr");

    configurarBuscador(buscador, selector, filas, false);
}

function funcionesPedidos() {
    document.getElementById("mdEditar").classList.add("d-none");
    document.getElementById("mdEliminar").classList.add("d-none");
    document.getElementById("mdEntregado").classList.remove("d-none");

    const buscador = document.getElementById("buscador");
    const selector = document.getElementById("selector");
    const filas = document.querySelectorAll("table tbody tr");

    configurarBuscador(buscador, selector, filas, false);
}

function funcionesCodigos() {
    const buscador = document.getElementById("buscador");
    const selector = document.getElementById("selector");
    const filas = document.querySelectorAll("table tbody tr");

    configurarBuscador(buscador, selector, filas, false);
}

async function mostrarDetalles(fila) {
    if (fila.nextElementSibling?.classList.contains("detalles")) {
      fila.nextElementSibling.remove();
      return;
    }
    idPedido = fila.id;
  
    try {
      const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/productos_pedidos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "id=" + encodeURIComponent(idPedido),
      });
  
      const productosPedidos = await response.json();
  
      const productosDetalles = await Promise.all(
        productosPedidos.map(async (productoPedido) => {
          const productoResponse = await fetch("https://2aw4.zornotzafpcloud.eus/controller/productosDetalles.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "idProducto=" + encodeURIComponent(productoPedido.idProducto),
          });
  
          const producto = await productoResponse.json();
  
          return {
            nombre: producto.nombre,
            precio: producto.precio,
            descuento: producto.descuento,
            cantidad: productoPedido.cantidad,
          };
        })
      );
  
      const detallesFila = document.createElement("tr");
      detallesFila.classList.add("detalles");
  
      const detallesCont = document.createElement("td");
      detallesCont.colSpan = 7;
  
      if (productosDetalles.length > 0) {
        detallesCont.innerHTML = `
          <div>
            <strong>Detalles del pedido ID: ${idPedido}</strong>
            <ul>
              ${productosDetalles
                .map(
                  (producto) => `
                <li>
                  <strong>Producto:</strong> ${producto.nombre} <br>
                  <strong>Precio:</strong> ${producto.precio}€ ud. <br>
                  <strong>Descuento:</strong> ${producto.descuento}% <br>
                  <strong>Cantidad:</strong> ${producto.cantidad} <br><br>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        `;
      } else {
        detallesCont.innerHTML = "<div>No hay detalles para este pedido.</div>";
      }
  
      detallesFila.appendChild(detallesCont);
      fila.insertAdjacentElement("afterend", detallesFila);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

function comprobarStock(btn) {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        const stock = parseInt(fila.querySelector("td:nth-child(6)").innerText, 10);

        // Alternar visibilidad según el estado
        fila.style.display = !alternarStock && stock > 25 ? "none" : "";
        fila.style.display = !alternarStock && stock > 25 ? "none" : "";
    });
    btn.querySelector("i").classList.replace(
        alternarStock ? "bi-caret-down-fill" : "bi-caret-up-fill",
        alternarStock ? "bi-caret-up-fill" : "bi-caret-down-fill"
      );
    alternarStock = !alternarStock;
}

//Cropper.js es una libreria para poder recortar una imagen
//Nos permite cargar una imagen y configurar el funcionamiento de un area que recortara la imagen
function configurarCropper() {
    //evento 'change' para detectar cuando se selecciona un archivo
    document.getElementById('imagen').addEventListener('change', function (e) {
        //imagenPreview es donde se cargara la imagen
        const imagenPreview = document.getElementById('imagenPreview');
        if (e.target.files.length === 0) {//Si no hay archivos seleccionados
            if (cropper) cropper.destroy();//Si esxiste un cropper lo destruyo
            imagenPreview.classList.add("d-none");//Oculto la vista previa de la imagen
            return;
        }
        //en caso de que un archivo este seleccionado:
        imagenPreview.classList.remove("d-none");//Muestro la vista previa
        const file = e.target.files[0];//Guardo la imagen
        //FileReader para leer el contenido del archivo
        const reader = new FileReader();

        //Si el archivo se ha podido leer
        reader.onload = function (event) {
            //Establece la imagen leída como la vista previa para el cropper
            imagenPreview.src = event.target.result;
            if (cropper) cropper.destroy();
            //Crea un nuevo croper con la imagen leida
            cropper = new Cropper(imagenPreview, {
                aspectRatio: 4 / 3, //Siempre se recortara la imagen con esta escala
                viewMode: 1, //Le dice al area que se puede mover libre, pero no se puede salir de la imagen
                dragMode: 'move' //Se puede arrastrar el area
            });
        };
        //Esto es una opcion de FileReader que permite mostrar la imagen sin cargarla desde el servidor
        //se usa para que la imagen seleccionada se pueda ver en el navegador
        reader.readAsDataURL(file);
    });
}

//Obtengo la imagen que ha recortado el cropper
function obtenerImagenRecortada() {
    //La funcion getCropperCanvas es una funcion asincrona de cropper
    //Y quiero que esta funcion devuelva la imagen antes de que el receptor siga con el codigo
    //Por eso utilizo una promesa para que el codigo no siga hasta obtener una respuesta
    return new Promise((resolve, reject) => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                blob ? resolve(blob) : reject('No se pudo generar el blob');
            });
        } else {
            reject('No hay cropper');
        }
    });
}

//Guardo un nuevo producto en la base de datos
async function nuevoProducto() {
    //Obtengo los input
    const nombre = document.getElementById("nuevoNombre");
    const descripcion = document.getElementById("nuevoDescripcion");
    const seccion = document.getElementById("nuevoSeccion");
    const precio = document.getElementById("nuevoPrecio");
    const stock = document.getElementById("nuevoStock");
    const descuento = document.getElementById("nuevoDescuento");
    const borrado = document.getElementById("nuevoBorrado").checked ? 1 : 0;


    //Filtros de los input
    let comp = true;
    [nombre, descripcion, seccion].forEach(input => {
        input.style.borderColor = input.value ? "green" : (comp = false, "red");
    });

    const validarNumero = (input, type, maxValue = null) => {
        const valor = parseFloat(input.value);
        if (isNaN(valor) || valor < 0 || (maxValue !== null && valor > maxValue) ||( /[^\d]/.test(input.value) && type === "integer")) {
            input.style.borderColor = "red";
            comp = false
        } else {
            input.style.borderColor = "green";
        }
    };
    validarNumero(precio, "double");
    validarNumero(stock,  "integer");
    validarNumero(descuento, "integer", 100);

    let imageFile;
    //Llamo a la promesa y espero su respuesta para que el codigo no siga adelante sin la informacion necesaria
    try { imageFile = await obtenerImagenRecortada(); } 
    catch (error) { console.error("Error al obtener la imagen recortada:", error); }

    //Si no hay imagen o los input no cumplen el filtro, cancelo la peticion
    if (!imageFile || !comp) return;

    //Creo un FormData para enviar los datos al controlador, pues tengo que mandar una imagen y en json esto no seria posible
    const formData = new FormData();
    formData.append("nombre", nombre.value);
    formData.append("descripcion", descripcion.value);
    formData.append("idSeccion", seccion.value);
    formData.append("precio", parseFloat(precio.value));
    formData.append("stock", parseFloat(stock.value));
    formData.append("descuento", parseFloat(descuento.value));
    formData.append("deleted", borrado);
    formData.append("imagen", imageFile, 'imagen_recortada.jpg');

    //Hago la llamada al controlador
    try {
        //Como le voy a mandar un formData, no es necesario especificar el tipo de encabezado
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/registrarProducto.php", {
            method: 'POST',
            body: formData
        });
        const datos = await response.json();
        if (datos.status === 'OK') {
            document.querySelector("#cerrarModal").click();
            cargarContenidoNuevo('Productos')
            Swal.fire({
                position: "top",
                title: `${nombre.value} ha sido añadido.`,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({ title: "Error", icon: "error", text: datos.message });
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function nuevoUsuario() {
    //Obtengo los input
    const username = document.getElementById("nuevoUsername");
    const email = document.getElementById("nuevoEmail");
    const password = document.getElementById("nuevoContrasena");
    const admin = document.getElementById("nuevoAdmin").checked ? 1 : 0;
    const borrado = document.getElementById("nuevoBorrado").checked ? 1 : 0;

    let comp = true;

     if(!/^[a-zA-Z0-9_]{4,20}$/.test(username.value)){
        comp = false;
        username.style.borderColor = "red";
     }else username.style.borderColor = "green";

     if(!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/.test(email.value)){
        comp = false;
        email.style.borderColor = "red";
     }else email.style.borderColor = "green";

     if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/.test(password.value)){
        comp = false;
        password.style.borderColor = "red";
     }else password.style.borderColor = "green";

    if(!comp) return;

    //Hago la llamada al controlador
    try {
        //Como le voy a mandar un formData, no es necesario especificar el tipo de encabezado
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/registrarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=' + encodeURIComponent(username.value) + 
                  '&email=' + encodeURIComponent(email.value) + 
                  '&password=' + encodeURIComponent(password.value) +
                  '&admin=' + encodeURIComponent(admin) + 
                  '&deleted=' + encodeURIComponent(borrado)
        });
        const datos = await response.json();
        if (datos.status === 'OK') {
            document.querySelector("#cerrarModal").click();
            cargarContenidoNuevo('Usuarios')
            Swal.fire({
                position: "top",
                title: `${username.value} ha sido añadido.`,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({icon: "error", text: datos.message });
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function nuevoCodigo() {
    //Obtengo los input
    const codigo = document.getElementById("nuevoCodigo");
    const descuento = document.getElementById("nuevoDescuento");

    let comp = true;

     if(codigo.value == ""){
        comp = false;
        codigo.style.borderColor = "red";
     }else codigo.style.borderColor = "green";
     if(descuento.value == "" || descuento.value > 100 || descuento.value < 0){
        comp = false;
        descuento.style.borderColor = "red";
     }else descuento.style.borderColor = "green";

    if(!comp) return;

    //Hago la llamada al controlador
    try {
        //Como le voy a mandar un formData, no es necesario especificar el tipo de encabezado
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/registrarCodigo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'codigo=' + encodeURIComponent(codigo.value) + 
                  '&descuento=' + encodeURIComponent(descuento.value)
        });
        const datos = await response.json();
        if (datos.status === 'OK') {
            document.querySelector("#cerrarModal").click();
            cargarContenidoNuevo('Codigos')
            Swal.fire({
                position: "top",
                title: `${codigo.value} ha sido añadido.`,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({icon: "error", text: datos.message });
        }
    } catch (error) {
        codigo.style.borderColor = "red";
        Swal.fire({
            position: "top",
            title: `${codigo.value} ya existe.`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000
        });
    }
}

async function entregado(btn) {
    const fila = btn.closest('tr'); // Obtiene la fila que contiene el botón
    const hoy = new Date().toISOString().split('T')[0];
    if (fila) {
        // Selecciona la celda de "F. Entrega" (4ª columna, índice 3)
        const celdaFechaEntrega = fila.querySelector('td:nth-child(4)');
        const fechaEntrega = celdaFechaEntrega.textContent.trim();
        console.log(fechaEntrega);
        console.log(hoy);
        // Comparar la fecha de entrega con hoy
        if (fechaEntrega === hoy) {
            Swal.fire({
                position: "top",
                title: `Ese pedido ya fue entregado.`,
                icon: "error",
                showConfirmButton: false,
                timer: 2000
            });
            return;// O cualquier otro valor que quieras devolver
        }
    }
    try{
        //Hago la llamada al controlador para eliminar el producto, con un header de tipo formulario
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/entregarPedido.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + fila.id +
                  '&hoy=' + hoy
        }); 
        const datos = await response.json();
        if (datos.status === 'OK') {
            cargarContenidoNuevo("Pedidos");
            Swal.fire({
                position: "top",
                title: datos.message,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });

        } else {
            console.log(datos.message);
        }
    } catch (error) {
        console.error("Error: ", error);
    }

}

//Una confirmacion para eliminar el producto
function eliminarConfirm(btn){
    const fila = btn.closest('tr');
    const filaEditando = document.querySelector('tr.editando');
    if (filaEditando && filaEditando !== fila) {
        // Si ya hay una fila editando, podemos cancelar la edición de la fila actual
        Swal.fire({
            text: "Actualmente estás editando una fila. Por favor, finaliza la edición antes de proceder con la eliminación.",
            confirmButtonText: "Vale",
            confirmButtonColor: "#0d6efd"
          });
        return; // Salir sin hacer nada si otra fila ya está siendo editada
    }
    Swal.fire({
        position: "top",
        title: "¿Estas seguro?",
        html: `<b>${tabulacion != "Codigos" ? fila.querySelector('td:nth-child(2)').innerText : fila.querySelector('td:nth-child(1)').innerText}</b> se <b class="text-danger">eliminara</b> de forma permanente!`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#0d6efd",
        confirmButtonColor: "#dc3545",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            switch (tabulacion) { 
                case "Productos":
                    eliminarProducto(fila.id);
                    break;
                case "Usuarios":
                    eliminarUsuario(fila.id);
                    break;
                case "Pedidos":
                    break;
                case "Codigos":
                    eliminarCodigo(fila.id);
                    break;
            }
        }
      });
}

//Elimino un producto de la base de datos
async function eliminarProducto(id){
    //Mientras estoy eliminando el producto cancelo las comprobaciones a la base de datos
    //Esto lo hago para que la comprobacion no actue mientra se elimina el producto del DOM
    vaciarIntervalos();
    try{
        //Hago la llamada al controlador para eliminar el producto, con un header de tipo formulario
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/eliminarProducto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id
        }); 
        const datos = await response.json();
        if (datos.status === 'OK') {
            //Le añado una clase con transicion a la fila, y espero a que la transicion acabe para cargar de nuevo los productos
            document.getElementById(id).classList.add('remove');
            document.getElementById(id).addEventListener('transitionend', () => {
                cargarContenidoNuevo("Productos");
            });
            const Toast = Swal.mixin({
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                title: `Producto eliminado de forma definitiva de la base de datos`
              });
        } else {
            console.log("ERROR");
            cargarContenidoNuevo("Productos");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function eliminarUsuario(id){
    vaciarIntervalos();
    try{
        //Hago la llamada al controlador para eliminar el producto, con un header de tipo formulario
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/eliminarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id
        }); 
        const datos = await response.json();
        if (datos.status === 'OK') {
            //Le añado una clase con transicion a la fila, y espero a que la transicion acabe para cargar de nuevo los productos
            document.getElementById(id).classList.add('remove');
            document.getElementById(id).addEventListener('transitionend', () => {
                cargarContenidoNuevo("Usuarios");
            });
            const Toast = Swal.mixin({
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                title: `Usuario eliminado de forma definitiva de la base de datos`
              });
        } else {
            console.log("ERROR");
            cargarContenidoNuevo("Usuarios");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function eliminarCodigo(id){
    vaciarIntervalos();
    try{
        //Hago la llamada al controlador para eliminar el producto, con un header de tipo formulario
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/eliminarCodigo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id
        }); 
        const datos = await response.json();
        if (datos.status === 'OK') {
            //Le añado una clase con transicion a la fila, y espero a que la transicion acabe para cargar de nuevo los productos
            document.getElementById(id).classList.add('remove');
            document.getElementById(id).addEventListener('transitionend', () => {
                cargarContenidoNuevo("Codigos");
            });
            const Toast = Swal.mixin({
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                title: datos.message
              });
        } else {
            console.log("ERROR");
            cargarContenidoNuevo("Codigos");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

function editarFila(btn) {
    const fila = btn.closest('tr');


    // Verificar si ya hay una fila editando
    const filaEditando = document.querySelector('tr.editando');

    // Si ya hay una fila editando y no es la fila actual
    if (filaEditando && filaEditando !== fila) {
        Swal.fire({
            text: "Estás editando una fila. Por favor, completa la edición actual antes de comenzar con otra.",
            confirmButtonText: "Vale",
            confirmButtonColor: "#0d6efd"
        });
        return; // Salir sin hacer nada si otra fila ya está siendo editada
    }

    // Añadir la clase 'editando' para indicar que estamos editando esta fila
    fila.classList.add('editando');

    // Convertir las celdas editables a inputs con su valor actual
    fila.querySelectorAll('.editable').forEach((celda, index) => {
        const valorActual = celda.innerText.trim();
        valoresOriginales[index] = valorActual;  // Guardar valor original de cada celda
        let inputHTML = '';
        
        // Verificar el tipo de dato según la clase de la celda
        if (celda.classList.contains('text')) {
            inputHTML = `<input type="text" class="form-control" style="height: 35px;" value="${valorActual}">`;
        } else if (celda.classList.contains('number')) {
            inputHTML = `<input type="number" class="form-control text-end" style="height: 35px;" value="${valorActual}">`;
        } else if (celda.classList.contains('boolean')) {
            inputHTML = `<div class="form-check form-switch d-flex justify-content-center align-items-center">
                            <input class="form-check-input" type="checkbox" role="switch" style="height: 30px; width: 50px;" ${valorActual === 'Si' ? 'checked' : ''}>
                        </div>`;
        } else if (celda.classList.contains('select')) {
            inputHTML = `<select id="nuevoSeccion" class="form-select" aria-label="Large select example" style="height: 35px;">
                            <option ${valorActual === 'consolas' && 'selected'} value="1">consolas</option>
                            <option ${valorActual === 'computadoras' && 'selected'} value="2">computadoras</option>
                            <option ${valorActual === 'camaras' && 'selected'} value="3">camaras</option>
                            <option ${valorActual === 'radios' && 'selected'} value="4">radios</option>
                            <option ${valorActual === 'telefonos' && 'selected'} value="5">telefonos</option>
                            <option ${valorActual === 'electrodomesticos' && 'selected'} value="6">electrodomesticos</option>
                        </select>`;
        }

        // Reemplazar la celda con el input correspondiente
        celda.innerHTML = inputHTML;
    });

    // Cambiar el texto y la acción del botón editar por guardar
    const btnEditar = fila.querySelector(`#btn${fila.id}`);
    btnEditar.innerHTML = ' Guardar';
    btnEditar.setAttribute('onclick', 'guardarEdiciones(this)');
    btnEditar.classList.replace('bi-pencil-fill', 'bi-floppy-fill');
    const btnCancelar = fila.querySelector('.btnCancelar');
    btnCancelar.classList.remove("d-none")
}

function guardarEdiciones(btn) {
    vaciarIntervalos();
    
    const fila = btn.closest('tr');

    // Comprobar si hubo cambios antes de proceder
    let cambios = false;
    fila.querySelectorAll('.editable').forEach((celda, index) => {
        const input = celda.querySelector('input, select, checkbox');
        let valorActual;

        if (input.type === 'checkbox') {
            valorActual = input.checked ? 'Si' : 'No';
        } else if (input.tagName.toLowerCase() === 'select') {
            valorActual = input.options[input.selectedIndex].text;
        } else {
            valorActual = input.value;
        }

        if (valorActual !== valoresOriginales[index]) {
            cambios = true;
        }
    });

    // Si no hay cambios salgo de la funcion
    if (!cambios) {
        switch (tabulacion) { 
            case "Productos":
                cargarContenidoNuevo("Productos");
                break;
            case "Usuarios":
                cargarContenidoNuevo("Usuarios");
                break;
            case "Pedidos":
                break;
            case "Codigos":
                cargarContenidoNuevo("Codigos");
                break;
        }
        return;
    }else{
        switch (tabulacion) { 
            case "Productos":
                ejecutarEdicionProducto(fila);
                break;
            case "Usuarios":
                ejecutarEdicionUsuario(fila);
                break;
            case "Pedidos":
                break;
            case "Codigos":
                ejecutarEdicionCodigo(fila);
                break;
        }
    }

}

async function ejecutarEdicionProducto(fila){
    const nombre = fila.querySelector('td:nth-child(2)').children[0];
    const descripcion = fila.querySelector('td:nth-child(3)').children[0];
    const seccion = fila.querySelector('td:nth-child(4)').children[0];
    const precio = fila.querySelector('td:nth-child(5)').children[0];
    const stock = fila.querySelector('td:nth-child(6)').children[0];
    const descuento = fila.querySelector('td:nth-child(7)').children[0];
    const borrado = fila.querySelector('td:nth-child(8)').children[0].children[0].checked ? 1 : 0;

    let comp = true;
    [nombre, descripcion, seccion].forEach(input => {
        input.style.border = input.value ? "2px solid green" : (comp = false, "2px solid red");
    });

    const validarNumero = (input, type, maxValue = null) => {
        const valor = parseFloat(input.value);
        if (isNaN(valor) || valor < 0 || (maxValue !== null && valor > maxValue) ||( /[^\d]/.test(input.value) && type === "integer")) {
            input.style.border = "2px solid red";
            comp = false
        } else {
            input.style.border = "2px solid green";
        }
    };
    validarNumero(precio, "double");
    validarNumero(stock,  "integer");
    validarNumero(descuento, "integer", 100);

    //Si no hay imagen o los input no cumplen el filtro, cancelo la peticion
    if (!comp) return;
    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/editarProducto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // Usamos encodeURIComponent para asegurar que los datos se codifiquen correctamente
            // y evitar problemas con caracteres especiales como '&', '=', o espacios en blanco
            body: 'id=' + encodeURIComponent(fila.id) + 
                  '&nombre=' + encodeURIComponent(nombre.value) + 
                  '&descripcion=' + encodeURIComponent(descripcion.value) + 
                  '&precio=' + encodeURIComponent(precio.value) + 
                  '&stock=' + encodeURIComponent(stock.value) + 
                  '&descuento=' + encodeURIComponent(descuento.value) + 
                  '&idSeccion=' + encodeURIComponent(seccion.value) + 
                  '&deleted=' + encodeURIComponent(borrado)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            cargarContenidoNuevo("Productos");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
                });
                Toast.fire({
                icon: "success",
                title: "La información del producto ha sido actualizada"
            });
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
                });
                Toast.fire({
                icon: "error",
                title: "Error al editar el producto"
            });
        }
    
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function ejecutarEdicionUsuario(fila){
    const username = fila.querySelector('td:nth-child(2)').children[0];
    const email = fila.querySelector('td:nth-child(3)').children[0];
    const admin = fila.querySelector('td:nth-child(4)').children[0].children[0].checked ? 1 : 0;
    const borrado = fila.querySelector('td:nth-child(5)').children[0].children[0].checked ? 1 : 0;

    let errores = [];
    // Validar el nombre de usuario
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(username.value)) {
        username.style.borderColor = "red";
        errores.push("Nombre de usuario");
    }else username.style.borderColor = "green";

    // Validar el correo electrónico
    if (!/^[\w-.]+@[\w-]+\.[\w-]{2,}$/.test(email.value)) {
        email.style.borderColor = "red";
        errores.push("Dirección de correo");
    }else email.style.borderColor = "green";

    // Si hay errores, mostrar alerta
    if (errores.length > 0) {
        Swal.fire({
            icon: "error",
            title: "Campos no válidos:",
            html: errores.map(error => `<label class="ms-3">•${error}</label><br>`).join(""),
            timer: 5000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            toast: true
        });
        return;
    }

    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/modificarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userId=' + encodeURIComponent(fila.id) + 
                  '&username=' + encodeURIComponent(username.value) +
                  '&userOldName=' + encodeURIComponent(valoresOriginales[0]) +
                  '&email=' + encodeURIComponent(email.value) + 
                  '&userOldEmail=' + encodeURIComponent(valoresOriginales[1]) +
                  '&admin=' + encodeURIComponent(admin) + 
                  '&borrado=' + encodeURIComponent(borrado) + 
                  '&isAdmin=true'
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            cargarContenidoNuevo("Usuarios");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "success",
                title: datos.message
              });
        } else if(datos.status === 'ERROR'){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "warning",
                title: datos.message
              });
        }

    } catch (error) {
        console.error("Error: ", error);
    }

}

async function ejecutarEdicionCodigo(fila){
    const codigo = fila.querySelector('td:nth-child(1)').children[0];
    const descuento = fila.querySelector('td:nth-child(2)').children[0];

    let errores = [];

     if(codigo.value == ""){
        errores.push("Código");
        codigo.style.borderColor = "red";
     }else codigo.style.borderColor = "green";
     if(descuento.value == "" || descuento.value > 100 || descuento.value < 0){
        errores.push("Descuento");
        descuento.style.borderColor = "red";
     }else descuento.style.borderColor = "green";


    // Si hay errores, mostrar alerta
    if (errores.length > 0) {
        Swal.fire({
            icon: "error",
            title: "Campos no válidos:",
            html: errores.map(error => `<label class="ms-3">•${error}</label><br>`).join(""),
            timer: 5000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            toast: true
        });
        return;
    }

    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/modificarCodigo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'codigo=' + encodeURIComponent(fila.id) + 
                  '&nuevoCodigo=' + encodeURIComponent(codigo.value) + 
                  '&descuento=' + encodeURIComponent(descuento.value)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            cargarContenidoNuevo("Codigos");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "success",
                title: datos.message
              });
        } else if(datos.status === 'ERROR'){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "warning",
                title: datos.message
              });
        }

    } catch (error) {
        codigo.style.borderColor = "red";
        Swal.fire({
            position: "top",
            title: `${codigo.value} ya existe.`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000
        });
    }

}


async function cambiarContrasena(btn) {
    const fila = btn.closest('tr');

    const { value: password} = await Swal.fire({
        title: `Nueva contraseña para: ${fila.querySelector('td:nth-child(2)').innerText}`,
        input: "password",
        inputPlaceholder: "Contraseña...",
        confirmButtonText: "Cambiar contraseña",
        confirmButtonColor: "#0d6efd",
        inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off"
        },
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: async (password) => {
            if (!password) {
                Swal.showValidationMessage("Ingresa una contraseña.");
            }else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/.test(password)) {
                Swal.showValidationMessage("Contraseña no válida.");
            }
            let datos = await ejecutarCambioContrasena(fila.id, password);
            if (datos.status !== 'OK'){
                Swal.showValidationMessage(datos.message);
            }
        }
    });
    if (password) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
            });
            Toast.fire({
            icon: "success",
            title: `La contraseña de ${fila.querySelector('td:nth-child(2)').innerText} ha sido actualizada.`
        });
    }
}

async function ejecutarCambioContrasena(userId, password){
    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/modificarContrasena.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userId=' + encodeURIComponent(userId) +
                  '&password=' + encodeURIComponent(password) +
                  '&isAdmin=true'
        }); 

        return await response.json();

    } catch (error) {
        console.error("Error: ", error);
    }
}

//Muestro la foto que pertenece al producto de lo contrario aviso que no hay foto
function verFotoProducto(btn){
    const fila = btn.closest('tr');
    if(fila.querySelector('td:nth-child(2)').innerText === ""){
        document.getElementById("modalFotoNombre").innerText = fila.querySelector('td:nth-child(2)').children[0].value;
    }else{
        document.getElementById("modalFotoNombre").innerText = fila.querySelector('td:nth-child(2)').innerText;
    };
    modalFoto = document.getElementById("modalFoto");
    ModalNoFoto = document.getElementById("modalNoFoto");

    modalFoto.src = `resources/images/productos/${fila.id}.jpg`;
    ModalNoFoto.innerText = "";

    modalFoto.onerror = () => {
        modalFoto.src = ``;
        ModalNoFoto.innerText = "Este Producto no tiene foto";
    };
}

//* ONLOAD ============================================================
window.onload = () => {
    cargarContenidoNuevo("Productos");
};