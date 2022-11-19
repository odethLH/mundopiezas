form = document.getElementById("formulario");
nom = document.getElementById("nombre");
ape = document.getElementById("apellido");

function sololetras(evt){
    // code: representación decimal del código ASCCI
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { //barra espaciadora
        return true;
    }else if(code>=65 && code<=90 || code>=97 && code<=122) { // son letras de a-z, A-Z
        return true;
    }else{ //otra tecla
        return false;
    }
}

function solonumeros(evt,control,cantidad){
    xlongitud=document.getElementById(control).value.length; 
    var code = (evt.which) ? evt.which : evt.keyCode;
    if((code>=48 && code<=57) && xlongitud<cantidad) { // es un número
    return true;
    } else{ // otra tecla
    return false;
    }
}  

function validarCorreo(){
    let correo = document.getElementById("email").value;
    let correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correoValido.test(correo)){
        document.getElementById("alertaCorreo").innerHTML = "";
        document.getElementById("email").style.border = 'none';
    }else{
        document.getElementById("alertaCorreo").innerHTML = "El correo debe contener @";
        document.getElementById("email").style.border = '2px solid red';
    }
}

function validarMensaje(){
    let mensaje = document.getElementById("mensaje").value;
    if (mensaje==""){
        document.getElementById("alertaMensaje").innerHTML = "Complete el campo";
        document.getElementById("mensaje").style.border = '2px solid red';
    } else{
        document.getElementById("alertaMensaje").innerHTML = "";
        document.getElementById("mensaje").style.border = 'none';
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if(nombre.value === "" || empresa.value === "" || email.value === "" || celular.value === "" || mensaje.value === ""){
        validarCorreo();     
        validarMensaje();
        Swal.fire({  //mostrar ventana
            type: 'error',
            title: 'Ingrese los campos requeridos',
            timer: 2500,
            showConfirmButton: false,
        })
    }
    else {
        Swal.fire({
            type: 'success',
            title: 'Muchas Gracias',
            html: '<b>En breve nos pondremos en contacto</b>',
            showConfirmButton: false,
            timer: 3000, 
        }).then(() => {
            document.getElementById("nombre").value = "";
            document.getElementById("empresa").value = "";
            document.getElementById("email").value = "";
            document.getElementById("celular").value = "";
            document.getElementById("mensaje").value = "";
            document.getElementById("email").style.border = 'none';
            document.getElementById("alertaMensaje").innerHTML = "";
            document.getElementById("alertaCorreo").innerHTML = "";
            document.getElementById("mensaje").style.border = 'none';
        })
    }
    
})

