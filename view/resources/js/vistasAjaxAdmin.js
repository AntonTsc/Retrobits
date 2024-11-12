function cargarContenido(tab) {
    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();

    //configura una solicitud GET a la pagina panelAdmin---.php de forma asincrona
    //GET = método
    //panelAdmin${tab}.php = url a obtener
    //true = usar un proceso asincrono para la solicitud
    xhr.open("GET", `panelAdmin${tab}.php`, true);

    // Cuando la solicitud se complete, la función onload se ejecutará
    xhr.onload = function() {
        //si la conexion ha sido correcta/OK
        if (xhr.status === 200) {
            // Inserta el texto plano obtenido en el elemento con id "contenido"
            document.getElementById("contenido").innerHTML = xhr.responseText;
            // Actualizar las clases de pestañas
            document.querySelectorAll(".nav-link").forEach(pestana => {
                pestana.classList.remove("active");
            });
            document.getElementById(tab).classList.add("active");
        }
    };
    //Manda la solicitud
    xhr.send();

    //En este caso send() manda la solicitud que hemos configurado en el open()
    //si la solicitud llega a la página y esta devuelve OK (código 200), entrará en el if
    //Dentro del if, nos guardará en el elemento con el código "contenido" él .responseText
    //.responseText devuelve texto plano, en este caso nos devolverá la parte de html de la página solicitada
    //ya que el código php de la misma no es texto plano
    //y para finalizar actualizo el contenido de las clases de la pestaña para que se queden como "activas" y de la sensación de que se ha cambiado de tabulación
}

// Cargar la pestaña predeterminada al iniciar la página
window.onload = () =>{
    cargarContenido("Productos");
};