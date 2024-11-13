let ultimoContenido = ""; // Variable para almacenar el contenido previo
let nuevoContenido = "";
let tabulacion = "";
let intervaloProductos = null;
let intervaloUsuarios = null;
let intervaloPedidos = null;

function cargarContenidoNuevo(tab){
    ultimoContenido = ""
    cargarContenido(tab);
}

function cargarContenidoNuevoDes(tab){
    cargarContenidoNuevo(tab);
    Swal.fire({
        position: "top",
        title: "Cambios cargados",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
}

function cargarContenido(tab) {
    tabulacion = tab;
    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();

    //configura una solicitud GET a la pagina panelAdmin---.php de forma asincrona
    //GET = método
    //panelAdmin${tab}.php = url a obtener
    //true = usar un proceso asincrono para la solicitud
    xhr.open("GET", `panelAdmin${tab}.php`, true);

    // Cuando la solicitud se complete, la función onload se ejecutará
    xhr.onload = function() {
        //si la conexion ha sido correcta/OK
        if (xhr.status === 200) {
             nuevoContenido = xhr.responseText;

             if (ultimoContenido == ""){
                document.getElementById("contenido").innerHTML = nuevoContenido;
                ultimoContenido = nuevoContenido; // Guardar el nuevo contenido
                document.querySelector(".desactualizado").innerHTML = "";
            } else if (nuevoContenido !== ultimoContenido) {
                // Comparar el nuevo contenido con el último contenido almacenado
                // Si hay cambios, actualizar el contenido y notificar
                if(tab == "Productos"){
                    notificarCambio(tab); // Llamada a la función de notificación
                }
            }
            
            // Actualizar las clases de pestañas
            document.querySelectorAll(".nav-link").forEach(pestana => {
                pestana.classList.remove("active");
                pestana.classList.remove("text-dark");
            });
            document.getElementById(tab).classList.add("active");
            document.getElementById(tab).classList.add("text-dark");
            
            switch (tab) {
                case "Productos":
                    filtrardores();
                    observadorBotonAgregar();
                    if (!intervaloProductos) {
                        intervaloProductos = setInterval(() => cargarContenido("Productos"), 5000);
                    }
                    clearInterval(intervaloUsuarios);
                    intervaloUsuarios = null;
                    clearInterval(intervaloPedidos);
                    intervaloPedidos = null;
                    break;
            
                case "Usuarios":
                    if (!intervaloUsuarios) {
                        intervaloUsuarios = setInterval(() => cargarContenido("Usuarios"), 5000);
                    }
                    clearInterval(intervaloProductos);
                    intervaloProductos = null;
                    clearInterval(intervaloPedidos);
                    intervaloPedidos = null;
                    break;
            
                case "Pedidos":
                    if (!intervaloPedidos) {
                        intervaloPedidos = setInterval(() => cargarContenido("Pedidos"), 5000);
                    }
                    clearInterval(intervaloProductos);
                    intervaloProductos = null;
                    clearInterval(intervaloUsuarios);
                    intervaloUsuarios = null;
                    break;
            
                    default:
                        console.warn("Pestaña desconocida:", tab);
                        break;
                }
                setClickDerecho();
                
            } else if (xhr.status === 404) {
                document.getElementById("contenido").innerHTML = "<h1 class='text-center'>404</h1><p class='text-center'>Página no encontrada</p>"
                document.querySelectorAll(".nav-link").forEach(pestana => {
                    pestana.classList.remove("active");
                    pestana.classList.remove("text-dark");
                });
                clearInterval(intervaloProductos);
                intervaloProductos = null;
                clearInterval(intervaloUsuarios);
                intervaloUsuarios = null;
                clearInterval(intervaloPedidos);
                intervaloPedidos = null;
            }
        };
        
        xhr.onerror = function() {
            alert("Error en la solicitud. No se pudo conectar con el servidor.");
        };
    //Manda la solicitud
    xhr.send();

    //En este caso send() manda la solicitud que hemos configurado en el open()
    //si la solicitud llega a la página y esta devuelve OK (código 200), entrará en el if
    //Dentro del if, nos guardará en el elemento con el código "contenido" él .responseText
    //.responseText devuelve texto plano, en este caso nos devolverá la parte de html de la página solicitada
    //ya que el código php de la misma no es texto plano
    //y para finalizar actualizo el contenido de las clases de la pestaña para que se queden como "activas" y de la sensación de que se ha cambiado de tabulación
}


    function notificarCambio(tab) {
        clearInterval(intervaloProductos);
        Swal.fire({
            position: "top",
            title: "Se han detectado cambios en la base de datos",
            text: "Se han realizado cambios en los productos de la base de datos, ¿desea ver los nuevos datos?",
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
                ultimoContenido = ""; // Guardar el nuevo contenido
                cargarContenido("Productos");
                intervaloProductos = null;
                intervaloUsuarios = null;
                intervaloPedidos = null;
              Swal.fire({
                position: "top",
                title: "Cambios cargados",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
            }else{
                intervaloProductos = null;
                intervaloUsuarios = null;
                intervaloPedidos = null;
                let fecha = new Date();
                let horas = String(fecha.getHours()).padStart(2, '0');
                let minutos = String(fecha.getMinutes()).padStart(2, '0');
                document.querySelector(".desactualizado").innerHTML = `Los datos de la página están desactualizados desde las ${horas}:${minutos} - <button class="cargarDesactualizado" onclick="cargarContenidoNuevoDes('${tab}')">actualizar</button>`;

                Swal.fire({
                    position: "top",
                    html: "Los cambios que puedas hacer a partir de ahora podrían llegar a reescribir los cambios de los nuevos datos actuales de la base de datos o devolver errores.<br><br><i>(Cualquier acción (editar, eliminar y añadir) después de ejecutarse actualizara la información de la tabla)</i>",
                    icon: "info",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Vale",
                    allowOutsideClick: false
                  });
            }
          });
    }
    function filtrardores() {
        const buscador = document.getElementById("buscador");
        const selector = document.getElementById("selector");
        const filas = document.querySelectorAll("table tbody tr");
        buscador.addEventListener("input", () => {
            const filtro = eliminarTildes(buscador.value.toLowerCase()); // Texto del filtro sin tildes
            const criterio = selector.value;
            filas.forEach(fila => {
                // Obtener el texto de la celda según el criterio seleccionado
                // Es decir id es el hijo 1, con lo cual si id esta seleccionado buscara por el contenido del primer hijo de cada fila
                const celda = fila.querySelector(`td:nth-child(${getColumnIndex(criterio)})`);
                const textoCelda = celda ? eliminarTildes(celda.textContent.toLowerCase()) : "";
                fila.style.display = textoCelda.includes(filtro) ? "" : "none";
            });
        });
    }
    // Función auxiliar para obtener el índice de la columna según el criterio
    function getColumnIndex(criterio) {
        switch(criterio) {
            case "id": return 1;
            case "nombre": return 2;
            case "descripcion": return 3;
            case "precio": return 4;
            case "stock": return 5;
            case "descuento": return 6;
            case "idSeccion": return 7;
            case "deleted": return 8;
            default: return 1;
        }
    }
    // Función para eliminar tildes y normalizar el texto
    function eliminarTildes(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    async function eliminarProductoConfirm(id, producto){
        Swal.fire({
            position: "top",
            title: "¿Estas seguro?",
            html: `<h3>${producto}</h3>¡Este producto se <b class="text-danger">eliminara</b> de forma permanente!<br>Puedes cambiar el valor de <b>Borrado</b> para que no se vea en producción.`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#0dcaf0",
            confirmButtonColor: "#dc3545",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar producto"
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarProducto(id);
            }
          });
    }
    async function eliminarProducto(id){
        clearInterval(intervaloProductos);
        intervaloProductos = null;
        try{
            const response = await fetch("/Retrobits/controller/eliminarProducto.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'id=' + id
            }); 
            const datos = await response.json();
            if (datos.status === 'OK') {
                //eliminarProducto(id);
                document.getElementById(id).classList.add('remove');
                // Escucha el final de la transición para eliminar el elemento
                document.getElementById(id).addEventListener('transitionend', () => {
                    cargarContenidoNuevo("Productos");
                });
                const Toast = Swal.mixin({
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 10000,
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
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    async function nuevoProducto() {
        const nombre = document.getElementById("nuevoNombre");
        const descripcion = document.getElementById("nuevoDescripcion");
        const seccion = document.getElementById("nuevoSeccion");
        const precio = document.getElementById("nuevoPrecio");
        const stock = document.getElementById("nuevoStock");
        const descuento = document.getElementById("nuevoDescuento");
        const borrado = document.getElementById("nuevoBorrado").checked ? 1 : 0;
        
        let comp = true;

        if (nombre.value === "") {
            nombre.style.borderColor = "red"; comp = false;
        } else nombre.style.borderColor = "green";

        if (descripcion.value === "") {
            descripcion.style.borderColor = "red"; comp = false;
        } else descripcion.style.borderColor = "green";

        if (seccion.value === "") {
            seccion.style.borderColor = "red"; comp = false;
        } else seccion.style.borderColor = "green";

        // validacion de los campos numericos
        const validarNumero = (input, maxValue = null) => {
            const valor = parseFloat(input.value);
            if (isNaN(valor) || valor < 0 || (maxValue !== null && valor > maxValue) || /[^\d]/.test(input.value)) {
                input.style.borderColor = "red";
                return false;
            } else {
                input.style.borderColor = "green";
                return true;
            }
        };

        if (!validarNumero(precio)) comp = false;
        if (!validarNumero(stock)) comp = false;
        if (!validarNumero(descuento, 100)) comp = false;

        if(!comp) return;
        
        try{
            const response = await fetch("/Retrobits/controller/registrarProducto.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // Usamos encodeURIComponent para asegurar que los datos se codifiquen correctamente
                // y evitar problemas con caracteres especiales como '&', '=', o espacios en blanco
                body: 'nombre=' + encodeURIComponent(nombre.value) + 
                        '&descripcion=' + encodeURIComponent(descripcion.value) +
                        '&idSeccion=' + encodeURIComponent(seccion.value) + 
                        '&precio=' + encodeURIComponent(precio.value) + 
                        '&stock=' + encodeURIComponent(stock.value) + 
                        '&descuento=' + encodeURIComponent(descuento.value) + 
                        '&deleted=' + encodeURIComponent(borrado.borrado)
            }); 
    
            const datos = await response.json();
    
            if (datos.status === 'OK') {
                document.querySelector("#cerrarModal").click();
                cargarContenidoNuevo("Productos");
                Swal.fire({
                    position: "top",
                    title: `${data.nombre.value} ha sido añadido.`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                  });
            }
    
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    function editarFila(btn) {
        // Encontrar la fila asociada al botón de "Editar"
        var fila = btn.closest('tr'); // El "closest" busca el elemento más cercano con la etiqueta <tr>
        fila.classList.add('editando');
        // Seleccionar todas las celdas de la fila (excepto la última, que tiene el botón)
        var celdas = fila.querySelectorAll('.editable');
        // Convertir cada celda en un input con el valor actual
        celdas.forEach(function(celda) {
            var valorActual = celda.innerText;
            celda.innerHTML = `<input type="text" class="form-control" value="${valorActual}">`;
        });
        // Cambiar el texto del botón de "Editar" a "Guardar"
        console.log(fila.id);
        fila.querySelector(`#btn${fila.id}`).innerHTML = ' Guardar';
        fila.querySelector(`#btn${fila.id}`).setAttribute('onclick', 'guardarEdiciones(this)');
    }
    function guardarEdiciones(btn) {
        // Encontrar la fila asociada al botón de "Guardar"
        var fila = btn.closest('tr');
        var celdas = fila.querySelectorAll('.editable');
        // Recoger los valores de los inputs y actualizarlos en las celdas
        celdas.forEach(function(celda) {
            celda.innerHTML = celda.querySelector('input').value;
        });
        fila.classList.remove('editando');
        fila.classList.add('editado');
        // Escucha el final de la transición para eliminar el elemento
        fila.addEventListener('transitionend', () => {
            fila.classList.remove('editado');
            fila.addEventListener('transitionend', () => {
                cargarContenido("Productos");
            });
        });
        // Cambiar el texto del botón de "Guardar" de nuevo a "Editar"
        fila.querySelector(`#btn${fila.id}`).innerHTML = 'Editar';
    }
        // Cargar la pestaña predeterminada al iniciar la página
    function observadorBotonAgregar(){

        const botonPrincipal = document.getElementById("agregar");
        const botonScroll = document.getElementById("agregarScroll");

        // Configura el IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si el primer botón sale completamente de la pantalla (no es visible)
                if (!entry.isIntersecting) {
                    botonScroll.style.display = "inline-block"; // Muestra el segundo botón
                } else {
                    botonScroll.style.display = "none"; // Oculta el segundo botón cuando el primero es visible
                }
            });
        }, { threshold: 0 });

        // Inicia el observador para el primer botón
        observer.observe(botonPrincipal);
    }
    let elementoClicDerecho;
    function setClickDerecho(){
        // Variable para almacenar el elemento donde se hizo clic derecho
        // Obtener el menú
        const tabla = document.getElementById('cuerpoTabla');
        const menu = document.getElementById('menuDesplegable');
        // Función para mostrar el menú en la posición del clic derecho
        tabla.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Evitar el menú contextual predeterminado
            // Almacenar el elemento sobre el que se hizo clic derecho
            elementoClicDerecho = event.target;
            if(elementoClicDerecho.closest('tr').classList.contains('editando')){
                document.getElementById('md1').innerHTML = " Guardar";
            }else{
                document.getElementById('md1').innerHTML = " Editar";
            }
            // Mostrar el menú en la posición del cursor
            menu.style.display = 'block';
            menu.style.left = `${event.pageX}px`;
            menu.style.top = `${event.pageY}px`;
        });
        // Función para ocultar el menú al hacer clic fuera de él
        document.addEventListener('click', () => {
            menu.style.display = 'none';
        });
        // Opcional: Ocultar el menú al hacer scroll
        window.addEventListener('scroll', () => {
            menu.style.display = 'none';
        });
    }
    // Función para mostrar en consola el elemento clicado
    function accion1() {
        if(document.getElementById('md1').innerText == " Editar"){
            editarFila(elementoClicDerecho);
        }else if(document.getElementById('md1').innerText == " Guardar"){
            guardarEdiciones(elementoClicDerecho); //
        }
    }
    // Funciones de ejemplo para otras acciones
    function accion2() {
        let tr = elementoClicDerecho.closest('tr')
        eliminarProductoConfirm(tr.id, tr.children[1].innerText);
    }
window.onload = () =>{
    cargarContenido("Productos");
};