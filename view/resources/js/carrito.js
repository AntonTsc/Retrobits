let userSesion = "anonymous";
const cesta = JSON.parse(localStorage.getItem("cesta"));
const despleglable = document.getElementById("botonesUsuario");
let descuento = 0;
let descuentoAplicado = false;

async function configurarSesion(){
    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/sesionComp.php");
        const sesion = await response.json();
    
        if (sesion.status === 'OK') {
            userSesion = sesion.user.id;
            if (sesion.user.admin){
                botonesAdmin();
              }else{
                botonesUser();
              }
        }
        verProductos();
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function verProductos(){
    try{
        let totalProductos = 0;
        let costeEnvio = 3.00; 
        const tbody = document.getElementById('generarTabla');
        tbody.innerHTML = '';

        const envioGratis = 100;

        cesta[userSesion].forEach((producto, index) => {

            const fila = document.createElement('tr');

            // Id del producto añadido al carrito
            const celdaIdProducto = document.createElement('td');
            //celdaIdProducto.textContent = producto.id;
            const imagen = document.createElement("img");
            let dir = "resources/images/productos/";
            imagen.src = `${dir}${producto.id}.jpg` ;
            imagen.onerror = function() {
                switch (producto.idSeccion) {
                case "1":
                    imagen.src = `${dir}defaultConsolas.jpg`;
                    break;
                case "2":
                    imagen.src = `${dir}defaultComputadoras.jpg`;
                    break;
                case "3":
                    imagen.src = `${dir}defaultCamaras.jpg`;
                    break;
                case "4":
                    imagen.src = `${dir}defaultRadios.jpg`;
                    break;
                case "5":
                    imagen.src = `${dir}defaultTelefonos.jpg`;
                    break;
                case "6":
                    imagen.src = `${dir}defaultElectrodomesticos.jpg`;
                    break;
                default:
                    imagen.src = `${dir}default.jpg`;
                    break;
                }
            };
            celdaIdProducto.appendChild(imagen);
            fila.appendChild(celdaIdProducto);
            
            // Muestra el nombre del producto añadido al carrito
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = producto.nombre;
            fila.appendChild(celdaNombre);

            // Cantidad de dicho producto
            const celdaCantidad = document.createElement('td');
            celdaCantidad.textContent = producto.cantidad;
            fila.appendChild(celdaCantidad);
            
            // Precio de dicho producto
            const celdaPrecio = document.createElement('td');
            celdaPrecio.textContent = producto.precio;
            fila.appendChild(celdaPrecio);

            // Precio total si hay descuento
            let precioTotal = producto.cantidad * parseFloat(producto.precio);
            if (parseFloat(producto.descuento) > 0){
                precioTotal = precioTotal - (precioTotal * parseFloat(producto.descuento)) / 100;
            }
            precioTotal = precioTotal.toFixed(2);

            const celdaPrecioTotal = document.createElement('td');
            celdaPrecioTotal.textContent = precioTotal;
            fila.appendChild(celdaPrecioTotal);

            totalProductos += parseFloat(precioTotal);

            // Celda para modificar la cantidad
            const celdaBotonesModificar = document.createElement('td');

            // Crear un contenedor para los botones
            const contenedorBotones = document.createElement('div');
            contenedorBotones.style.display = 'flex';
            contenedorBotones.style.justifyContent = 'flex-start';
            contenedorBotones.style.marginLeft = '25px';
            contenedorBotones.style.gap = '45px'; 

            // Botón para aumentar la cantidad del producto
            const botonAumentar = document.createElement('button');
            botonAumentar.classList.add('btn', 'mt-1', 'flex-grow-1');
            botonAumentar.textContent = '+';
            botonAumentar.style.cursor = 'pointer';
            botonAumentar.onclick = function () {
                aumentarProductoCarrito(producto, index);
            };

            // Botón para disminuir la cantidad del producto
            const botonDisminuir = document.createElement('button');
            botonDisminuir.classList.add('btn', 'mt-1', 'flex-grow-1');
            botonDisminuir.textContent = '-';
            botonDisminuir.style.cursor = 'pointer';
            botonDisminuir.onclick = function () {
                eliminarProductoCarrito(producto, index);
            };

            // Añadir los botones al contenedor
            contenedorBotones.appendChild(botonAumentar);
            contenedorBotones.appendChild(botonDisminuir);

            // Añadir el contenedor a la celda
            celdaBotonesModificar.appendChild(contenedorBotones);

            // Añadir la celda con los botones a la fila
            fila.appendChild(celdaBotonesModificar);


            // Añadir la fila a la tabla
            tbody.appendChild(fila);
        });

        if (totalProductos >= envioGratis) {
            costeEnvio = 0;
        }
            let costeEnvioTexto = (costeEnvio === 0) ? "Envío gratis" : `${costeEnvio.toFixed(2)} €`;

        // Actualizar el resumen
        document.getElementById('precioProductos').textContent = `Total de productos: ${totalProductos.toFixed(2)} €`;
        document.getElementById('costeEnvio').textContent = `Envío: ${costeEnvioTexto}`;
        document.getElementById('totalFinal').textContent = `Total: ${(totalProductos + costeEnvio).toFixed(2)} €`;


    } catch (error) {
        console.error('Error al ver productos', error);
    }
}

    function aumentarProductoCarrito(producto, index){
        cesta[userSesion][index].cantidad++;
        localStorage.setItem("cesta", JSON.stringify(cesta));
        verProductos();
    }

    function eliminarProductoCarrito(producto, index){
        if (cesta[userSesion][index].cantidad > 1){
            cesta[userSesion][index].cantidad--;
        } else {
            cesta[userSesion].splice(index, 1);
        }
        localStorage.setItem("cesta", JSON.stringify(cesta));
        verProductos();
    }

    const botonComprar = document.getElementById('botonComprar');
    botonComprar.onclick = function () {
        // Comprueba si hay sesión iniciada
        if (userSesion === "anonymous") {
            alert("Debe iniciar sesión para comprar.");
            return;
        }

    const direccion = document.getElementById('direccionEnvio').value;
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, 0);
        const dia = String(fecha.getDate()).padStart(2, 0);
        return `${anio}-${mes}-${dia}`;
    };
    const fechaActual = obtenerFechaActual();

    const obtenerFechaEntrega = () => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + 3);
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, 0);
        const dia = String(fecha.getDate()).padStart(2, 0);
        return `${anio}-${mes}-${dia}`;
    };
    const fechaEntrega = obtenerFechaEntrega();
    
    const pedido = {
        direccion: direccion,
        fechaActual: fechaActual,
        fechaEntrega: fechaEntrega,
        idUsuario: userSesion
    };
    
    comprarProductos(pedido);     
};

