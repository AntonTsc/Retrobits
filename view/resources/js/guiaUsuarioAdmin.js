const driver = window.driver.js.driver;

function guiaDeUsuario(){
    const tab = document.querySelector('#headerLinks .nav-item .active').id;
    let linea1 = "";
    switch (tab) {
        case "Productos":
            linea1 = document.querySelector('#cuerpoTabla tr');
            const driverObjProductos = driver({
                showProgress: true,
                progressText: "{{current}}/{{total}}",
                nextBtnText: "▶",
                prevBtnText: "◀",
                doneBtnText: "VALE",
                steps: [
                    { 
                        popover: {
                            title: 'Cosas que Debes Saber Antes de Comenzar',
                            description: `<p>Esta aplicación web está optimizada para su uso en ordenadores. Si bien es posible realizar acciones desde otros dispositivos, algunas notificaciones pueden no mostrarse correctamente y ciertos elementos de diseño pueden no funcionar como se espera.</p>
                            <p>La página mantiene una <strong>conexión constante con la base de datos</strong> y puede ser manejada desde varios dispositivos al mismo tiempo.</p>`,
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#auto',
                        popover: {
                            title: 'Modo de Actualización',
                            description: `<p>Configura cómo deseas que se gestionen las actualizaciones de datos:</p>
                            <ul>
                                <li><strong>Actualización automática:</strong> Los datos se actualizan de forma continua sin intervención manual.</li>
                                <li><strong>Notificaciones de cambios:</strong> Recibirás un aviso cada vez que se detecten cambios en la base de datos, permitiéndote decidir cuándo actualizar.</li>
                            </ul>
                            <p><strong>Importante:</strong> Si la actualización automática está activa y estás editando una fila o añadiendo un nuevo dato, la configuración se cerrará automáticamente para priorizar la actualización de datos. Se recomienda desactivar esta opción temporalmente al realizar cambios para evitar la pérdida de información.</p>`,
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        popover: {
                            title: 'Acceso Seguro al Panel Administrativo',
                            description: `<p>El acceso al <strong>panel administrativo</strong> está diseñado para garantizar la <strong>seguridad de la información</strong> y la privacidad de los datos gestionados. Solo los usuarios con permisos de administrador tienen acceso autorizado.</p><p>En caso de que un administrador cierre sesión desde otra pestaña dentro del mismo navegador, el sistema detectará automáticamente este cambio y cerrará el acceso al panel administrativo de manera inmediata.</p>
                            <div style="padding: 10px; border: 2px solid #cc0000; background-color: #ffe5e5; margin-top: 15px; border-radius: 20px;">
                            <p style="font-size: 1.2em; color: #cc0000;"><strong>⚠ Importante:</strong></p>
                            <p> En caso de rechazar los cambios detectados en modo manual, la página <strong>no volverá a contactar con la base de datos</strong> hasta que lo hagas manualmente.</p>
                            <p>Esto implica que el <strong>sistema de seguridad</strong> que cierra sesiones automáticamente no funcionará en la pestaña actual.</p>
                            </div>`,
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#headerLinks',
                        popover: {
                            title: 'Navegador',
                            description: '<p>El navegador te permite <strong>volver al inicio</strong> de la tienda o <strong>cambiar entre las pestañas</strong> de gestión disponibles.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#Productos',
                        popover: {
                            title: 'Gestión de Productos',
                            description: '<p>En esta sección puedes explorar <strong>diversas opciones</strong> para interactuar con los datos de los productos, como editarlos, eliminarlos o añadir nuevos.</p>',
                            side: "top", align: 'start'
                        }
                    },
                    { 
                        element: '.buscador',
                        popover: {
                            title: 'Buscador',
                            description: '<p>Esta herramienta permite realizar <strong>búsquedas específicas</strong> basadas en el texto ingresado y el criterio seleccionado.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#buscador',
                        popover: {
                            title: 'Búsqueda Avanzada',
                            description: `<p>El buscador permite realizar <strong>consultas avanzadas</strong> utilizando operadores de comparación, siempre que el índice seleccionado sea <strong>precio</strong>, <strong>stock</strong> o <strong>descuento</strong>.</p>
                            <p>Para utilizar estas opciones, debes incluir el operador correspondiente delante del número:</p>
                            <ul>
                                <li><strong>Menor que</strong>: Usa el operador "<" antes del número. Por ejemplo, para buscar resultados menores o iguales a 25, ingresa: <code><25</code>.</li>
                                <li><strong>Mayor que</strong>: Usa el operador ">" antes del número. Por ejemplo, para buscar resultados mayores o iguales a 50, ingresa: <code>>50</code>.</li>
                                <li><strong>Igual a</strong>: Usa el operador "=" antes del número. Por ejemplo, para buscar resultados iguales a 100, ingresa: <code>=100</code>.</li>
                            </ul>
                            <p>Si no utilizas ningún operador, el buscador realizará una <strong>búsqueda por coincidencia de texto</strong>, es decir, buscará resultados que <strong>contengan el texto ingresado</strong> en el campo seleccionado.</p>`,
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#btnVerStockBajo',
                        popover: {
                            title: 'Aviso de Stock Bajo',
                            description: `Este botón estará disponible únicamente cuando haya productos con un stock de <strong>25 unidades o menos</strong>. Además, funciona como un filtro para mostrar estos productos, permitiéndote visualizarlos de manera más cómoda.<br><br><i>Los productos con stock limitado se destacarán en la tabla con un fondo <strong>amarillo</strong>, facilitando su identificación.</i>`,
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#agregar',
                        popover: {
                            title: 'Añadir Producto',
                            description: '<p>Este botón permite <strong>crear un nuevo producto</strong> ingresando los datos necesarios en un formulario.</p>',
                            side: "left", align: 'start',
                            onNextClick: () => {
                                document.getElementById('agregar').click();
                                driverObjProductos.moveNext();
                            }
                        }
                    },
                    { 
                        element: '.modal-content',
                        popover: {
                            title: 'Formulario para Añadir Producto',
                            description: '<p>Aquí encontrarás los campos necesarios para <strong>agregar un nuevo producto</strong>. Es obligatorio completar todos los campos para finalizar el proceso de manera correcta.</p>',
                            side: "left", align: 'start',
                            onPrevClick: () => {
                                document.getElementById('cerrarModal').click();
                                driverObjProductos.movePrevious();
                            }
                        }
                    },
                    { 
                        element: '#inputsNumberAdd',
                        popover: {
                            title: 'Campos Numéricos',
                            description: '<p>Estos campos solo aceptan <strong>números positivos</strong>.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#precioAddContainer',
                        popover: {
                            title: 'Precio',
                            description: '<p>Este campo permite ingresar <strong>valores numéricos con hasta dos decimales</strong>.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#descuentoAddContainer',
                        popover: {
                            title: 'Descuento',
                            description: '<p>Este campo solo acepta valores entre <strong>0 y 100</strong>.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#imagenAddContainer',
                        popover: {
                            title: 'Imagen',
                            description: '<p>Aquí puedes <strong>subir una imagen</strong> para el producto. No es necesario que tenga un tamaño específico, ya que al subirla se abrirá un editor con un <strong>ratio fijo</strong>, donde podrás elegir qué parte de la imagen deseas guardar.</p>',
                            side: "left", align: 'start',
                            onNextClick: () => {
                                document.getElementById('cerrarModal').click();
                                driverObjProductos.moveNext();
                            }
                        }
                    },
                    { 
                        element: '.table',
                        popover: {
                            title: 'Tabla de Productos',
                            description: '<p>En esta tabla se muestran todos los productos disponibles, organizados para facilitar su visualización.',
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho",
                            onPrevClick: () => {
                                document.getElementById('agregar').click();
                                driverObjProductos.movePrevious();
                            }
                        }
                    },
                    { 
                        element: linea1,
                        popover: {
                            title: 'Un Producto',
                            description: `<p>Haz clic derecho sobre un producto o utiliza el botón de opciones situado al final de la fila para interactuar con él. Las opciones incluyen:</p>
                            <ul>
                                <li><strong>Ver la imagen</strong>.</li>
                                <li><strong>Editar</strong> la información.</li>
                                <ul style="padding-left: 20px;">
                                    <li><strong>Guardar</strong> la información editada</li>
                                    <li><strong>Cancelar</strong> la edición</li>
                                </ul>
                                <li><strong>Eliminarlo</strong> de manera permanente.</li>
                            </ul>`,
                            side: "top", align: 'center'
                        }
                    },
                    { 
                        popover: {
                            title: 'Fin',
                            description: '<p>Estas son todas las opciones disponibles en el <strong>panel de administración de Productos</strong>.</p><p><i>Si necesitas más información sobre las otras pestañas, simplemente cambia de pestaña y haz clic nuevamente en este botón de ayuda.</i></p>',
                            side: "top", align: 'center'
                        }
                    }
                ],

                onDestroyStarted: () => {
                    if (!driverObjProductos.hasNextStep() || confirm("¿Quieres cancelar la guia de usuario?")) {
                        driverObjProductos.destroy();
                    }
                }
            });

            driverObjProductos.drive();
            break;

        case "Usuarios":
            linea1 = document.querySelector('#cuerpoTablaAdmins tr');
            const driverObjUsuarios = driver({
                showProgress: true,
                progressText: "{{current}}/{{total}}",
                nextBtnText: "▶",
                prevBtnText: "◀",
                doneBtnText: "VALE",
                steps: [
                    { 
                        popover: {
                            title: 'Cosas que Debes Saber Antes de Comenzar',
                            description: `<p>Esta aplicación web está optimizada para su uso en ordenadores. Si bien es posible realizar acciones desde otros dispositivos, algunas notificaciones pueden no mostrarse correctamente y ciertos elementos de diseño pueden no funcionar como se espera.</p>
                            <p>La página mantiene una <strong>conexión constante con la base de datos</strong> y puede ser manejada desde varios dispositivos al mismo tiempo.</p>`,
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#auto',
                        popover: {
                            title: 'Modo de Actualización',
                            description: `<p>Configura cómo deseas que se gestionen las actualizaciones de datos:</p>
                            <ul>
                                <li><strong>Actualización automática:</strong> Los datos se actualizan de forma continua sin intervención manual.</li>
                                <li><strong>Notificaciones de cambios:</strong> Recibirás un aviso cada vez que se detecten cambios en la base de datos, permitiéndote decidir cuándo actualizar.</li>
                            </ul>
                            <p><strong>Importante:</strong> Si la actualización automática está activa y estás editando una fila o añadiendo un nuevo dato, la configuración se cerrará automáticamente para priorizar la actualización de datos. Se recomienda desactivar esta opción temporalmente al realizar cambios para evitar la pérdida de información.</p>`,
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        popover: {
                            title: 'Acceso Seguro al Panel Administrativo',
                            description: `<p>El acceso al <strong>panel administrativo</strong> está diseñado para garantizar la <strong>seguridad de la información</strong> y la privacidad de los datos gestionados. Solo los usuarios con permisos de administrador tienen acceso autorizado.</p><p>En caso de que un administrador cierre sesión desde otra pestaña dentro del mismo navegador, el sistema detectará automáticamente este cambio y cerrará el acceso al panel administrativo de manera inmediata.</p>
                            <div style="padding: 10px; border: 2px solid #cc0000; background-color: #ffe5e5; margin-top: 15px; border-radius: 20px;">
                            <p style="font-size: 1.2em; color: #cc0000;"><strong>⚠ Importante:</strong></p>
                            <p> En caso de rechazar los cambios detectados en modo manual, la página <strong>no volverá a contactar con la base de datos</strong> hasta que lo hagas manualmente.</p>
                            <p>Esto implica que el <strong>sistema de seguridad</strong> que cierra sesiones automáticamente no funcionará en la pestaña actual.</p>
                            </div>`,
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#headerLinks',
                        popover: {
                            title: 'Navegador',
                            description: '<p>El navegador te permite <strong>volver al inicio</strong> de la tienda o <strong>cambiar entre las pestañas</strong> de gestión disponibles.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        element: '#Usuarios',
                        popover: {
                            title: 'Gestión de Usuarios',
                            description: '<p>En esta sección puedes explorar <strong>diversas opciones</strong> para interactuar con los datos de los usuarios, como editarlos, eliminarlos, añadir nuevos y mas...</p>',
                            side: "top", align: 'start'
                        }
                    },
                    { 
                        element: '.buscador',
                        popover: {
                            title: 'Buscador',
                            description: '<p>Esta herramienta permite realizar <strong>búsquedas específicas</strong> basadas en el texto ingresado y el criterio seleccionado.</p>',
                            side: "left", align: 'start'
                        }
                    },
                    { 
                        popover: {
                            title: 'Cumple con las Normas',
                            description: `<p>La información de los usuarios está regida por normas estrictas que deben cumplirse sin excepción:</p>
                            <ul>
                                <li><strong>Nombre de usuario:</strong> Debe contener entre <strong>4 y 20 caracteres</strong>, permitiéndose solo letras, números y guiones bajos.</li>
                                <li><strong>Correo electrónico:</strong> Debe tener un formato válido, compuesto por <strong>nombre de usuario</strong>, seguido de <strong>@</strong> y un <strong>dominio</strong> de correo electrónico.</li>
                                <li><strong>Contraseña:</strong> Debe tener al menos <strong>8 caracteres</strong>, incluyendo al menos: <strong>una letra minúscula</strong>, <strong>una letra mayúscula</strong>, <strong>un número</strong> y <strong>un carácter especial</strong>.</li>
                            </ul>`,
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        element: '#agregar',
                        popover: {
                            title: 'Añadir Usuario',
                            description: '<p>Este botón permite <strong>crear un nuevo usuario</strong> ingresando los datos necesarios en un formulario.</p>',
                            side: "left", align: 'start',
                            onNextClick: () => {
                                document.getElementById('agregar').click();
                                driverObjUsuarios.moveNext();
                            }
                        }
                    },
                    { 
                        element: '.modal-content',
                        popover: {
                            title: 'Formulario para Añadir Usuario',
                            description: '<p>Aquí encontrarás los campos necesarios para <strong>agregar un nuevo Usuario</strong>. Es obligatorio completar todos los campos para finalizar el proceso de manera correcta.<br><br><i>Debes seguir las reglas mencionadas anteriormente.</i></p>',
                            side: "left", align: 'start',
                            onPrevClick: () => {
                                document.getElementById('cerrarModal').click();
                                driverObjUsuarios.movePrevious();
                            },
                            onNextClick: () => {
                                document.getElementById('cerrarModal').click();
                                driverObjUsuarios.moveNext();
                            }
                        }
                    },
                    { 
                        element: '.accordion',
                        popover: {
                            title: 'Tablas de Usuarios',
                            description: `<p>Estas tablas, organizadas por tipo de usuario y separadas mediante un acordeón, muestran la información de todos los usuarios registrados en el sistema.</p>`,
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho",
                            onPrevClick: () => {
                                document.getElementById('agregar').click();
                                driverObjUsuarios.movePrevious();
                            }
                        }
                    },
                    { 
                        element: ".accordion-button-admin",
                        popover: {
                            title: 'El Acordeón',
                            description: `<p>Este acordeón te permite diferenciar fácilmente entre <strong>usuarios administradores</strong> y <strong>usuarios normales</strong>. Además, puedes utilizarlo para ocultar o mostrar las tablas según sea necesario.</p>`,
                            side: "top", align: 'center',
                            onNextClick: () => {
                                if(!document.getElementById('panelsStayOpen-collapseOne').classList.contains('show')){
                                    document.querySelector('.accordion-button-admin').click();
                                }
                                driverObjUsuarios.moveNext();
                            }
                        }
                    },
                    { 
                        element: linea1,
                        popover: {
                            title: 'Un Usuario',
                            description: `<p>Haz clic derecho sobre un usuario o utiliza el botón de opciones situado al final de la fila para interactuar con él. Las opciones incluyen:</p>
                            <ul>
                                <li><strong>Ver</strong> códigos de descuento.</li>
                                <li><strong>Editar</strong> la información.</li>
                                <ul style="padding-left: 20px;">
                                    <li><strong>Guardar</strong> la información editada</li>
                                    <li><strong>Cancelar</strong> la edición</li>
                                </ul>
                                <li><strong>Editar la contraseña</strong>.</li>
                                <li><strong>Eliminarlo</strong> de manera permanente.</li>
                            </ul>`,
                            side: "top", align: 'center'
                        }
                    },
                    { 
                        popover: {
                            title: 'Fin',
                            description: '<p>Estas son todas las opciones disponibles en el <strong>panel de administración de Usuarios</strong>.</p><p><i>Si necesitas más información sobre las otras pestañas, simplemente cambia de pestaña y haz clic nuevamente en este botón de ayuda.</i></p>',
                            side: "top", align: 'center'
                        }
                    }
                ],

                onDestroyStarted: () => {
                    if (!driverObjUsuarios.hasNextStep() || confirm("¿Quieres cancelar la guia de usuario?")) {
                        driverObjUsuarios.destroy();
                    }
                }
            });

            driverObjUsuarios.drive();
            break;

        case "Pedidos":
            const driverObjPedidos = driver({
                showProgress: true,
                progressText: "{{current}}/{{total}}",
                nextBtnText: "▶",
                prevBtnText: "◀",
                doneBtnText: "VALE",
                steps: [
                    { 
                        popover: {
                            title: 'Actualmente se esta trabajando en esta sección.',
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    }
                ],

                onDestroyStarted: () => {
                    if (!driverObjPedidos.hasNextStep() || confirm("¿Quieres cancelar la guia de usuario?")) {
                        driverObjPedidos.destroy();
                    }
                }
            });

            driverObjPedidos.drive();
            break;

        default:
            break;
    }
}