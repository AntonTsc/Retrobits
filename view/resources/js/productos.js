// Ejecutar cuando se cargue la página
const cestaNumero = document.getElementById("cestaNumero");
const cardList = document.getElementById(`listaCartas`);
window.onload = function () {
  obtenerProductos();
  obtenerSecciones();

  cestaNumero.innerHTML = obtenerCesta().length;
};

function obtenerCesta(){
  let cesta = [];

  localStorage.getItem("cesta") != null &&
    (cesta = JSON.parse(localStorage.getItem("cesta")));
  return cesta;
}

function guardarProductoCesta(producto) {
  let cesta = obtenerCesta();

  let repetido = false;

  if (cesta.length > 0) {
    for (let i = 0; i < cesta.length; i++) {
      if (cesta[i].id == producto.id) {
        cesta[i].cantidad++;
        repetido = true;
      }else{
        producto.cantidad = 1;
      }
    }
  }else{
    producto.cantidad = 1;
  }

  !repetido && cesta.push(producto);

  localStorage.setItem("cesta", JSON.stringify(cesta));
  cestaNumero.innerHTML = obtenerCesta().length;
}

async function obtenerProductos(filtro) {
    try {
        const response = await fetch('/Retrobits/controller/productos.php');
        const productos = await response.json();
        console.log(productos);

        cardList.innerHTML = "";

        for (let i = 0; i < productos.length; i++){
          if (filtro != null){
            productos[i].idSeccion == filtro && generadorProducto(productos[i]);
          }else{
            generadorProducto(productos[i]);
          }
        }

        !cardList.hasChildNodes() && noProductos();

        

    } catch (error) {
        console.error('Error:', error);
    }
}

async function obtenerSecciones() {
    try {
        const response = await fetch('/Retrobits/controller/secciones.php');
        const secciones = await response.json();
        console.log(secciones);

        for (let i = 0; i < secciones.length; i++){
            generadorSeccion(secciones[i]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//Genera cartas con los descuentos mas altos
function generadorProducto(producto) {

    const div1 = document.createElement("div");
    div1.classList = "col mb-2";
    
    const div2 = document.createElement("div");
    div2.classList = "card rounded-0";

    const buttonCard = document.createElement("button");
    buttonCard.classList = "btn text-start p-0";

    const div3 = document.createElement("div");
    div3.classList = "position-relative";
    
    const imagen = document.createElement("img");
    imagen.src = "resources/images/img/Game Gear.jpg";
    imagen.classList = "card-img-top";
    imagen.alt = "..."

    const linkCarrito = document.createElement("a");
    linkCarrito.onclick = () => {
      guardarProductoCesta(producto);
    }
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

    if(producto.descuento > 0){
        const spanRebajado = document.createElement("span");
        spanRebajado.innerHTML = `${(producto.precio*(1 - (producto.descuento/100))).toFixed(2)}€`;
        spanRebajado.classList = "me-1";

        const spanNoRebajado = document.createElement("span");
        spanNoRebajado.classList = "text-decoration-line-through text-dark text-opacity-75"
        spanNoRebajado.innerHTML = `${producto.precio}€`;

        div4.appendChild(spanRebajado);
        div4.appendChild(spanNoRebajado);

        const span = document.createElement("span");
        span.classList = "position-absolute top-0 end-0 rounded-0 px-1 bg-danger"
        span.innerHTML = `-${producto.descuento}%`;

        div3.appendChild(span);
    }else{
        const spanPrecio = document.createElement("span");
        spanPrecio.innerHTML = `${producto.precio}€ `;
        div4.appendChild(spanPrecio);
    }

    buttonCard.appendChild(div3);
    buttonCard.appendChild(div4);

    div2.appendChild(buttonCard);
    div1.appendChild(div2);

    cardList.appendChild(div1);
  }

function noProductos() {

  console.log("noPorudctos");

  const label = document.createElement("label");
  label.classList = "noProductos";
  label.innerHTML = "Vaya...<br>Parece que no se ha encontrado ningun producto.<br>:(";

  cardList.appendChild(label);

}


  // FILTROS //

const collapseSecciones = document.getElementById(`secciones`);

function generadorSeccion(seccion) {

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.classList = "form-check-input checkSeccion"
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

function limpiarFiltro(){

  let chekBoxes = collapseSecciones.querySelectorAll("input")

  chekBoxes.forEach(element => {
    element.checked = false
  });
}

let sidebarVisible = false;  // Controla el estado de la sidebar

function mostrarFiltros() {
  const sidebar = document.querySelector(".sidebar");
  
  // Verificamos si estamos dentro del rango del media query
  if (window.matchMedia("(max-width: 992px)").matches) {
    // Alternamos el estado de la sidebar solo si el tamaño de la pantalla es 992px o menor
    if (sidebarVisible) {
      sidebar.style.transform = "translateX(-100%)";  // Ocultar la sidebar
      document.body.style.overflow = "auto";  // Restaurar el desplazamiento
    } else {
      sidebar.style.transform = "translateX(0)";  // Mostrar la sidebar
      document.body.style.overflow = "hidden";  // Bloquear el desplazamiento
    }
    sidebarVisible = !sidebarVisible;
  }
}
// Función que resetea el estado de la sidebar cuando la pantalla cambia de tamaño
function checkScreenSize() {
  const sidebar = document.querySelector(".sidebar");

  // Si la pantalla es más grande de 992px, la sidebar debe estar visible
  if (window.matchMedia("(min-width: 993px)").matches) {
    sidebar.style.transform = "";  // Aseguramos que esté visible
    sidebarVisible = false;  // Resetear el estado de visibilidad
    document.body.style.overflow = "auto";  // Aseguramos que el desplazamiento esté habilitado
  }
}

// Detectamos cuando cambia el tamaño de la pantalla
window.addEventListener('resize', checkScreenSize);

// Llamamos a checkScreenSize() cuando la página cargue
checkScreenSize();

