const driver = window.driver.js.driver;


function guiaDeUsuario(){
    const driverObjMain = driver({
        showProgress: true,
        progressText: "{{current}}/{{total}}",
        nextBtnText: "▶",
        prevBtnText: "◀",
        doneBtnText: "VALE",
        steps: [
            {
                popover: {
                    title: 'Bienvenido a la Guía de Usuario',
                    description: '<p>A lo largo de esta guía, se proporcionará una explicación sobre la navegacion en la pantalla <strong>inicial</strong>.</p><p><i>En cualquier momento, puedes cancelar la guía haciendo clic fuera del área o seleccionando la "X" ubicada en la esquina superior derecha.</i></p>',
                    side: "left", align: 'start'
                }
            },
            {
                popover: {
                    title: '¿Qué te encontrarás?',
                    description: `<p>Somos una pequeña tienda especializada en <strong>productos electrónicos retro y vintage</strong>. Aquí podrás encontrar una selección única de dispositivos clásicos que evocan nostalgia y autenticidad.</p><p>Además, también contamos con <strong>algunos productos actuales</strong> que complementan nuestra oferta, ofreciendo lo mejor de ambos mundos.</p>`,
                    side: "left", align: 'start'
                }
            },
            {
                element: "nav",
                popover: {
                    title: 'Barra de Navegación',
                    description: `<p>La <strong>barra de navegación</strong> te permite moverte de forma rápida y sencilla entre todas las páginas disponibles en nuestra tienda.</p><p>Utilízala para explorar nuestras diferentes secciones y descubrir todo lo que tenemos para ofrecerte.</p>`,
                    side: "bottom", align: 'center',
                }
            },
            {
                element: "#nav-toggle",
                popover: {
                    title: '¿Solo un Nombre?',
                    description: `<p>Esta sección del navegador no solo muestra el <strong>nombre de nuestra tienda</strong>, sino que también funciona como un <strong>desplegable</strong> que te permite acceder rápidamente a las distintas categorías de productos disponibles.</p>`,
                    side: "left", align: 'start',
                    onNextClick: () => {
                        if (!document.getElementById("enlaces").classList.contains("show")){
                            document.getElementById('nav-toggle').click();
                        }
                        driverObjMain.moveNext();
                    }
                }
            },
            {
                element: "#enlaces",
                popover: {
                    title: 'Nuestras Secciones',
                    description: `<p>Aquí encontrarás una lista de todas las sección disponibles en nuestra tienda. <strong>Haz clic en cualquiera de ellas</strong> para acceder rápidamente a los productos que más te interesen.</p>`,
                    side: "bottom", align: 'center',
                    onPrevClick: () => {
                        document.getElementById('nav-toggle').click();
                        driverObjMain.movePrevious();
                    },
                    onNextClick: () => {
                        document.getElementById('nav-toggle').click();
                        driverObjMain.moveNext();
                    }
                }
            },
            {
                element: "#nav",
                popover: {
                    title: 'El Buscador',
                    description: `<p>En la parte inicial de este buscador, encontrarás el botón <strong>"Home"</strong>. Este botón te llevará de regreso a la <strong>página principal</strong> desde cualquier sección en la que te encuentres.</p><p>Respecto al buscador en sí, simplemente ingresa lo que te interese buscar. Si tenemos productos que coincidan con tu búsqueda, estos aparecerán como opciones <strong>debajo del buscador</strong>, facilitando tu navegación.</p>`,
                    side: "bottom", align: 'center',
                    popoverClass: "guiaAncho",
                    onPrevClick: () => {
                        document.getElementById('nav-toggle').click();
                        driverObjMain.movePrevious();
                    }
                }
            },
            {
                element: "#perfil",
                popover: {
                    title: 'Perfil',
                    description: `Si este botón está iluminado y lo rodea un círculo significa que hay una sesión activa.<br><br>Al hacer clic en esta opción, se desplegarán opciones como <strong>ver tu perfil</strong> o <strong>cerrar sesión</strong>. Si no has iniciado sesión, este desplegable te ofrecerá las opciones de <strong>iniciar sesión</strong> o <strong>registrarte</strong>.</p>`,
                    side: "left", align: 'start'
                }
            },
            {
                element: "#bolsa",
                popover: {
                    title: 'Bolsa',
                    description: `<p>Muestra la cantidad de productos añadidos a tu cesta. Al hacer clic en ella, accederás a una página dedicada para gestionar los productos en la cesta.</p>`,
                    side: "left", align: 'start'
                }
            },
            {
                element: ".bannerInfo",
                popover: {
                    title: 'Compromiso de RetroBits',
                    description: `<p>Este es un pequeño <strong>banner informativo</strong> que refleja nuestro compromiso con la calidad y el servicio. Al hacer clic en él, podrás obtener más detalles.</p>`,
                    side: "bottom", align: 'center'
                }
            },
            {
                element: "#descuentos",
                popover: {
                    title: 'Nuestros Descuentos',
                    description: `<p>En esta sección del inicio, podrás ver una selección de los productos con los mayores descuentos disponibles en nuestra tienda. Ten en cuenta que no todos los productos están incluidos en esta lista. Si deseas ver todas las ofertas, haz clic en el botón <strong>"Ver todos"</strong>.</p>`,

                    side: "bottom", align: 'center'
                }
            },
            {
                element: ".tituloSecciones",
                popover: {
                    title: 'Algunos Productos por Sección',
                    description: `<p>Finalmente, en esta sección podrás ver una selección representativa de productos, organizados por categorías, correspondientes a cada una de las secciones disponibles en la tienda.</p>`,
                    side: "top", align: 'center'
                }
            },
        ],
    
        onDestroyStarted: () => {
            if (!driverObjMain.hasNextStep() || confirm("¿Quieres cancelar la guia de usuario?")) {
                driverObjMain.destroy();
            }
        }
    });
    driverObjMain.drive();
}