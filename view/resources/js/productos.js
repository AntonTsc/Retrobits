//* GLOBALES =========================================================
  const despleglable = document.getElementById("botonesUsuario");
  const cestaNumero = document.getElementById("cestaNumero");
  const cardList = document.getElementById(`listaCartas`);
  const collapseSecciones = document.getElementById(`secciones`);
  let sidebarVisible = false; 
    // GUARDAR SESION EN LA CESTA
  let userSesion = "anonymous";
  let cestaSesion = {};

//* HELPERS ==========================================================
  function filtrar() {
    let checkBoxes = collapseSecciones.querySelectorAll("input");
    let filtro = {
      minPrecio: parseInt(document.getElementById("minPrecio").value),
      maxPrecio: parseInt(document.getElementById("maxPrecio").value),
      secciones: [],
      rebajado: document.querySelector("#checkboxRebajado").checked
    };
    checkBoxes.forEach((element) => {
      element.checked && filtro.secciones.push(element.value);
    });

    if (!filtro.minPrecio && !filtro.maxPrecio && filtro.secciones.length == 0 && !filtro.rebajado) {
      obtenerProductos();
    }else{
      obtenerProductos(filtro);
    }
    mostrarFiltros();
  }
  function limpiarFiltro() {
    let checkBoxes = collapseSecciones.querySelectorAll("input");
    checkBoxes.forEach((element) => {
      element.checked = false;
    });

    document.getElementById("maxPrecio").value = "";
    document.getElementById("minPrecio").value = "";
    document.querySelector("#checkboxRebajado").checked = false;
  }

