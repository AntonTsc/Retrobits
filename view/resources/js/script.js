//GENERACIÓN DE UN JSON PROVISIONAL PARA LA LECTURA DE DATOS DEL CARRITO DIRECTAMENTE DEL MISMO
 let arrayProductos = [
             {idProducto:'1', cantidad:'11'},
             {idProducto:'2', cantidad:'111'},
             {idProducto:'3', cantidad:'1111'}
         ];
          
            localStorage.setItem("prod", JSON.stringify(arrayProductos));
            let productos = JSON.parse(localStorage.getItem("prod"));
            console.log(localStorage)

async function verProductos(){
    try{

        // const response = await fetch('/Retrobits/controller/productos.php');
        // const productos = await response.json();
        // console.log(productos);

        const tbody = document.getElementById('generarTabla');

        tbody.innerHTML = '';

        productos.forEach(producto => {
            const fila = document.createElement('tr');

            //Id del producto añadido al carrito
            const celdaIdProducto = document.createElement('td');
            celdaIdProducto.textContent = producto.idProducto;
            fila.appendChild(celdaIdProducto);

            //Cantidad de dicho producto
            const celdaCantidad = document.createElement('td');
            celdaCantidad.textContent = producto.cantidad;
            fila.appendChild(celdaCantidad);

            //Botón para eliminar producto del carrito
            const celdaBotonEliminar = document.createElement('td');
                    const botonEliminar = document.createElement('button');
                    botonEliminar.textContent = 'Eliminar producto del carrito';
                    botonEliminar.onclick = function () {
                        arrayProductos.removeItem(producto.idProducto);
                        // eliminarProductoCarrito(producto.idProducto);
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

//FUNCIÓN QUE ELIMINA EL PRODUCTO DE LA BASE DE DATOS --------------> DESACTUALIZADO
//Eliminar el producto del carrito

// async function eliminarProductoCarrito(idProducto) {

//     productos.removeItem(idProducto);


    // try {
    //     const response = await fetch(`/Retrobits/controller/eliminarProductoCarrito.php`,{
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ idProducto: idProducto })
    // });
    //     const eliminarProductos = await response.json();
    //     console.log(eliminarProductos);
    //     console.log(`${idProducto} eliminado exitosamente`);
            
    //     verProductos();
        
    // } catch (error) {
    //     console.error('Error al eliminar', error);
    // }
// }