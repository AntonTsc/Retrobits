const despleglable = document.getElementById("botonesUsuario");
let userSesion = "anonymous";
let cestaSesion = {};


//Slider
  const swiperDescuentos = new Swiper('.slider-descuentos', {
    spaceBetween: 10,
    centeredSlides: false,
    
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true
    },
    
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

  const swiperConsolas = new Swiper('.slider-seccion', {
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
// Función para obtener y mostrar todos los productos en una tabla
async function obtenerProductos() {
    try {
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        console.log(productos);

        let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;
        for (let i = 0; i < productos.length; i++) {
          switch (productos[i].idSeccion) {
            case "1":
              count1 < 6 && generador(productos[i], "consolas");
              count1++;
              break;
            case "2":
              count2 < 6 && generador(productos[i], "computadoras");
              count2++;
              break;
            case "3":
              count3 < 6 && generador(productos[i], "camaras");
              count3++;
              break;
            case "4":
              count4 < 6 && generador(productos[i], "radios");
              count4++;
              break;
            case "5":
              count5 < 6 && generador(productos[i], "telefonos");
              count5++;
              break;
            case "6":
              count6 < 6 && generador(productos[i], "electrodomesticos");
              count6++;
              break;
          }
        }

        productos.sort(function(a, b){return b.descuento - a.descuento});
        for (let i = 0; i < 12; i++) {
            generador(productos[i], "descuentos")
        }
    } catch (error) {
        console.error('Error:', error);
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

//Genera cartas con los descuentos mas altos
function generador(producto, seccion) {
  const button = document.createElement("a");
  button.classList = "card-item bg-light swiper-slide border-0 btn rounded-1 shadow";
  
  const img = document.createElement("img");
  //img.src = `view/resources/images/img/${producto.nombre}.jpg`;
  img.src = `view/resources/images/img/Game Gear.jpg`;
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
    let cardList = document.getElementById(`card-list-${seccion}`);
    cardList.insertBefore(button, cardList.firstChild);
  }
  
function botonesAdmin(){
  console.log("sesion Admin");

  const separador = document.createElement("div");
  separador.classList = "border"

  const li1 = document.createElement("li");
  const btnLogin = document.createElement("a");
  btnLogin.classList = "dropdown-item mt-1 mb-2";
  btnLogin.href = "view/perfil.html";
  btnLogin.innerHTML = "Ver perfil";
  li1.appendChild(btnLogin);
  
  const li2 = document.createElement("li");
  const btnPanelAdmin = document.createElement("a");
  btnPanelAdmin.classList = "d-flex justify-content-center btn btn-primary rounded-2 m-2";
  btnPanelAdmin.href = "controller/panelAdmin.php";
  btnPanelAdmin.innerHTML = "Panel Admin";
  li2.appendChild(btnPanelAdmin);

  const li3 = document.createElement("li");
  const btnSignin = document.createElement("a");
  btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
  btnSignin.href = "controller/logout.php";
  btnSignin.innerHTML = "Cerrar sesión";
  li3.appendChild(btnSignin);

  despleglable.insertBefore(li3, despleglable.firstChild);
  despleglable.insertBefore(separador, despleglable.firstChild);
  despleglable.insertBefore(li2, despleglable.firstChild);
  despleglable.insertBefore(li1, despleglable.firstChild);
}

function botonesUser(){
  console.log("sesion iniciada");

  const separador = document.createElement("div");
  separador.classList = "border"

  const li1 = document.createElement("li");
  const btnLogin = document.createElement("a");
  btnLogin.classList = "dropdown-item mt-1 mb-2";
  btnLogin.href = "view/perfil.html";
  btnLogin.innerHTML = "Ver perfil";
  li1.appendChild(btnLogin);

  const li2 = document.createElement("li");
  const btnSignin = document.createElement("a");
  btnSignin.classList = "d-flex justify-content-center btn btn-danger rounded-2 mx-2 mt-2";
  btnSignin.href = "controller/logout.php";
  btnSignin.innerHTML = "Cerrar sesión";
  li2.appendChild(btnSignin);

  despleglable.insertBefore(li2, despleglable.firstChild);
  despleglable.insertBefore(separador, despleglable.firstChild);
  despleglable.insertBefore(li1, despleglable.firstChild);
}

function botonesAnon(){
  console.log("sesion anonima");

  const separador = document.createElement("div");
  separador.classList = "border"

  const li1 = document.createElement("li");
  const btnLogin = document.createElement("a");
  btnLogin.classList = "dropdown-item mt-1 mb-2";
  btnLogin.href = "view/login.html";
  btnLogin.innerHTML = "Iniciar sesión";
  li1.appendChild(btnLogin);

  const li2 = document.createElement("li");
  const btnSignin = document.createElement("a");
  btnSignin.classList = "dropdown-item mt-1 mb-2";
  btnSignin.href = "view/signin.html";
  btnSignin.innerHTML = "Registrarse";
  li2.appendChild(btnSignin);

  despleglable.insertBefore(li2, despleglable.firstChild);
  despleglable.insertBefore(li1, despleglable.firstChild);
}

// Ejecutar la función obtenerProductos cuando se cargue la página
window.onload = function () {
  comprobarSesion();
  obtenerProductos();
  cestaComp();
};