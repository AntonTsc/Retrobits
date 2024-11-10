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

        if (datos.status === 'OK') {
            window.location.href = "http://localhost/Retrobits/index.html";
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Ya existe un usuario con ese nombre/email"
              });
        }

    } catch (error) {
        console.error("Error: ", error);
    }
}

//Login
async function loginUsuario(){
    const data = {
        user: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    try{
        const response = await fetch("/Retrobits/controller/cargarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'user=' + encodeURIComponent(data.user) + 
                  '&password=' + encodeURIComponent(data.password)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            window.location.href = "http://localhost/Retrobits/index.html";
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Datos de sesión incorrectos!"
              });
        }

    } catch (error) {
        console.error("Error: ", error);
    }
}