async function aplicarDescuento(){
    if (descuentoAplicado) {
        Swal.fire({
            text: "Ya se ha aplicado un descuento",
            icon: "info"
          });
        return;
    }
    const codigo = document.getElementById("codigoDescuento");
    if (codigo.value === ""){
        codigo.style.border = "1px solid red";
        return;
    }else codigo.style.border = "";
    try {
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/codigoDescuento.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'cd=' + encodeURIComponent(codigo.value)
        });

        const result = await response.json();
        if (result== "") {
            alert('El código de descuento no es válido.');
            return;
        }else{
            const pDescuentos = document.getElementById("descuento");
            pDescuentos.innerHTML = `Descuento:(${result.codigo}) -${result.porcentaje}%`

            let total = parseFloat(document.getElementById('totalFinal').textContent.replace(/[^\d.-]/g, ''))
            total = total * (1 - result.porcentaje/100);
            document.getElementById('totalFinal').textContent = `Total: ${total.toFixed(2)}€`;
            descuento = result.porcentaje;
            descuentoAplicado = true;
        }
       
    } catch (error) {
        console.error('Error', error);
    }

}

async function comprarProductos(pedido) {
    const direccion = document.getElementById("direccionEnvio");
    if (direccion.value === ""){
        direccion.style.border = "1px solid red";
        Swal.fire({
            text: "Por favor introduzca una dirección de envio.",
            icon: "error"
          });
        return;
    }
    try {
        // Obtiene los productos del usuario actual
        const productos = cesta[userSesion]; 

        // Comprueba si el carrito está vacío
        if (!productos || productos.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
            return;
        }

        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/carritoEdit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'direccion=' + encodeURIComponent(pedido.direccion) +
                  '&fecha=' + encodeURIComponent(pedido.fechaActual) +
                  '&fechaEntrega=' + encodeURIComponent(pedido.fechaEntrega) +
                  '&idUsuario=' + encodeURIComponent(userSesion) +
                  '&descuento=' + encodeURIComponent(descuento) +
                  '&productos=' + encodeURIComponent(JSON.stringify(productos))
        });

        const result = await response.json();
        console.log(result);

        if (result.status === 'OK') {
            localStorage.removeItem("cesta");
            Swal.fire({
                title: "¡Gracias!",
                text: "Su pedido ha sido realizado",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Continuar",
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../";
                }
              });
        } else {
            alert('Error al enviar el pedido: ' + result.message);
        }
    } catch (error) {
        console.error('Error al realizar la compra', error);
    }
}

