// Ojo del input contraseña para visualizarla
const togglePasswords = document.querySelectorAll('.bi-eye-slash');
const passwords = document.querySelectorAll('input[type="password"]');
const fl = document.getElementById('FL');
const fr = document.getElementById('FR');
const fm = document.getElementById('FM');
const fp = document.getElementById('FP');
const path = window.location.pathname;
const pagPerfil = path.split('/').pop();

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
            timerProgressBar: true
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
            timerProgressBar: true
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
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "error",
                title: datos.message
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
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "error",
                title: datos.message
              });
        }

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function modificarUsuario(){
    const data = {
        username: document.getElementById("floatingUsername"),
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

    // Validaciones
    if(!valUsername(data.username.value)){
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
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
            timerProgressBar: true
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

    try{
        const response = await fetch("/Retrobits/controller/modificarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=' + encodeURIComponent(data.username.value) + 
                  '&email=' + encodeURIComponent(data.email.value) + 
                  '&password=' + encodeURIComponent(data.password.value)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            comprobarSesion();

            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "success",
                title: datos.message
              });
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "warning",
                title: datos.message
              });
        }

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function modificarContrasena(){
    const passOld = document.getElementById("floatingPasswordOld");
    const passNew = document.getElementById("floatingPasswordNew");

    if (passNew.value === passOld.value) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timerProgressBar: true
          });
          Toast.fire({
            icon: "error",
            title: "La nueva contraseña no puede ser igual a la actual."
          });
          passNew.style.borderColor = "red";

        return;
    }

    // Password
    const valPassword = (password) => {
        return String(password).match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/
        );
    };

    if(!valPassword(passNew.value)){
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timerProgressBar: true
          });
          Toast.fire({
            icon: "error",
            title: "La contraseña debe tener mínimo 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial."
          });
          passNew.style.borderColor = "red";

        return; // Detiene la ejecución si la password es inválida
    }

    try{
        const response = await fetch("/Retrobits/controller/modificarContrasena.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'password=' + encodeURIComponent(passNew.value)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "success",
                title: datos.message
              });
        } 

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function comprobarSesion(){
    const userInput = document.getElementById("floatingUsername");
    const emailInput = document.getElementById("floatingEmail");

    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();
        
        if (sesion.status === 'OK') {
            userInput.value = sesion.user.username;
            emailInput.value = sesion.user.email;

            return true;
        } else {
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

togglePasswords.forEach((togglePassword, index) => {
    togglePassword.addEventListener('click', () => {
        const passwordInput = passwords[index];
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bi-eye');
    })
})

if (fl){
    fl.addEventListener('submit', (e) => {
        e.preventDefault(); 
        loginUsuario();
    });
}
if (fr){
    fr.addEventListener('submit', (e) => {
        e.preventDefault(); 
        insertUsuario();
    });
}
if (fm){
    fm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(comprobarSesion()){
            modificarUsuario();
        }
    });
}
if (fp){
    fp.addEventListener('submit', (e) => {
        e.preventDefault();
        modificarContrasena();
    })
}
if(pagPerfil == "perfil.html") {
    window.onload = () => {
        comprobarSesion();
    }
}