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


//* FUNCIONES =========================================================
//Se encarga de cargar el contenido por completo reiniciando los comparadores
function cargarContenidoNuevo(tab, desactualizado = false) {
    //Vacia el contenido que deveriamos ver para poder cargar nuevo contenido
    ultimoContenido = "";

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
    xhr.onload = function () {
        if (xhr.status === 200) {//si la conexion ha sido correcta/OK
            nuevoContenido = xhr.responseText;
            analizarContenido(tab);
        } else if (xhr.status === 404) {//si la conexion ha sido erronea o no encontrada
            mostrarError404();
        }
    };

    xhr.onerror = function () {
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
        setClickDerecho();
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
            if (!intervaloUsuarios) intervaloUsuarios = setInterval(() => cargarContenido("Usuarios"), 5000);
            break;
        case "Pedidos":
            if (!intervaloPedidos) intervaloPedidos = setInterval(() => cargarContenido("Pedidos"), 5000);
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
}

//La pagina del Request no se ha encontrado, nos muestra un mensaje en su lugar
function mostrarError404() {
    document.getElementById("contenido").innerHTML = "<h1 class='text-center'>404</h1><p class='text-center'>Página no encontrada</p>";
    document.querySelectorAll(".nav-link").forEach(pestana => {
        pestana.classList.remove("active", "text-dark");
    });
    vaciarIntervalos();
}

//SweetAlert2 es una libreria para mostrar alertas dinamicas
//Muestra un mensaje que nos permitira mantener la pagina actual o refescar los datos por Ajax
function notificarCambio(tab) {

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
    document.querySelector(".desactualizado").innerHTML = `Los datos de la página están desactualizados desde las ${horas}:${minutos} - <button class="cargarDesactualizado" onclick="cargarContenidoNuevo('${tab}', true)">actualizar</button>`;

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
    const botonPrincipal = document.getElementById("agregar");
    const botonScroll = document.getElementById("agregarScroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            botonScroll.style.display = !entry.isIntersecting ? "inline-block" : "none";
        });
    }, { threshold: 0 });

    observer.observe(botonPrincipal);
}

//Devuevle un String, separa las letras con caracter especial y luego elimina el caracter especial
function eliminarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//* MANIPULACIONES DE DOM =============================================
//Muestra un menú en la posición del clic derecho si es en la tabla. Este menú permite editar o guardar una fila dependiendo de su estado ademas de permitir eliminar la misma.
//Está configurado para que el menú no se muestre fuera de la pantalla
function setClickDerecho() {
    const tabla = document.getElementById('cuerpoTabla');
    const menu = document.getElementById('menuDesplegable');
    const mdEditar = document.getElementById('mdEditar');

    // Mostrar menú en la posición del clic derecho
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
// Ejecutar acción para eliminar producto
function clickDerechoAccionEliminar() {
    const tr = elementoClickDerecho.closest('tr');
    eliminarProductoConfirm(tr.id, tr.children[1].innerText);
}

//Funciones dedicadar para la pestaña de productos
function funcionesProductos() {
    document.getElementById("mdImagen").classList.remove("d-none");
    document.getElementById("mdEditar").classList.replace("rounded-bottom-0", "rounded-0");
    const buscador = document.getElementById("buscador");
    const selector = document.getElementById("selector");
    const filas = document.querySelectorAll("table tbody tr");

    //Escucha el input del buscador
    buscador.addEventListener("input", () => {
        const filtro = eliminarTildes(buscador.value.toLowerCase());
        const indice = selector.value;

        //Buscara el contenido dependiendo del indice seleccionado
        filas.forEach(fila => {
            const celda = fila.querySelector(`td:nth-child(${indice})`);
            const textoCelda = celda ? eliminarTildes(celda.textContent.toLowerCase()) : "";
            //Si el contenido del indice no incluye el contenido del buscador se oculta
            fila.style.display = textoCelda.includes(filtro) ? "" : "none";
        });
    });

    
    configurarCropper();
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
        const response = await fetch("/Retrobits/controller/registrarProducto.php", {
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

//Una confirmacion para eliminar el producto
function eliminarProductoConfirm(id, producto,){
    const fila = document.querySelector("#id");
    const filaEditando = document.querySelector('tr.editando');
    if (filaEditando && filaEditando !== fila) {
        // Si ya hay una fila editando, podemos cancelar la edición de la fila actual
        Swal.fire({
            text: "Actualmente estás editando una fila. Por favor, finaliza la edición antes de proceder con la eliminación del producto.",
            confirmButtonText: "Vale",
            confirmButtonColor: "#0d6efd"
          });
        return; // Salir sin hacer nada si otra fila ya está siendo editada
    }
    Swal.fire({
        position: "top",
        title: "¿Estas seguro?",
        html: `<h3>${producto}</h3>¡Este producto se <b class="text-danger">eliminara</b> de forma permanente!<br>Puedes cambiar el valor de <b>Borrado</b> para que no se vea en producción.`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#0d6efd",
        confirmButtonColor: "#dc3545",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar producto"
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarProducto(id);
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
        const response = await fetch("/Retrobits/controller/eliminarProducto.php", {
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
            inputHTML = `<input type="text" class="form-control" value="${valorActual}">`;
        } else if (celda.classList.contains('number')) {
            inputHTML = `<input type="number" class="form-control text-end" value="${valorActual}">`;
        } else if (celda.classList.contains('boolean')) {
            inputHTML = `<div class="form-check form-switch d-flex justify-content-center align-items-center">
                            <input class="form-check-input" type="checkbox" role="switch" ${valorActual === 'Si' ? 'checked' : ''}>
                        </div>`;
        } else if (celda.classList.contains('select')) {
            inputHTML = `<select id="nuevoSeccion" class="form-select" aria-label="Large select example">
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

async function guardarEdiciones(btn) {
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
       cargarContenidoNuevo("Productos");
        return;
    }

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
        const response = await fetch("/Retrobits/controller/editarProducto.php", {
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

//Muestro la foto que pertenece al producto de lo contrario aviso que no hay foto
function verFotoProducto(btn){
    const fila = btn.closest('tr');
    if(fila.querySelector('td:nth-child(2)').innerText === ""){
        console.log("Product")
        document.getElementById("modalFotoNombre").innerText = fila.querySelector('td:nth-child(2)').children[0].value;
    }else{
        console.log("Product2")
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
    cargarContenido("Productos");
};
