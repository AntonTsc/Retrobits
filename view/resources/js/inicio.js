//Slider
const swiper = new Swiper('.slider-wrapper', {
    loop: false,
    grabCursor: true,
    spaceBetween: 10,
    centeredSlides: false,
    slideShadows: true,
  
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
        slidesPerView: 2.5
      },
      768: {
        slidesPerView: 3.5
      },
      1024: {
        slidesPerView: 6.5
      }
    }
  });


// Función para obtener y mostrar todos los productos en una tabla
async function obtenerProductos() {
    try {
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        productos.sort(function(a, b){return b.descuento - a.descuento});
        console.log(productos);

        for (let i = 0; i < 12; i++) {
            generador(productos[i])
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
function generador(producto) {
    const button = document.createElement("button");
    button.classList = "card-item swiper-slide";
  
    const img = document.createElement("img");
    img.src = "https://www.chollogames.es/88016-large_default/famicom-mini-classic.jpg"
    img.alt = "...";

    const p = document.createElement("p");
    p.classList = "card-title fs-4"
    p.innerHTML = producto.nombre;
  
    button.appendChild(img);
    button.appendChild(p);
    document.getElementById("card-list").appendChild(button);
  }