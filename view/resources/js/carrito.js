let userSesion = "anonymous";
const cesta = JSON.parse(localStorage.getItem("cesta"));

async function configurarSesion(){
    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();
    
        if (sesion.status === 'OK') {
               userSesion = sesion.user.id;
        //     cestaComp();
        //     if (sesion.user.admin){
        //     botonesAdmin();
        //     }else{
        //     botonesUser();
        //     }
        // } else {
        //     botonesAnon();
        }
        verProductos();
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function verProductos(){
    try{
        let totalProductos = 0;
        const tbody = document.getElementById('generarTabla');
        tbody.innerHTML = '';

        cesta[userSesion].forEach( (producto, index) => {
            
            const fila = document.createElement('tr');

            //Id del producto añadido al carrito
            const celdaIdProducto = document.createElement('td');
            celdaIdProducto.textContent = producto.id;
            fila.appendChild(celdaIdProducto);
            
            //Muestra el nombre del producto añadido al carrito
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = producto.nombre;
            fila.appendChild(celdaNombre);

            //Cantidad de dicho producto
            const celdaCantidad = document.createElement('td');
            celdaCantidad.textContent = producto.cantidad;
            fila.appendChild(celdaCantidad);
            
            //Precio de dicho producto
            const celdaPrecio = document.createElement('td');
            celdaPrecio.textContent = producto.precio;
            fila.appendChild(celdaPrecio);

            //Precio total si hay descuento
            let precioTotal = producto.cantidad * parseFloat(producto.precio);
            if (parseFloat(producto.descuento) > 0){
                precioTotal = precioTotal - (precioTotal*parseFloat(producto.descuento))/100;
            }
            precioTotal = precioTotal.toFixed(2);

            const celdaPrecioTotal = document.createElement('td');
            celdaPrecioTotal.textContent = precioTotal;
            fila.appendChild(celdaPrecioTotal);

            totalProductos+= parseFloat(precioTotal);

            // Botón para aumentar la cantidad del producto
            const celdaBotonAumentar = document.createElement('td');
            const botonAumentar = document.createElement('button');
            botonAumentar.textContent = 'Aumentar';
            botonAumentar.onclick = function () {
                aumentarProductoCarrito(producto, index);
            };
            celdaBotonAumentar.appendChild(botonAumentar);
            fila.appendChild(celdaBotonAumentar);

            //Botón para eliminar producto del carrito
            const celdaBotonEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar producto del carrito';
            botonEliminar.onclick = function () {
                eliminarProductoCarrito(producto, index);
            };
            celdaBotonEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaBotonEliminar);

             // Añadir la fila a la tabla
            tbody.appendChild(fila);
           
        });
       
        let costeEnvio = 0;
        const filaEnvio = document.createElement('tr');
        const celdaEnvio = document.createElement('td');
        celdaEnvio.colSpan = 6;
        

        if(totalProductos < 2500){

            costeEnvio = 3; 
            celdaEnvio.textContent = costeEnvio.toFixed(2);
            
        
        } else {
            celdaEnvio.textContent = 'Envío gratis';
        }

        filaEnvio.appendChild(celdaEnvio);
        tbody.appendChild(filaEnvio);

        document.getElementById('precioProductos').textContent = `Total de productos: ${totalProductos.toFixed(2)} €`;
        document.getElementById('costeEnvio').textContent = `Envío: ${costeEnvio.toFixed(2)} €`;
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
    }else{
         cesta[userSesion].splice(index, 1);
    }
    localStorage.setItem("cesta", JSON.stringify(cesta));
    verProductos();

}

const botonComprar = document.getElementById('botonComprar');

botonComprar.onclick = function () {
    const direccion = document.getElementById('direccionEnvio').value;
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, 0);
        const dia = String(fecha.getDate()).padStart(2, 0);
        return `${anio}-${mes}-${dia}`;
    }
    const fechaActual = obtenerFechaActual();
    // console.log(fechaActual)
    const obtenerFechaEntrega = () => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate()+3)
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, 0);
        const dia = String(fecha.getDate()).padStart(2, 0);
        return `${anio}-${mes}-${dia}`;
    }
    const fechaEntrega = obtenerFechaEntrega();
    
    // const productosUsuario = cesta.userSesion;
    // console.log(productosUsuario)
    
    const pedido = {
        direccion: direccion,
        fechaActual: fechaActual,
        fechaEntrega: fechaEntrega,
        idUsuario: userSesion
    }
   comprarProductos(pedido);     
}; 

async function comprarProductos(pedido){
    console.log(pedido.direccion);
    try{
        
        const response = await fetch("/Retrobits/controller/carritoEdit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 
                'direccion='+ encodeURIComponent(pedido.direccion) +
                '&fecha=' + encodeURIComponent(pedido.fechaActual) +
                '&fechaEntrega=' + encodeURIComponent(pedido.fechaEntrega) +
                '&idUsuario=' + encodeURIComponent(userSesion)
        });
        
        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error('Error al realizar la compra', error);
    }
}

//Anterior creado con FormData. PRUEBA***************************

// async function comprarProductos(pedido){
//     console.log(pedido.direccion);
    
//     const FormData = new FormData;

//     FormData.append("direccion", pedido.direccion);
//     FormData.append("fechaActual", pedido.fechaActual);
//     FormData.append("fechaEntrega", pedido.fechaEntrega);
//     FormData.append("userSesion", userSesion);
    
//     try{
        
//         const response = await fetch("/Retrobits/controller/carritoEdit.php", {
//             method: "POST",
//             body: 
//                 FormData
//         });
        
//         const result = await response.json();
//         console.log(result);
        
//     } catch (error) {
//         console.error('Error al realizar la compra', error);
//     }
// }

// const botonComprar = document.getElementById('botonComprar');

// botonComprar.onclick = function () {
//     const direccion = document.getElementById('direccionEnvio').value;
//     const fechaActual = new Date();
//     const fechaEntrega = new Date(fechaActual);
//         fechaEntrega.setDate(fechaActual.getDate() + 3);
    
//     const productosUsuario = cesta.userSesion;
//     console.log(productosUsuario)
    
//     const pedido = {
//         direccion: direccion,
//         fecha: fechaActual,
//         fechaEntrega: fechaEntrega,
//         idUsuario: userSesion,
//     }

//    comprarProductos(pedido);     
// }; 
    


// REVISAR PRIMERO

// async function enviarProductos(){
//         try{
//                 const response = await fetch("/Retrobits/controller/productos.php");
//               const productos = await response.json();
//             }
//         }
        



window.onload = function(){
    configurarSesion();
    
};
