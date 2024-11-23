let userSesion = "anonymous";
const cesta = JSON.parse(localStorage.getItem("cesta"));

async function configurarSesion(){
    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();
    
        if (sesion.status === 'OK') {
            userSesion = sesion.user.id;
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

        const envioGratis = 2500;

        cesta[userSesion].forEach((producto, index) => {

            const fila = document.createElement('tr');

            // Id del producto añadido al carrito
            const celdaIdProducto = document.createElement('td');
            celdaIdProducto.textContent = producto.id;
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

async function comprarProductos(pedido) {
    try {
        // Obtiene los productos del usuario actual
        const productos = cesta[userSesion]; 

        // Comprueba si el carrito está vacío
        if (!productos || productos.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
            return;
        }

        const response = await fetch("/Retrobits/controller/carritoEdit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'direccion=' + encodeURIComponent(pedido.direccion) +
                  '&fecha=' + encodeURIComponent(pedido.fechaActual) +
                  '&fechaEntrega=' + encodeURIComponent(pedido.fechaEntrega) +
                  '&idUsuario=' + encodeURIComponent(userSesion) +
                  '&productos=' + encodeURIComponent(JSON.stringify(productos))
        });

        const result = await response.json();
        console.log(result);

        if (result.status === 'OK') {
            alert('Pedido enviado correctamente.');
            // Vaciar el carrito
            localStorage.removeItem("cesta");
            location.reload();
        } else {
            alert('Error al enviar el pedido: ' + result.message);
        }
    } catch (error) {
        console.error('Error al realizar la compra', error);
    }
}

window.onload = function(){
    configurarSesion();
};
