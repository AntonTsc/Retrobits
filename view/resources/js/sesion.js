export async function comprobarSesion(){
    try{
        const response = await fetch("https://2aw4.zornotzafpcloud.eus/controller/sesionComp.php");
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