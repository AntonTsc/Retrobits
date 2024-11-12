//GENERACIÓN DE UN JSON PROVISIONAL PARA LA LECTURA DE DATOS DEL CARRITO DIRECTAMENTE DEL MISMO
let cesta = {
    anonymous: {
      0:{
        cantidad: 1,
        deleted: "0",
        descripcion: "Laptop de alto rendimiento para profesionales",
        descuento: "5",
        id: "4",
        idSeccion: "2",
        nombre: "MacBook Pro",
        precio: "2399.99",
        stock: "30"
      }
    }
  };
          
    localStorage.setItem("prod", JSON.stringify(cesta));
    let productos = JSON.parse(localStorage.getItem("prod")).anonymous;
    console.log(localStorage)

async function verProductos(){
    try{

        // const response = await fetch('/Retrobits/controller/productos.php');
        // const productos = await response.json();
        // console.log(productos);

        const tbody = document.getElementById('generarTabla');

        tbody.innerHTML = '';

        Object.keys(productos).forEach(eleccion => {

            const producto = productos[eleccion];
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

            //Botón para eliminar producto del carrito
            const celdaBotonEliminar = document.createElement('td');
                    const botonEliminar = document.createElement('button');
                    botonEliminar.textContent = 'Eliminar producto del carrito';
                    botonEliminar.onclick = function () {
                        eliminarProductoCarrito(eleccion);
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

function eliminarProductoCarrito(eleccion){

    delete productos[eleccion];
    localStorage.setItem("prod", JSON.stringify({anonymous: productos}));
    verProductos();

}

async function comprarProductos(){
    try{
        const tbody = document.getElementById('botonComprar');

        tbody.innerHTML = '';

        
            const fila = document.createElement('tr');
            //Botón para comprar los productos del carrito
            const celdaBotonComprar = document.createElement('td');
            const botonComprar = document.createElement('button');
            botonComprar.textContent = 'Comprar productos del carrito';
            botonComprar.onclick = function () {
                
            };
            celdaBotonComprar.appendChild(botonComprar);
            fila.appendChild(celdaBotonComprar);

            // Añadir la fila a la tabla
            tbody.appendChild(fila);
        

    } catch (error) {
        console.error('Error;', error);
    }
}

window.onload = function(){
    verProductos();
    comprarProductos();
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