//* FUNCIONES =========================================================
  async function comprobarSesion(){
    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();

        if (sesion.status === 'OK') {
          userSesion = sesion.user.username;
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
  function guardarProductoCesta(producto) {
    let cesta = [];

    if (obtenerCesta()[userSesion] == null) {
      cestaSesion[userSesion] = [];
      cesta = cestaSesion[userSesion];
    } else {
      cesta = obtenerCesta()[userSesion];
    }

    let repetido = false;

    if (cesta.length > 0) {
      for (let i = 0; i < cesta.length; i++) {
        if (cesta[i].id == producto.id) {
          cesta[i].cantidad++;
          repetido = true;
        } else {
          producto.cantidad = 1;
        }
      }
    } else {
      producto.cantidad = 1;
    }

    !repetido && cesta.push(producto);

    cestaSesion[userSesion].push = cesta;

    localStorage.setItem("cesta", JSON.stringify(cestaSesion));
    cestaNumero.innerHTML = obtenerCesta()[userSesion].length;

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      title: `Has guardado ${producto.nombre} en la cesta`
    });
  }
  async function obtenerProductos(filtro) {
    try {
      const response = await fetch("/Retrobits/controller/productos.php");
      const productos = await response.json();

      cardList.innerHTML = "";
      if (filtro != null) {
        for (let i = 0; i < productos.length; i++) {
          if (productos[i].deleted == 0){
            let coincide = true;
            if(filtro.secciones.length != 0 && !filtro.secciones.includes(productos[i].idSeccion)){
              coincide = false;
            }
  
            let precio = productos[i].precio;
            if(productos[i].descuento > 0){
              precio = (precio * (1 - productos[i].descuento / 100)).toFixed(2);
            }
  
            if (filtro.minPrecio && precio < filtro.minPrecio) {
              coincide = false;
            }
            if (filtro.maxPrecio && precio > filtro.maxPrecio) {
              coincide = false;
            }
            if (filtro.rebajado && productos[i].descuento == 0) {
              coincide = false;
            }
            coincide && generadorProducto(productos[i]);
          }
        }
      } else {
        for (let i = 0; i < productos.length; i++) {
          if (productos[i].deleted == 0){
            generadorProducto(productos[i]);
          }
        }
      }

      !cardList.hasChildNodes() && noProductos();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function obtenerSecciones() {
    try {
      const response = await fetch("/Retrobits/controller/secciones.php");
      const secciones = await response.json();

      for (let i = 0; i < secciones.length; i++) {
        generadorSeccion(secciones[i]);
      }
      comprobarFiltro()
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function comprobarFiltro(){
    const queryString = window.location.search.substring(1);
    if (queryString == "0"){
      document.querySelector("#checkboxRebajado").checked = true;
      filtrar();
      return;
    }
    let checkBoxes = collapseSecciones.querySelectorAll("input");
    checkBoxes.forEach((element) => {
      if (element.value == queryString){
        element.checked = true;
        filtrar();
        return;
      }
    });
  }

// Controla el estado de la sidebar
  function mostrarFiltros() {
    const sidebar = document.querySelector(".sidebar");

    // Verificamos si estamos dentro del rango del media query
    if (window.matchMedia("(max-width: 992px)").matches) {
      // Alternamos el estado de la sidebar solo si el tamaño de la pantalla es 992px o menor
      if (sidebarVisible) {
        sidebar.style.transform = "translateX(-100%)"; // Ocultar la sidebar
        document.body.style.overflow = "auto"; // Restaurar el desplazamiento
      } else {
        sidebar.style.transform = "translateX(0)"; // Mostrar la sidebar
        document.body.style.overflow = "hidden"; // Bloquear el desplazamiento
      }
      sidebarVisible = !sidebarVisible;
    }
  }
  // Función que resetea el estado de la sidebar cuando la pantalla cambia de tamaño
  function checkScreenSize() {
    const sidebar = document.querySelector(".sidebar");

    // Si la pantalla es más grande de 992px, la sidebar debe estar visible
    if (window.matchMedia("(min-width: 993px)").matches) {
      sidebar.style.transform = ""; // Aseguramos que esté visible
      sidebarVisible = false; // Resetear el estado de visibilidad
      document.body.style.overflow = "auto"; // Aseguramos que el desplazamiento esté habilitado
    }
  }

//* MANIPULACIONES DE DOM =============================================
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
  console.log("sesion iniciada");

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
  function generadorProducto(producto) {
    const div1 = document.createElement("div");
    div1.classList = "col mb-2";

    const div2 = document.createElement("a");
    div2.classList = "card border-0 btn rounded-1 shadow p-0";

    const contenido = document.createElement("div");
    contenido.classList = "btn text-start p-0";

    const div3 = document.createElement("div");
    div3.classList = "position-relative";

    const imagen = document.createElement("img");
    imagen.src = `resources/images/productos/${producto.id}.jpg`;
    imagen.onerror = function() {
      imagen.src = "resources/images/productos/default.jpg"; // Ruta a la imagen predeterminada
    };
    imagen.classList = "card-img-top";
    imagen.alt = "...";

    const linkCarrito = document.createElement("a");
    linkCarrito.onclick = () => {
      guardarProductoCesta(producto);
    };
    linkCarrito.classList = "position-absolute end-0 bottom-0 d-none bi bi-bag-plus-fill fs-4";

    div3.appendChild(imagen);
    div3.appendChild(linkCarrito);

    const div4 = document.createElement("div");
    div4.classList = "card-body p-2 pb-0";

    const titulo = document.createElement("h6");
    titulo.classList = "card-title fw-bold text-truncate";
    titulo.innerHTML = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList = "card-text mb-0";
    descripcion.title = producto.descripcion;
    descripcion.innerHTML = `${producto.descripcion + "."}`;

    div4.appendChild(titulo);
    div4.appendChild(descripcion);

    if (producto.descuento > 0) {
      const spanRebajado = document.createElement("span");
      spanRebajado.innerHTML = `${(
        producto.precio *
        (1 - producto.descuento / 100)
      ).toFixed(2)}€`;
      spanRebajado.classList = "me-1";

      const spanNoRebajado = document.createElement("span");
      spanNoRebajado.classList = "text-decoration-line-through text-danger text-opacity-75";
      spanNoRebajado.innerHTML = `${producto.precio}€`;

      div4.appendChild(spanRebajado);
      div4.appendChild(spanNoRebajado);

      const span = document.createElement("span");
      span.classList = "text-white position-absolute top-0 end-0 rounded-0 px-1 bg-danger rounded-start-0 rounded-top-1";
      span.innerHTML = `-${producto.descuento}%`;

      div3.appendChild(span);
    } else {
      const spanPrecio = document.createElement("span");
      spanPrecio.innerHTML = `${producto.precio}€ `;
      div4.appendChild(spanPrecio);
    }

    contenido.appendChild(div3);
    contenido.appendChild(div4);

    div2.appendChild(contenido);
    div1.appendChild(div2);

    cardList.appendChild(div1);
  }
  function noProductos() {
    const label = document.createElement("label");
    label.classList = "noProductos";
    label.innerHTML =
      "Vaya...<br>Parece que no se ha encontrado ningun producto.<br>:(";

    cardList.appendChild(label);
  }
  function generadorSeccion(seccion) {
    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.classList = "form-check-input checkSeccion";
    inputCheck.id = `checkbox${seccion.id}`;
    inputCheck.value = seccion.id;

    const labelCheck = document.createElement("label");
    labelCheck.classList = "form-check-label ps-1 labelSeccion";
    labelCheck.htmlFor = `checkbox${seccion.id}`;
    labelCheck.innerHTML = seccion.nombre;

    const div = document.createElement("div");
    div.classList = "d-flex";

    div.appendChild(inputCheck);
    div.appendChild(labelCheck);

    collapseSecciones.appendChild(div);
  }

//* LISTENERS =========================================================
  // Detectamos cuando cambia el tamaño de la pantalla
  window.addEventListener("resize", checkScreenSize);

//* ONLOAD ============================================================
  window.onload = () => {
    comprobarSesion();
    obtenerProductos();
    obtenerSecciones();
    checkScreenSize();
    mostrarFiltros();
    cestaComp();
  };
