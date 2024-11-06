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
            body: 'username=' + data.username + '&email=' + data.email + '&password=' + data.password
        });

        if(response.ok){
            alert("Se ha creado el usuario.");
        } else {
            alert("Ya existe ese usuario/correo electrónico.");
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