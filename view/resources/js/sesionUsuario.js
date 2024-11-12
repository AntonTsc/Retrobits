// Ojo del input contraseña para visualizarla
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#floatingPassword');
const fl = document.getElementById('FL');
const fr = document.getElementById('FR');


//Register
async function insertUsuario(){
    const data = {
        username: document.getElementById("floatingUser"),
        email: document.getElementById("floatingEmail"),
        password: document.getElementById("floatingPassword")
    }

    // Validación de los campos utilizando expresiones regulares
    // Username
    const valUsername = (username) => {
        return String(username).match(
            /^[a-zA-Z0-9_]{4,20}$/
        );
    };

    // Email
    const valEmail = (email) => {
        return String(email).toLocaleLowerCase().match(
            /^[\w-\.]+@[\w-]+.[\w-]{2,}$/
        );
    };

    // Password
    const valPassword = (password) => {
        return String(password).match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/
        );
    };

    // Validaciones
    if(!valUsername(data.username.value)){
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
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
            title: "El nombre de usuario debe tener entre 4 y 20 caracteres y solo puede contener letras, números y guiones bajos"
          });
          data.username.style.borderColor = "red";

        return; // Detiene la ejecución si el username es inválido
    } else {
        data.username.style.borderColor = "green";
    }

    if(!valEmail(data.email.value)){
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
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
            title: "Por favor ingrese un correo electrónico válido"
          });
          data.email.style.borderColor = "red";

        return; // Detiene la ejecución si el email es inválido
    } else {
        data.email.style.borderColor = "green";
    }

    if(!valPassword(data.password.value)){
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
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
            title: "La contraseña debe tener mínimo 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial"
          });
          data.password.style.borderColor = "red";

        return; // Detiene la ejecución si la password es inválida
    }

    try{
        const response = await fetch("/Retrobits/controller/registrarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // Usamos encodeURIComponent para asegurar que los datos se codifiquen correctamente
            // y evitar problemas con caracteres especiales como '&', '=', o espacios en blanco
            body: 'username=' + encodeURIComponent(data.username.value) + 
                  '&email=' + encodeURIComponent(data.email.value) + 
                  '&password=' + encodeURIComponent(data.password.value)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            window.location.href = "login.html";
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
            window.location.href = "../index.html";
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

togglePassword.addEventListener('click', () => {
    const type = password
        .getAttribute('type') === 'password' ?
        'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye');
});


if (fl){
    document.getElementById('FL').addEventListener('submit', (e) => {
        e.preventDefault(); 
        loginUsuario();
    });
}
if (fr){
    document.getElementById('FR').addEventListener('submit', (e) => {
        e.preventDefault(); 
        insertUsuario();
    });
}