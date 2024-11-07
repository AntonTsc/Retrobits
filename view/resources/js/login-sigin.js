const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#floatingPassword');
togglePassword.addEventListener('click', () => {
    const type = password
        .getAttribute('type') === 'password' ?
        'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye');
});

let btnLogin = document.getElementById("btnLogin");
let btnRegister = document.getElementById("btnRegister");

// No es la mejor manera supongo...
if(btnLogin){
    btnLogin.addEventListener("click", function(){
        window.location.href = "login.html";
    });
} else {
    btnRegister.addEventListener("click", function(){
        window.location.href = "sigin.html";
    });
}