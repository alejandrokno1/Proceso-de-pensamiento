// Seleccionamos los elementos del DOM
var boton = document.getElementById("mostrar-mensaje");
var mensaje = document.getElementById("mensaje-prueba");
var pregunta = document.getElementById("pregunta");
var resultado = document.getElementById("resultado");
var puntosElemento = document.getElementById("puntos");
var textoPregunta = document.getElementById("texto-pregunta");
var opciones = document.querySelectorAll(".opcion");
var reiniciarBoton = document.getElementById("reiniciar");

var puntos = 0;  // Puntos iniciales
var preguntaActual = 0;  // Controla la pregunta actual
var preguntas = [];  // Aquí se almacenarán las preguntas del JSON

// Cargar preguntas desde el archivo JSON
fetch('preguntas.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data;  // Guardamos las preguntas en la variable preguntas
    })
    .catch(error => console.error('Error al cargar las preguntas:', error));

// Función para mostrar el contexto de cada pregunta
function mostrarContexto() {
    if (preguntaActual < preguntas.length) {
        // Mostrar el mensaje de contexto
        mensaje.innerHTML = preguntas[preguntaActual].contexto;
        mensaje.style.display = "block";

        // Esperar 3 segundos antes de mostrar la pregunta
        setTimeout(function() {
            mensaje.style.display = "none";  // Ocultar el contexto
            mostrarPregunta();  // Mostrar la pregunta
        }, 3000); // 3 segundos de espera
    } else {
        resultado.innerHTML = "Has respondido todas las preguntas. ¡Puntaje final: " + puntos + "!";
        resultado.style.display = "block";
        reiniciarBoton.style.display = "block";  // Mostrar el botón de reinicio
    }
}

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    // Ocultar el resultado anterior
    resultado.style.display = "none";

    // Actualizar el texto de la pregunta y las opciones
    var preguntaData = preguntas[preguntaActual];
    textoPregunta.innerHTML = preguntaData.texto;
    opciones.forEach(function(opcion, index) {
        opcion.innerHTML = preguntaData.opciones[index];
        opcion.setAttribute("data-respuesta", preguntaData.opciones[index] === preguntaData.correcta ? "correcta" : "incorrecta");
    });

    pregunta.style.display = "block";  // Mostrar la pregunta
}

// Función para manejar la selección de la respuesta
opciones.forEach(function(opcion) {
    opcion.addEventListener("click", function() {
        var respuesta = opcion.getAttribute("data-respuesta");

        if (respuesta === "correcta") {
            puntos++;  // Incrementar puntos si la respuesta es correcta
            resultado.innerHTML = "¡Correcto! Has ganado un punto.";
        } else {
            resultado.innerHTML = "Respuesta incorrecta. Inténtalo de nuevo.";
        }

        puntosElemento.innerHTML = puntos;  // Actualizar los puntos en la pantalla
        resultado.style.display = "block";  // Mostrar el resultado

        // Ocultar la pregunta y pasar a la siguiente
        pregunta.style.display = "none";
        preguntaActual++;  // Pasar a la siguiente pregunta

        // Esperar 2 segundos antes de mostrar el contexto de la siguiente pregunta
        setTimeout(mostrarContexto, 2000);  // Mostrar el contexto después de 2 segundos
    });
});

// Función inicial cuando se presiona el botón para comenzar
boton.addEventListener("click", function() {
    reiniciarBoton.style.display = "none";  // Ocultar el botón de reinicio si se vuelve a presionar "Matemáticas"
    mostrarContexto();  // Mostrar el contexto de la primera pregunta
});

// Función para reiniciar todo, pero no comienza el juego automáticamente
reiniciarBoton.addEventListener("click", function() {
    puntos = 0;
    preguntaActual = 0;
    puntosElemento.innerHTML = puntos;
    resultado.style.display = "none";  // Ocultar el resultado final
    reiniciarBoton.style.display = "none";  // Ocultar el botón de reinicio
    boton.style.display = "block";  // Mostrar el botón "Matemáticas"
    mensaje.style.display = "none";  // Ocultar cualquier mensaje que quede
    pregunta.style.display = "none";  // Ocultar cualquier pregunta que quede
});
