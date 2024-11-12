//GENERACIÓN DE UN JSON PROVISIONAL PARA LA LECTURA DE DATOS DEL CARRITO DIRECTAMENTE DEL MISMO
let cesta = {
    anonymous: {
      0:{
        cantidad: 2,
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
        
        let total = 0;

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

            //Precio total de dicho producto
            const precioTotal = (producto.cantidad * producto.precio).toFixed(2);
            const celdaPrecioTotal = document.createElement('td');
            celdaPrecioTotal.textContent = precioTotal;
            fila.appendChild(celdaPrecioTotal);

            total+= parseFloat(precioTotal);

            if(total < 2500){
    
                const celdaEnvio = document.createElement('td');
                const costeEnvio = 3; 
                celdaEnvio.textContent = costeEnvio.toFixed(2);
                fila.appendChild(celdaEnvio);
            
            } else {
                const celdaEnvio = document.createElement('td');
                celdaEnvio.textContent = 'Envío gratis';
                fila.appendChild(celdaEnvio);
            }

            // Botón para aumentar la cantidad del producto
            const celdaBotonAumentar = document.createElement('td');
                const botonAumentar = document.createElement('button');
                botonAumentar.textContent = 'Aumentar';
                botonAumentar.onclick = function () {
                    aumentarProductoCarrito(eleccion);
                };
                celdaBotonAumentar.appendChild(botonAumentar);
                fila.appendChild(celdaBotonAumentar);

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

function aumentarProductoCarrito(eleccion){

    productos[eleccion].cantidad++;
    
    localStorage.setItem("prod", JSON.stringify({anonymous: productos}));
    verProductos();

}

function eliminarProductoCarrito(eleccion){

    if (productos[eleccion].cantidad > 1){
        productos[eleccion].cantidad--;
    }else{
        delete productos[eleccion];
    }
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