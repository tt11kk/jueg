let personajeSeleccionado = '';
let nivelActual = 1;
let progresoPersonaje = 0;
let puntos = 0; // Variable para el puntaje

const niveles = {
    1: {
        titulo: "El pastelero en problemas",
        descripcion: "Ayuda al pastelero a preparar pasteles para una gran fiesta.",
        fondo: "assets/fondos/nivel1-fondo.jpg",
        tipoPregunta: 'directa',
        rangoNumeros: [1, 50],
        decimales: 1
    },
    2: {
        titulo: "Los jardineros y su tarea",
        descripcion: "Ayuda a los jardineros a terminar su trabajo a tiempo.",
        fondo: "assets/fondos/nivel2-fondo.jpg",
        tipoPregunta: 'inversa',
        rangoNumeros: [50, 250],
        decimales: 2
    },
    3: {
        titulo: "Carpinteros trabajando en el taller",
        descripcion: "Ayuda a los carpinteros a terminar la producción de muebles.",
        fondo: "assets/fondos/nivel3-fondo.jpg",
        tipoPregunta: 'mixta',
        rangoNumeros: [250, 500],
        decimales: 2
    }
};

function seleccionarPersonaje(personaje) {
    personajeSeleccionado = personaje;
    document.getElementById('seleccion-personaje').style.display = 'none';
    mostrarHistoria();
}

function mostrarHistoria() {
    const nivelInfo = niveles[nivelActual];
    document.body.style.backgroundImage = `url(${nivelInfo.fondo})`;
    document.getElementById('nivel-historia').style.display = 'block';
    document.getElementById('titulo-historia').innerText = nivelInfo.titulo;
    document.getElementById('descripcion-historia').innerText = nivelInfo.descripcion;
}

function iniciarCamino() {
    document.getElementById('nivel-historia').style.display = 'none';
    document.getElementById('tablero').style.display = 'block';

    const personajeImg = document.getElementById('personaje-img');
    personajeImg.src = personajeSeleccionado === 'aventurero' ? 'assets/personajes/aventurero.png' : 'assets/personajes/exploradora.png';

    generarCamino();
}

function generarCamino() {
    const camino = document.getElementById('preguntas-camino');
    camino.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const boton = document.createElement('button');
        boton.innerText = `Pregunta ${i}`;
        boton.onclick = () => mostrarProblema(i);
        camino.appendChild(boton);
    }
}

function mostrarProblema(pregunta) {
    document.getElementById('problema-container').style.display = 'block';
    const problema = crearProblema();
    document.getElementById('problema-texto').innerText = problema.texto;
    document.getElementById('problema-container').dataset.respuesta = problema.respuesta;
}

function crearProblema() {
    const nivelInfo = niveles[nivelActual];
    let problema, respuesta;

    if (nivelInfo.tipoPregunta === 'directa') {
        const personas = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const productos = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const personas2 = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        respuesta = ((productos * personas2) / personas).toFixed(nivelInfo.decimales);

        problema = {
            texto: `Si ${personas} pasteleros hacen ${productos} pasteles, ¿cuántos harán ${personas2}?`,
            respuesta: parseFloat(respuesta)
        };
    } 
    else if (nivelInfo.tipoPregunta === 'inversa') {
        const jardineros = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const horas = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const jardineros2 = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        respuesta = (horas * jardineros / jardineros2).toFixed(nivelInfo.decimales);

        problema = {
            texto: `Si ${jardineros} jardineros terminan en ${horas} horas, ¿en cuánto tiempo terminarán ${jardineros2} jardineros?`,
            respuesta: parseFloat(respuesta)
        };
    }
    else if (nivelInfo.tipoPregunta === 'mixta') {
        // Aquí definimos los valores específicos para proporciones mixtas
        const carpinteros = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const muebles = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const horas = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const carpinteros2 = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);
        const muebles2 = Math.floor(Math.random() * (nivelInfo.rangoNumeros[1] - nivelInfo.rangoNumeros[0] + 1) + nivelInfo.rangoNumeros[0]);

        // Formulamos la pregunta y calculamos la respuesta usando la proporción mixta
        respuesta = (muebles * horas * carpinteros2) / (carpinteros * muebles2).toFixed(nivelInfo.decimales);

        problema = {
            texto: `${carpinteros} carpinteros hacen ${muebles} muebles en ${horas} horas. ¿En cuánto tiempo ${carpinteros2} carpinteros harán ${muebles2} muebles?`,
            respuesta: parseFloat(respuesta)
        };
    }

    return problema;
}


function verificarRespuesta() {
    const respuestaUsuario = parseFloat(document.getElementById('respuesta').value);
    const respuestaCorrecta = parseFloat(document.getElementById('problema-container').dataset.respuesta);

    if (respuestaUsuario === respuestaCorrecta) {
        alert('¡Correcto!');
        puntos += 20; // Sumar 20 puntos por cada respuesta correcta
        progresoPersonaje++;
        moverPersonaje();
        actualizarPuntos();
    } else {
        alert(`Incorrecto. La respuesta correcta era ${respuestaCorrecta}`);
    }

    document.getElementById('problema-container').style.display = 'none';
    document.getElementById('respuesta').value = '';

    // Si llega a 100 puntos, avanzar de nivel
    if (puntos >= 100) {
        avanzarNivel();
    }
} 
function moverPersonaje() {
    const personaje = document.getElementById('personaje-container');
    personaje.style.bottom = `${50 + progresoPersonaje * 80}px`;
}

function avanzarNivel() {
    alert('¡Has completado el nivel!');
    nivelActual++;
    progresoPersonaje = 0;

    // Restablecer puntos al comenzar un nuevo nivel
    puntos = 0;

    if (nivelActual <= Object.keys(niveles).length) {
        mostrarHistoria();
    } else {
        alert('¡Felicidades! Has completado todos los niveles.');
    }
}

function actualizarPuntos() {
    // Muestra los puntos actuales en la interfaz
    const puntosElement = document.getElementById('puntos');
    if (!puntosElement) {
        const puntosDiv = document.createElement('div');
        puntosDiv.id = 'puntos';
        puntosDiv.style.position = 'absolute';
        puntosDiv.style.top = '10px';
        puntosDiv.style.right = '10px';
        puntosDiv.style.fontSize = '20px';
        puntosDiv.style.fontWeight = 'bold';
        document.body.appendChild(puntosDiv);
    }
    document.getElementById('puntos').innerText = `Puntos: ${puntos}`;
}