function botonesAdmin(){

    document.getElementById("btnOprcionesPerfil").classList.add("bi-person-circle");
  
    const separador = document.createElement("div");
    separador.classList = "border"
  
    const li1 = document.createElement("li");
    const btnLogin = document.createElement("a");
    btnLogin.classList = "dropdown-item mt-1 mb-2";
    btnLogin.href = "perfil.html";
    btnLogin.innerHTML = "Ver perfil";
    li1.appendChild(btnLogin);
    
    const li2 = document.createElement("li");
    const btnPanelAdmin = document.createElement("a");
    btnPanelAdmin.classList = "d-flex justify-content-center btn btn-primary rounded-2 m-2";
    btnPanelAdmin.href = "panelAdmin.php";
    btnPanelAdmin.innerHTML = "Panel Admin";
    li2.appendChild(btnPanelAdmin);
  
    const li3 = document.createElement("li");
    const btnSignin = document.createElement("a");
    btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
    btnSignin.href = "../controller/logout.php";
    btnSignin.innerHTML = "Cerrar sesión";
    li3.appendChild(btnSignin);
  
    despleglable.insertBefore(li3, despleglable.firstChild);
    despleglable.insertBefore(separador, despleglable.firstChild);
    despleglable.insertBefore(li2, despleglable.firstChild);
    despleglable.insertBefore(li1, despleglable.firstChild);
  }
  
  function botonesUser(){
  
    document.getElementById("btnOprcionesPerfil").classList.add("bi-person-circle");
  
    const separador = document.createElement("div");
    separador.classList = "border"
  
    const li1 = document.createElement("li");
    const btnLogin = document.createElement("a");
    btnLogin.classList = "dropdown-item mt-1 mb-2";
    btnLogin.href = "perfil.html";
    btnLogin.innerHTML = "Ver perfil";
    li1.appendChild(btnLogin);
  
    const li2 = document.createElement("li");
    const btnSignin = document.createElement("a");
    btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
    btnSignin.href = "../controller/logout.php";
    btnSignin.innerHTML = "Cerrar sesión";
    li2.appendChild(btnSignin);
  
    despleglable.insertBefore(li2, despleglable.firstChild);
    despleglable.insertBefore(separador, despleglable.firstChild);
    despleglable.insertBefore(li1, despleglable.firstChild);
  }

window.onload = function(){
    configurarSesion();
};
