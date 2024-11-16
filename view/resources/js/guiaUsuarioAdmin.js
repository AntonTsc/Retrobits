const driver = window.driver.js.driver;

function guiaDeUsuario(){
    const tab = document.querySelector('#headerLinks .nav-item .active').id;
    const linea1 = document.querySelector('#cuerpoTabla tr');
    console.log(linea1);
    switch (tab) {
        case "Productos":
            const driverObjProductos = driver({
                showProgress: true,
                progressText: "{{current}}/{{total}}",
                nextBtnText: "▶",
                prevBtnText: "◀",
                doneBtnText: "VALE",
                steps: [
                    { 
                        popover: {
                            title: 'Bienvenido a la Guía de Usuario de Productos',
                            description: '<p>A lo largo de esta guía, se proporcionará una explicación detallada sobre el funcionamiento del <strong>panel administrativo de productos</strong>. Si decides continuar, irás descubriendo las distintas funcionalidades disponibles.</p><p><i>En cualquier momento, puedes cancelar la guía haciendo clic fuera del área o seleccionando la "X" ubicada en la esquina superior derecha.</i></p>',
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        popover: {
                            title: 'Cosas que Debes Saber Antes de Comenzar',
                            description: '<p>Esta página mantiene una <strong>conexión constante con la base de datos</strong> y puede ser manejada desde distintos dispositivos. Por motivos de seguridad, cuando se detecten cambios en la base de datos que no coincidan con los datos cargados en esta página, <strong>recibirás una notificación</strong> para decidir entre actualizar los datos o mantener los actuales.</p><p><strong>Nota:</strong> Si estás editando una fila y no deseas perder los cambios, puedes optar por no actualizar. Sin embargo, se <strong>recomienda actualizar siempre que sea posible</strong> para evitar conflictos inesperados.</p>',
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
            const driverObjUsuarios = driver({
                showProgress: true,
                progressText: "{{current}}/{{total}}",
                nextBtnText: "▶",
                prevBtnText: "◀",
                doneBtnText: "VALE",
                steps: [
                    { 
                        popover: {
                            title: 'Bienvenido a la Guía de Usuario de Usuarios',
                            description: '<p>A lo largo de esta guía, se proporcionará una explicación detallada sobre el funcionamiento del <strong>panel administrativo de usuarios</strong>. Si decides continuar, irás descubriendo las distintas funcionalidades disponibles.</p><p><i>En cualquier momento, puedes cancelar la guía haciendo clic fuera del área o seleccionando la "X" ubicada en la esquina superior derecha.</i></p>',
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        popover: {
                            title: 'Cosas que Debes Saber Antes de Comenzar',
                            description: '<p>Esta página mantiene una <strong>conexión constante con la base de datos</strong> y puede ser manejada desde distintos dispositivos. Por motivos de seguridad, cuando se detecten cambios en la base de datos que no coincidan con los datos cargados en esta página, <strong>recibirás una notificación</strong> para decidir entre actualizar los datos o mantener los actuales.</p><p><strong>Nota:</strong> Si estás editando una fila y no deseas perder los cambios, puedes optar por no actualizar. Sin embargo, se <strong>recomienda actualizar siempre que sea posible</strong> para evitar conflictos inesperados.</p>',
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
                            title: 'Bienvenido a la Guía de Usuario de Pedidos',
                            description: '<p>A lo largo de esta guía, se proporcionará una explicación detallada sobre el funcionamiento del <strong>panel administrativo de pedidos</strong>. Si decides continuar, irás descubriendo las distintas funcionalidades disponibles.</p><p><i>En cualquier momento, puedes cancelar la guía haciendo clic fuera del área o seleccionando la "X" ubicada en la esquina superior derecha.</i></p>',
                            side: "left", align: 'start',
                            popoverClass: "guiaAncho"
                        }
                    },
                    { 
                        popover: {
                            title: 'Cosas que Debes Saber Antes de Comenzar',
                            description: '<p>Esta página mantiene una <strong>conexión constante con la base de datos</strong> y puede ser manejada desde distintos dispositivos. Por motivos de seguridad, cuando se detecten cambios en la base de datos que no coincidan con los datos cargados en esta página, <strong>recibirás una notificación</strong> para decidir entre actualizar los datos o mantener los actuales.</p><p><strong>Nota:</strong> Si estás editando una fila y no deseas perder los cambios, puedes optar por no actualizar. Sin embargo, se <strong>recomienda actualizar siempre que sea posible</strong> para evitar conflictos inesperados.</p>',
                            side: "top", align: 'center',
                            popoverClass: "guiaAncho"
                        }
                    },
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