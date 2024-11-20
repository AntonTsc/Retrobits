// Ojo del input contraseña para visualizarla
const togglePasswords = document.querySelectorAll('.bi-eye-slash');
const passwords = document.querySelectorAll('input[type="password"]');
const fl = document.getElementById('FL');
const fr = document.getElementById('FR');
const fm = document.getElementById('FM');
const fp = document.getElementById('FP');
const path = window.location.pathname;
const pagPerfil = path.split('/').pop();
const despleglable = document.getElementById("botonesUsuario");
let userSesion = "anonymous";
let cestaSesion = {};



async function configurarSesion(){
    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();
  
        if (sesion.status === 'OK') {
          userSesion = sesion.user.id;
          cestaComp();
          if (sesion.user.admin){
            botonesAdmin();
          }else{
            botonesUser();
          }
        } else {
            botonesAnon();
        }
    } catch (error) {
        console.error("Error: ", error);
    }
  }
  function obtenerCesta() {
    localStorage.getItem("cesta") != null &&
      (cestaSesion = JSON.parse(localStorage.getItem("cesta")));
    return cestaSesion;
  }
  function cestaComp(){
    if (obtenerCesta()[userSesion] == null) {
      cestaNumero.innerHTML = 0;
    } else {
      cestaNumero.innerHTML = obtenerCesta()[userSesion].length;
    }
  }

//Register
async function insertUsuario(){
    const data = {
        username: document.getElementById("floatingUser"),
        email: document.getElementById("floatingEmail"),
        password: document.getElementById("floatingPassword")
    }

    // Validación de los campos utilizando expresiones regulares
    // Username
    if(!/^[a-zA-Z0-9_]{4,20}$/.test(data.username.value)){
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

    // Email
    if(!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/.test(data.email.value)){
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

    // Password
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/.test(data.password.value)){
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
    if(!/^[a-zA-Z0-9_]{4,20}$/.test(data.username.value)){
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
          title: "El nombre de usuario debe tener entre 4 y 20 caracteres y solo  puede contener letras, números y guiones bajos"
        });
        data.username.style.borderColor = "red";

      return; // Detiene la ejecución si el username es inválido
    } else {
      data.username.style.borderColor = "green";
    }

    // Email
    if(!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/.test(data.email.value)){
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
        } else if(datos.status === 'ERROR'){
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
        } else{
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              Toast.fire({
                icon: "info",
                title: datos.message
              });
        }
        document.getElementById("floatingPassword").value="";

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
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\.]).{8,40}$/.test(passNew.value)) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timerProgressBar: true
        });
        Toast.fire({
          icon: "error",
          title: "La contraseña debe tener mínimo 8 caracteres,   incluyendo una mayúscula, una minúscula, un número y un   carácter especial."
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
            body: 'password=' + encodeURIComponent(passNew.value) +
                  '&oldPassword=' + encodeURIComponent(passOld.value)
        }); 

        const datos = await response.json();

        if (datos.status === 'OK') {
            document.getElementById("cerrarModal").click();
            passOld.value="";
            passNew.value="";
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
        } else if (datos.status === 'INCORRECT'){
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

async function tablaPedidosPerfil(){
  try{
      const response = await fetch("/Retrobits/controller/pedidos.php");
      const pedidos = await response.json();

      const tabla = document.getElementById("bodyTable");
      tabla.innerHTML = "";

      pedidos.forEach(pedido => {
          const fila = generadorFila(pedido);
          tabla.appendChild(fila);
      })

  } catch (error) {
      console.error("Error: ", error);
  }
}

function generadorFila(pedido){
  // Crear el elemento <tr>
  const fila = document.createElement("tr");

  // Iterar sobre las propiedades del pedido para agregar los <td>
  Object.values(pedido).forEach((valor, index) => {
      const contenido = document.createElement(index === 0 ? "th" : "td");
      contenido.textContent = valor; // Asignar el value de cada propiedad
      fila.appendChild(contenido);
  })

  return fila;
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

function botonesAdmin(){
    console.log("sesion Admin");

    document.getElementById("btnOprcionesPerfil").classList.add("bi-person-circle");
  
    const separador = document.createElement("div");
    separador.classList = "border"
  
    const li1 = document.createElement("li");
    const btnLogin = document.createElement("a");
    btnLogin.classList = "dropdown-item mt-1 mb-2";
    btnLogin.href = "perfil.html";
    btnLogin.innerHTML = "Ver perfil";
    li1.appendChild(btnLogin);
    
    const li2 = document.createElement("li");
    const btnPanelAdmin = document.createElement("a");
    btnPanelAdmin.classList = "d-flex justify-content-center btn btn-primary rounded-2 m-2";
    btnPanelAdmin.href = "panelAdmin.php";
    btnPanelAdmin.innerHTML = "Panel Admin";
    li2.appendChild(btnPanelAdmin);
  
    const li3 = document.createElement("li");
    const btnSignin = document.createElement("a");
    btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
    btnSignin.href = "../controller/logout.php";
    btnSignin.innerHTML = "Cerrar sesión";
    li3.appendChild(btnSignin);
  
    despleglable.insertBefore(li3, despleglable.firstChild);
    despleglable.insertBefore(separador, despleglable.firstChild);
    despleglable.insertBefore(li2, despleglable.firstChild);
    despleglable.insertBefore(li1, despleglable.firstChild);
  }
  
  function botonesUser(){
    document.getElementById("btnOprcionesPerfil").classList.add("bi-person-circle");
  
    const separador = document.createElement("div");
    separador.classList = "border"
  
    const li1 = document.createElement("li");
    const btnLogin = document.createElement("a");
    btnLogin.classList = "dropdown-item mt-1 mb-2";
    btnLogin.href = "perfil.html";
    btnLogin.innerHTML = "Ver perfil";
    li1.appendChild(btnLogin);
  
    const li2 = document.createElement("li");
    const btnSignin = document.createElement("a");
    btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
    btnSignin.href = "../controller/logout.php";
    btnSignin.innerHTML = "Cerrar sesión";
    li2.appendChild(btnSignin);
  
    despleglable.insertBefore(li2, despleglable.firstChild);
    despleglable.insertBefore(separador, despleglable.firstChild);
    despleglable.insertBefore(li1, despleglable.firstChild);
  }
  function botonesAnon(){
    console.log("sesion anonima");
  
    document.getElementById("btnOprcionesPerfil").classList.add("bi-person");

    const separador = document.createElement("div");
    separador.classList = "border"
  
    const li1 = document.createElement("li");
    const btnLogin = document.createElement("a");
    btnLogin.classList = "dropdown-item mt-1 mb-2";
    btnLogin.href = "login.html";
    btnLogin.innerHTML = "Iniciar sesión";
    li1.appendChild(btnLogin);
  
    const li2 = document.createElement("li");
    const btnSignin = document.createElement("a");
    btnSignin.classList = "dropdown-item mt-1 mb-2";
    btnSignin.href = "signin.html";
    btnSignin.innerHTML = "Registrarse";
    li2.appendChild(btnSignin);
  
    despleglable.insertBefore(li2, despleglable.firstChild);
    despleglable.insertBefore(li1, despleglable.firstChild);
  }

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
        modificarUsuario();
    });
}
if (fp){
    fp.addEventListener('submit', (e) => {
        e.preventDefault();
        modificarContrasena();
    })
}
window.onload = function () {
    configurarSesion();
    cestaComp();
    if(pagPerfil == "perfil.html") {
            comprobarSesion();
            tablaPedidosPerfil()
    }
  };