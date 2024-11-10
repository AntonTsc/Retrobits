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