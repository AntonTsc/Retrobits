
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
        slidesPerView: 1,
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
        slidesPerView: 1,
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

// Ejecutar la función obtenerProductos cuando se cargue la página
window.onload = function () {
    obtenerProductos();
};

//Genera cartas con los descuentos mas altos
function generador(producto, seccion) {
    const button = document.createElement("button");
    button.classList = "card-item swiper-slide btn rounded-0";
  
    const img = document.createElement("img");
    img.src = `view/resources/images/img/${producto.nombre}.jpg`;
    img.alt = "...";

    const pNombre = document.createElement("p");
    pNombre.classList = "text-start card-title text-dark fs-5 px-1"
    pNombre.innerHTML = producto.nombre;

    const pPrecio = document.createElement("p");
    pPrecio.classList = "text-start card-title text-dark fs-5 px-1"

    if(producto.descuento > 0){
      const spanRebajado = document.createElement("span");
      spanRebajado.classList = "fs-5"
      spanRebajado.innerHTML = `${(producto.precio*(1 - (producto.descuento/100))).toFixed(2)}€ `;
  
      const spanNoRebajado = document.createElement("span");
      spanNoRebajado.classList = "text-decoration-line-through text-dark text-opacity-75 fs-6"
      spanNoRebajado.innerHTML = `${producto.precio}€`;
  
      pPrecio.appendChild(spanRebajado);
      pPrecio.appendChild(spanNoRebajado);

      const span = document.createElement("span");
      span.classList = "position-absolute top-0 end-0 badge rounded-0 bg-danger"
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
  console.log(comprobarSesion());
  async function comprobarSesion(){
    try{
        const response = await fetch("/Retrobits/controller/sesionComp.php");
        const sesion = await response.json();
  
        if (sesion.status === 'OK') {
            return sesion.user;
        } else {
            return sesion.status;
        }
    } catch (error) {
        console.error("Error: ", error);
    }
  }
