//Register
async function insertUsuario(){
    const data = {
        username: document.getElementById("floatingUser").value,
        email: document.getElementById("floatingEmail").value,
        password: document.getElementById("floatingPassword").value
    }

    try{
        const response = await fetch("/Retrobits/controller/registrarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // Usamos encodeURIComponent para asegurar que los datos se codifiquen correctamente
            // y evitar problemas con caracteres especiales como '&', '=', o espacios en blanco
            body: 'username=' + encodeURIComponent(data.username) + 
                  '&email=' + encodeURIComponent(data.email) + 
                  '&password=' + encodeURIComponent(data.password)
        }); 

        const datos = await response.json();

        // Ver si usamos alertas u otro tipo de mensaje mejor visualmente.
        if (datos.status === 'OK') {
            alert(datos.message);
        } else {
            alert(datos.message);
        }

    } catch (error) {
        console.error("Error: ", error);
    }
}

//TODO: Login
async function cargarUsuarios(){
    try{
        const response = await fetch("/Retrobits/controller/registrarUsuario.php");
        const usuarios = await response.json(); // Este response.json lo convierte en un array
        
        
    } catch (error) {
        console.error("Error: ", error);
    }
}