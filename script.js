let respuestaCorrecta;
let puntaje = 0;
let segundos = 0;
let minutos = 0;
let cronometroIntervalo;

// Función para abrir el modal y definir contenido dinámico según el botón
function abrirModal(idBoton) {
    document.getElementById('modal').style.display = 'flex';

    // Configura el cronómetro y el tipo de preguntas según el botón
    if (idBoton === 'matematicas1') {
        reiniciarCronometro();
        iniciarCronometro();
        generarPreguntaMatematicas1();
        puntaje = 0;
        actualizarPuntaje();
        document.querySelector('.modal-content h2').innerText = "Pregunta de Matemáticas 1";
    } else if (idBoton === 'matematicas2') {
        reiniciarCronometro();
        iniciarCronometro();
        generarPreguntaMatematicas2();
        puntaje = 0;
        actualizarPuntaje();
        document.querySelector('.modal-content h2').innerText = "Pregunta de Matemáticas 2";
    } else if (idBoton === 'matematicas3') {
        iniciarCronometroRegresivo(); // Inicia el cronómetro regresivo
        generarPreguntaMatematicas3();
        puntaje = 0;
        actualizarPuntaje();
        document.querySelector('.modal-content h2').innerText = "Pregunta de Matemáticas 3";
    }

    mostrarElementosDePregunta();
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
    detenerCronometro();
    document.getElementById('respuesta').value = '';  // Limpiar la respuesta
    document.getElementById('resultado').innerText = '';  // Limpiar el mensaje de resultado
    mostrarElementosDePregunta();
}

// Función para iniciar el cronómetro normal (Matemáticas 1 y 2)
function iniciarCronometro() {
    segundos = 0;
    minutos = 0;
    cronometroIntervalo = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }
        document.getElementById('cronometro').innerText = 
            (minutos < 10 ? '0' + minutos : minutos) + ":" + 
            (segundos < 10 ? '0' + segundos : segundos);
    }, 1000);
}

// Función para iniciar el cronómetro regresivo (Matemáticas 3)
function iniciarCronometroRegresivo() {
    segundos = 60; // Inicia en 60 segundos
    document.getElementById('cronometro').innerText = `01:00`;
    cronometroIntervalo = setInterval(() => {
        segundos--;
        if (segundos < 0) { // Cuando el tiempo se acaba
            detenerCronometro();
            document.getElementById('resultado').innerText = "Tiempo agotado. Intenta nuevamente.";
            document.getElementById('resultado').style.color = "red";
            ocultarElementosDePregunta(); // Oculta elementos y muestra solo "Cerrar"
        } else {
            document.getElementById('cronometro').innerText = 
                `00:${segundos < 10 ? '0' + segundos : segundos}`;
        }
    }, 1000);
}

// Función para detener el cronómetro
function detenerCronometro() {
    clearInterval(cronometroIntervalo);
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    detenerCronometro();
    segundos = 0;
    minutos = 0;
    document.getElementById('cronometro').innerText = "00:00";
}

// Función para generar preguntas específicas de Matemáticas 1
function generarPreguntaMatematicas1() {
    const operadores = ['+', '-', '*', '/'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];
    let num1 = numeroAleatorio();
    let num2 = numeroAleatorio();

    if (operador === '/') {
        num1 = num2 * Math.floor(Math.random() * 10 + 1); // División exacta
    }

    let preguntaTexto;
    if (operador === '+') {
        respuestaCorrecta = num1 + num2;
        preguntaTexto = `${num1} + ${num2}`;
    } else if (operador === '-') {
        respuestaCorrecta = num1 - num2;
        preguntaTexto = `${num1} - ${num2}`;
    } else if (operador === '*') {
        respuestaCorrecta = num1 * num2;
        preguntaTexto = `${num1} * ${num2}`;
    } else if (operador === '/') {
        respuestaCorrecta = num1 / num2;
        preguntaTexto = `${num1} / ${num2}`;
    }

    document.getElementById('pregunta').innerText = `¿Cuánto es ${preguntaTexto}?`;
}

