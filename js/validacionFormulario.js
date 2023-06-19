var formulario = document.querySelector("#formularioConsulta");
formulario.addEventListener('submit',validarFormulario);


function validarFormulario(evento){
    var valido = true;

    //Obtención de los elementos del formulario para su validación:
    //Cajas de texto
    var txtNombre = document.getElementById("nombre");
    var txtEmail = document.getElementById("email");
    var txtTelefono = document.getElementById("telefono");
    //Lista de selección
    var selectEspecialidad = document.getElementById("especialidad");
    //Selector de fecha
    var dateConsulta = document.getElementById("fecha");
    //Selector de hora
    var hora = document.getElementById("hora");

    //Expresiones regulares para la validación de lo que se ingrese en las cajas de texto
    var letra = /^[a-z ,.'-]+$/i;
    var correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var telefono = /^09\d{8}$/;

    limpiarFormulario();

    if (txtNombre.value === ''){ //Valida si el valor de la caja de texto de nombre es una cadena vacía o no 
        valido = false;
        mostrarMensaje("¡Para agendar una consulta debe ingresar un nombre!",txtNombre);
    } else if (!letra.test(txtNombre.value)){ //Valida que hayan letras usando la expresión regular 
        valido = false;
        mostrarMensaje("¡Este campo solo puede contener letras!",txtNombre);
    }

    if (txtEmail.value === ''){ //Valida si el valor de la caja de texto de email es una cadena vacía o no 
        valido = false;
        mostrarMensaje("¡Para agendar una consulta debe ingresar un correo electrónico!",txtEmail);
    } else if (!correo.test(txtEmail.value)){ //Valida que se hayan ingresado una dirección de correo válida
        valido = false;                       // usando la expresión regular 
        mostrarMensaje("¡Debe de registrar un correo válido!",txtEmail);
    }

    if (txtTelefono.value === ''){ //Valida si el valor de la caja de texto de teléfono es una cadena vacía o no 
        valido = false;
        mostrarMensaje(" ¡Para agendar una consulta debe ingresar un número de teléfono!",txtTelefono);
    } else if(!telefono.test(txtTelefono.value)) { //Valida si es un número de teléfono válido usando la expresión regular
        valido = false;
        mostrarMensaje("Debe ingresar un número de teléfono válido",txtTelefono);
    }

    if (selectEspecialidad.value === null || selectEspecialidad.value === '0'){ //Valida que se haya seleccionado un elemento de la lista
        valido = false;
        mostrarMensaje("¡Para agendar una consulta debe de seleccionar una especialidad médica!",selectEspecialidad);
    }
    //Variables para validar la fecha seleccionada
    var fechaSeleccionada = new Date(dateConsulta.value);
    var fechaActual = new Date();
    
    //Variables para validar la hora seleccionada
    var horaSeleccionada = hora.value;
    var horaMinima = "07:00";
    var horaMaxima = "18:00";

    if(dateConsulta.value === ''){ //Valida si se ha seleccionada una fecha
        valido = false;
        mostrarMensaje("¡Para agendar una consulta debe de seleccionar una fecha!",dateConsulta);
    } else if(fechaSeleccionada <= fechaActual){
        valido = false;
        mostrarMensaje("¡La fecha para agendar su consulta no puede ser anterior ni igual a la actual!",dateConsulta)
    }
    
    if(hora.value === ''){ //Valida si se ha seleccionada una hora
        valido = false;
        mostrarMensaje("¡Debe seleccionar la hora de la consulta para que sea agendada!",hora);
    } else if (horaSeleccionada < horaMinima || horaSeleccionada > horaMaxima){ //Valida que la hora seleccionada esté dentro de los horarios de atención
        valido = false;
        mostrarMensaje("¡No puede agendar una consulta fuera de nuestros horarios de atención!",hora)
    }

    if (!valido) {
        evento.preventDefault();
    } else {
        alert("¡Su consulta ha sido registrada exitosamente!");
    }
}

function mostrarMensaje(textoMensaje,elemento){
    elemento.focus();
    var nodoPadre = elemento.parentNode;
    var nodoMensaje = document.createElement("span");
    nodoMensaje.textContent = textoMensaje;
    nodoMensaje.setAttribute("class","mensajeError");
    nodoPadre.appendChild(nodoMensaje);
}

function limpiarFormulario(){
    var mensaje = document.querySelectorAll(".mensajeError");
    for (let i = 0; i < mensaje.length; i++){
        mensaje[i].remove();
    }
}

formulario.telefono.addEventListener("keypress",validarTxtTelefono); //Evento para que solo se puedan escribir números

function validarTxtTelefono(evento){
    var tecla = evento.keyCode;
    if (tecla < 48 || tecla > 57){
        evento.preventDefault();
    }
    if(evento.target.value.length >= 10){
        evento.preventDefault();
    }
}
