
async function verProductos(){
    try{
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        console.log(productos);

        const tbody = document.getElementById('generarTabla');

        tbody.innerHTML = '';

        productos.forEach(producto => {
            const fila = document.createElement('tr');

            // const celdaIdPedido = document.createElement('td');
            // celdaIdPedido.textContent = producto.idPedido;
            // fila.appendChild(celdaIdPedido);

            const celdaIdProducto = document.createElement('td');
            celdaIdProducto.textContent = producto.idProducto;
            fila.appendChild(celdaIdProducto);

            const celdaCantidad = document.createElement('td');
            celdaCantidad.textContent = producto.cantidad;
            fila.appendChild(celdaCantidad);

            const celdaBotonEliminar = document.createElement('td');
                    const botonEliminar = document.createElement('button');
                    botonEliminar.textContent = 'Eliminar producto del carrito';
                    botonEliminar.onclick = function () {
                        eliminarProducto(producto.idProducto);
                    };
                    celdaBotonEliminar.appendChild(botonEliminar);
                    fila.appendChild(celdaBotonEliminar);

                    // Añadir la fila a la tabla
                    tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error;', error);
    }
}

window.onload = function(){
    verProductos();
};

async function eliminarProducto(idProducto) {
    try {
        const response = await fetch(`/Retrobits/controller/eliminarProducto.php`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProducto: idProducto })
    });
        const eliminarProductos = await response.json();
        console.log(eliminarProductos);
        console.log(`${idProducto} eliminado exitosamente`);
            
        verProductos();
        
    } catch (error) {
        console.error('Error al eliminar', error);
    }
}