// Función para generar preguntas específicas de Matemáticas 2 (Potenciación)
function generarPreguntaMatematicas2() {
    const base = Math.floor(Math.random() * 9) + 2;
    const exponente = Math.floor(Math.random() * 4) + 2;

    respuestaCorrecta = Math.pow(base, exponente);
    const preguntaTexto = `${base} ^ ${exponente}`;
    
    document.getElementById('pregunta').innerText = `¿Cuánto es ${preguntaTexto}?`;
}

// Función para generar preguntas de Matemáticas 3 (mismas operaciones que Matemáticas 1 y 2)
function generarPreguntaMatematicas3() {
    const operadores = ['+', '-', '*', '/', '^'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];
    let num1 = numeroAleatorio();
    let num2 = numeroAleatorio();

    if (operador === '/') {
        num1 = num2 * Math.floor(Math.random() * 10 + 1); // División exacta
    }

    let preguntaTexto;
    if (operador === '+') {
        respuestaCorrecta = num1 + num2;
        preguntaTexto = `${num1} + ${num2}`;
    } else if (operador === '-') {
        respuestaCorrecta = num1 - num2;
        preguntaTexto = `${num1} - ${num2}`;
    } else if (operador === '*') {
        respuestaCorrecta = num1 * num2;
        preguntaTexto = `${num1} * ${num2}`;
    } else if (operador === '/') {
        respuestaCorrecta = num1 / num2;
        preguntaTexto = `${num1} / ${num2}`;
    } else if (operador === '^') {
        respuestaCorrecta = Math.pow(num1, Math.min(num2, 3)); // Limita el exponente para evitar respuestas grandes
        preguntaTexto = `${num1} ^ ${Math.min(num2, 3)}`;
    }

    document.getElementById('pregunta').innerText = `¿Cuánto es ${preguntaTexto}?`;
}

// Función para verificar la respuesta del usuario
function verificarRespuesta() {
    const respuestaUsuario = parseFloat(document.getElementById('respuesta').value);
    const resultado = document.getElementById('resultado');

    if (respuestaUsuario === respuestaCorrecta) {
        resultado.innerText = "¡Correcto!";
        resultado.style.color = "green";
        puntaje++;
        actualizarPuntaje();

        if (puntaje >= 3) {
            detenerCronometro();
            mostrarFelicitaciones();
        } else {
            generarPreguntaMatematicas3();
        }
    } else {
        resultado.innerText = "Inténtalo de nuevo.";
        resultado.style.color = "red";
    }

    document.getElementById('respuesta').value = '';  // Limpiar el campo de respuesta
}

// Función para actualizar el puntaje en pantalla
function actualizarPuntaje() {
    document.getElementById('puntaje').innerText = puntaje;
}

// Función para mostrar el mensaje de felicitación
function mostrarFelicitaciones() {
    const tiempoFinal = document.getElementById('cronometro').innerText;
    document.getElementById('resultado').innerText = 
        `¡Felicitaciones! Completaste 3 respuestas en el tiempo ${tiempoFinal}`;
    document.getElementById('resultado').style.color = "blue";
    ocultarElementosDePregunta();
}

// Funciones para mostrar y ocultar elementos en el modal
function mostrarElementosDePregunta() {
    document.getElementById('respuesta').style.display = 'inline';
    document.querySelector('button[onclick="verificarRespuesta()"]').style.display = 'inline';
}

function ocultarElementosDePregunta() {
    document.getElementById('respuesta').style.display = 'none';
    document.querySelector('button[onclick="verificarRespuesta()"]').style.display = 'none';
}

// Función para generar números aleatorios entre 10 y 99, con posibilidad de decimales
function numeroAleatorio() {
    const esDecimal = Math.random() < 0.5;
    const numero = Math.random() * 90 + 10;
    return esDecimal ? parseFloat(numero.toFixed(1)) : Math.floor(numero);
}
