const despleglable = document.getElementById("botonesUsuario");
const cestaNumero = document.getElementById("cestaNumero");
let userSesion = "anonymous";
let cestaSesion = {};
let producto = {};

const swiperConsolas = new Swiper('.slider-wrapper', {
    spaceBetween: 10,
    centeredSlides: false,
    
    // Pagination bullets
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 2.5,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 5.5
      }
    }
  });

async function comprobarSesion(){
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

  function guardarProductoCesta(){
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

  async function obtenerProducto() {
    let prodId = window.location.search.substring(1);
    try {
      const response = await fetch("/Retrobits/controller/productos.php", {
        method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + prodId
    });
        producto = await response.json();
        if (producto) {
            let imagen = document.getElementById('imgProducto')
            let dir = "resources/images/productos/";
            imagen.src = `${dir}${producto.id}.jpg` ;
            imagen.onerror = function() {
              switch (producto.idSeccion) {
                case 1:
                  imagen.src = `${dir}defaultConsolas.jpg`;
                  break;
                case 2:
                  imagen.src = `${dir}defaultComputadoras.jpg`;
                  break;
                case 3:
                  imagen.src = `${dir}defaultCamaras.jpg`;
                  break;
                case 4:
                  imagen.src = `${dir}defaultRadios.jpg`;
                  break;
                case 5:
                  imagen.src = `${dir}defaultTelefonos.jpg`;
                  break;
                case 6:
                  imagen.src = `${dir}defaultElectrodomesticos.jpg`;
                  break;
                default:
                  imagen.src = `${dir}default.jpg`;
                  break;
              }
            };
            document.getElementById('nombreProducto').innerHTML = producto.nombre;
            document.getElementById('descripccionProducto').innerHTML = producto.descripcion;
            let precio = document.getElementById('precioProducto')
            if (producto.descuento > 0){
                const spanRebajado = document.createElement("span");
                spanRebajado.innerHTML = `${(producto.precio*(1 - (producto.descuento/100))).toFixed(2)}€ `;
                
                const spanNoRebajado = document.createElement("span");
                spanNoRebajado.classList = "text-decoration-line-through text-danger text-opacity-75"
                spanNoRebajado.innerHTML = `${producto.precio}€`;
                
                precio.appendChild(spanRebajado);
                precio.appendChild(spanNoRebajado);
            }else{
                const spanPrecio = document.createElement("span");
                spanPrecio.innerHTML = `${producto.precio}€ `;
                precio.appendChild(spanPrecio);
            }
            obtenerProductosRelacionados();
        }else{
            
        }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function obtenerProductosRelacionados() {
    try {
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        for (let i = 0; i < productos.length; i++) {
            if(productos[i].idSeccion == producto.idSeccion && productos[i].id != producto.id){
                generador(productos[i])
              }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

 function generador(producto) {
    const button = document.createElement("a");
    button.classList = "card-item bg-light swiper-slide border-0 btn rounded-1 shadow";
    
    const img = document.createElement("img");
    let dir = "resources/images/productos/";
    img.src = `${dir}${producto.id}.jpg` ;
    img.onerror = function() {
      switch (producto.idSeccion) {
        case "1":
          img.src = `${dir}defaultConsolas.jpg`;
          break;
        case "2":
          img.src = `${dir}defaultComputadoras.jpg`;
          break;
        case "3":
          img.src = `${dir}defaultCamaras.jpg`;
          break;
        case "4":
          img.src = `${dir}defaultRadios.jpg`;
          break;
        case "5":
          img.src = `${dir}defaultTelefonos.jpg`;
          break;
        case "6":
          img.src = `${dir}defaultElectrodomesticos.jpg`;
          break;
        default:
          img.src = `${dir}default.jpg`;
          break;
      }
    };
    img.alt = "...";
    img.classList = "rounded-top-1";
    
    const pNombre = document.createElement("p");
    pNombre.classList = "text-start card-title text-dark fs-5 p-3 pt-2 pb-0 fw-bold text-truncate"
      pNombre.innerHTML = producto.nombre;
  
      const pPrecio = document.createElement("p");
      pPrecio.classList = "text-start card-title text-dark fs-5 p-3 pt-0 text-truncate"
      
      if(producto.descuento > 0){
        const spanRebajado = document.createElement("span");
        spanRebajado.classList = "fs-5"
        spanRebajado.innerHTML = `${(producto.precio*(1 - (producto.descuento/100))).toFixed(2)}€ `;
        
        const spanNoRebajado = document.createElement("span");
        spanNoRebajado.classList = "text-decoration-line-through text-danger text-opacity-75 fs-6"
        spanNoRebajado.innerHTML = `${producto.precio}€`;
        
        pPrecio.appendChild(spanRebajado);
        pPrecio.appendChild(spanNoRebajado);
  
        const span = document.createElement("span");
        span.classList = "position-absolute top-0 end-0 badge rounded-0 bg-danger rounded-start-0 rounded-top-1"
        span.innerHTML = `-${producto.descuento}%`;
        
        button.appendChild(span);
      }else{
        const spanPrecio = document.createElement("span");
        spanPrecio.classList = "fs-5"
        spanPrecio.innerHTML = `${producto.precio}€ `;
        pPrecio.appendChild(spanPrecio);
      }
      
      
      button.appendChild(img);
      button.appendChild(pNombre);
      button.appendChild(pPrecio);
      button.onclick = () => {
        window.location.href = "?" + producto.id;
      };
      let cardList = document.getElementById(`card-list`);
      cardList.appendChild(button);
     }

  function botonesAdmin(){

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

window.onload = () => {
    comprobarSesion();
    cestaComp();
    obtenerProducto();
  };