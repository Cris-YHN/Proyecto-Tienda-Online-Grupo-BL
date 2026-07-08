const form = document.getElementById("contacForm")

form.addEventListener("submit",function(event){

    event.preventDefault();

    //Recuperamos los campos
    const nombre = document.getElementById("nombre").value.trim()
    const email = document.getElementById("email").value.trim()
    const mensaje = document.getElementById("mensaje").value.trim()

    //errores
    const errorNombre = document.getElementById("errorNombre")
    const errorEmail = document.getElementById("errorEmail")
    const errorMensaje = document.getElementById("errorMensaje")

    //Limpar errores
    errorNombre.textContent =""
    errorEmail.textContent =""
    errorMensaje.textContent =""

    let valido = true

    //validación del campo nombre
    if(nombre ===""){
        errorNombre.textContent ="Ingrese su nombre"
        valido = false
    }else if(/\d/.test(nombre)){
        errorNombre.textContent = "El nombre no puede contener números"
        valido = false
    }

    //Validación del campo email
    if(email ===""){
        errorEmail.textContent = "Ingrese su correo electrónico"
        valido = false
    }else if(!email.includes("@")){
        errorEmail.textContent = "Correo electrónico invalido"
        valido = false
    }

    //Validacion de mensaje
    if(mensaje === ""){
        errorMensaje.textContent = "Ingrese un mensaje"
        valido = false
    }


    //Si el formulario es valido
    if(valido){
        alert("Formulario enviado correctamente")
        form.reset()
    }

})