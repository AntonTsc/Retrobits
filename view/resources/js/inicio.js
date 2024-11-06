// Función para obtener y mostrar todos los productos en una tabla
async function obtenerProductos() {
    try {
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        productos.sort(function(a, b){return b.descuento - a.descuento});
        console.log(productos);
        
        let tituloCartas = document.getElementsByClassName('card-title');
        console.log(productos[1].nombre);
        let i = 0;
        for (let i = 0; i < tituloCartas.length; i++) {
            tituloCartas[i].innerHTML = productos[i].nombre;
        }
        


        // // Obtener el cuerpo de la tabla
        // const tbody = document.getElementById('usersTableBody');

        // // Limpiar cualquier fila anterior en la tabla
        // tbody.innerHTML = '';

        // // Recorrer cada usuario y crear una fila en la tabla
        // // Recorrer cada usuario y crear una fila en la tabla
        // productos.forEach(usuario => {
        //     const fila = document.createElement('tr');

        //     // Crear y añadir celdas para cada propiedad del usuario
        //     const celdaUsername = document.createElement('td');
        //     celdaUsername.textContent = usuario.username;
        //     fila.appendChild(celdaUsername);

        //     const celdaNombre = document.createElement('td');
        //     celdaNombre.textContent = usuario.nombre;
        //     fila.appendChild(celdaNombre);

        //     const celdaPassword = document.createElement('td');
        //     celdaPassword.textContent = usuario.password;
        //     fila.appendChild(celdaPassword);

        //     // Crear la celda de acciones (botón eliminar)
        //     const celdaAcciones = document.createElement('td');
        //     const botonEliminar = document.createElement('button');
        //     botonEliminar.textContent = 'Eliminar';
        //     botonEliminar.onclick = function () {
        //         eliminarUsuario(usuario.username);  // Llamar a la función de eliminación
        //     };
        //     celdaAcciones.appendChild(botonEliminar);
        //     fila.appendChild(celdaAcciones);

        //     // Añadir la fila a la tabla
        //     tbody.appendChild(fila);
        // });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecutar la función obtenerProductos cuando se cargue la página
window.onload = function () {
    obtenerProductos();
};