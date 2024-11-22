const searchInput = document.getElementById("buscador");
const suggestionsContainer = document.getElementById("suggestionsContainer");
const buttonBuscar = document.getElementById("botonBuscar");
const suggestions = [];
const overlay = document.getElementById("overlay");

obtenerProductosBusqueda();
async function obtenerProductosBusqueda() {
    try {
      const response = await fetch("/Retrobits/controller/productos.php");
      const productos = await response.json();

      productos.forEach(prod => {
        suggestions.push(prod);
    })
    } catch (error) {
        console.error("Error:", error);
    }

      //generadorProductoBarraBusqueda(productos[i]);
  }

  function buscar(){
    console.log(`buscare productos relacionados con '${searchInput.value}'`)
  }

// Filtrar sugerencias y mostrarlas
searchInput.addEventListener("keyup", (e) => {

    if (e.key === "Enter") {  // Verificamos si la tecla presionada es "Enter"
        e.preventDefault();   // Evitamos el comportamiento predeterminado de Enter
        buttonBuscar.click();           // Ejecutamos un clic en el botón
        return;
    }

    
    const query = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = ""; // Limpiar sugerencias anteriores

    
    if (query) {
        
        // Filtrar las sugerencias según la consulta del usuario
        //normalize("NFD"): Convierte el texto en una forma descompuesta donde las tildes se separan del carácter base. Por ejemplo, "á" se convierte en "a" seguido de un carácter de tilde separado.
        //replace(/[\u0300-\u036f]/g, ""): Elimina los caracteres de tilde y diacríticos después de la normalización, dejando solo las letras base (sin acentos).
        const filteredSuggestions = suggestions.filter(producto => 
            producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
                query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        );

        if (query.length > 0) {
            overlay.style.display = "block"; // Mostrar overlay
            document.body.style.overflow = "hidden"; // Bloquear el desplazamiento
        } else {
            overlay.style.display = "none"; // Ocultar overlay
            document.body.style.overflow = "auto"; // Bloquear el desplazamiento
        }

        // Mostrar sugerencias filtradas
        filteredSuggestions.forEach(producto => {
            const suggestionElement = document.createElement("div");
            suggestionElement.classList = "d-flex";
            suggestionElement.style.height = "60px";

            const imagen = document.createElement("img");
            let dir = "/retrobits/view/resources/images/productos/";
            imagen.src = `${dir}${producto.id}.jpg` ;
            imagen.onerror = function() {
                
                switch (producto.idSeccion) {
                  case "1":
                    imagen.src = `${dir}defaultConsolas.jpg`;
                    break;
                  case "2":
                    imagen.src = `${dir}defaultComputadoras.jpg`;
                    break;
                  case "3":
                    imagen.src = `${dir}defaultCamaras.jpg`;
                    break;
                  case "4":
                    imagen.src = `${dir}defaultRadios.jpg`;
                    break;
                  case "5":
                    imagen.src = `${dir}defaultTelefonos.jpg`;
                    break;
                  case "6":
                    imagen.src = `${dir}defaultElectrodomesticos.jpg`;
                    break;
                  default:
                    imagen.src = `${dir}default.jpg`;
                    break;
                }
              };
            //imagen.style.height = "100%"
            imagen.classList = "h-100 rounded-1"

            const divInfo = document.createElement("div");
            const infoName = document.createElement("h6")
            infoName.textContent = producto.nombre;

            divInfo.appendChild(infoName);

            if (producto.descuento > 0) {
                const spanRebajado = document.createElement("span");
                spanRebajado.innerHTML = `${(producto.precio *(1 - producto.descuento / 100)).toFixed(2)}€`;
                spanRebajado.classList = "me-1";

                const spanNoRebajado = document.createElement("span");
                spanNoRebajado.classList ="text-decoration-line-through text-dark text-opacity-75 me-1";
                spanNoRebajado.innerHTML = `${producto.precio}€`;
          
                const span = document.createElement("span");
                span.classList = "text-white bg-danger px-1";
                span.innerHTML = `-${producto.descuento}%`;

                divInfo.appendChild(spanRebajado);
                divInfo.appendChild(spanNoRebajado);
                divInfo.appendChild(span);

              } else {
                const infoPrice = document.createElement("span");
                infoPrice.textContent = `${producto.precio}€`;
                divInfo.appendChild(infoPrice);
              }

            suggestionElement.appendChild(imagen);
            suggestionElement.appendChild(divInfo);

            // Establecer el comportamiento de clic en cada sugerencia
            suggestionElement.onclick = () => {
                window.location.href = "/retrobits/view/unProducto.html?" + producto.id;
            };

            suggestionsContainer.appendChild(suggestionElement);
        });

        suggestionsContainer.style.display = "block"; // Mostrar el contenedor de sugerencias
    } else {
        suggestionsContainer.style.display = "none"; // Ocultar si no hay texto
    }
});

// Cerrar sugerencias y overlay si se hace clic fuera
overlay.addEventListener("click", function() {
    overlay.style.display = "";
    document.body.style.overflow = "auto";
});

// Ocultar sugerencias cuando se hace clic fuera del input
document.addEventListener("click", function(e) {
    if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
        suggestionsContainer.style.display = "none";
    }
});