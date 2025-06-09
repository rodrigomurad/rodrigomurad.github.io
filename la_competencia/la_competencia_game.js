const luchadores = document.getElementById('luchadores');
const drop_zone = document.getElementById("drop_zone");
const texto_resultado = document.getElementById("texto_resultado");
const fighter_seleccionado = document.getElementById("fighter_seleccionado");
const nombre_luchador_usuario = document.getElementById("nombre_luchador_usuario");
let nombresluchadores = ['earthak', 'firex', 'waterhit'];
let seleccionado = false;
let energiaFighterUsuario, energiaFighterPC, energiaPivote;
let puntaje_usuario, puntaje_PC;

// Comienza el Evento de Drag & Drop
luchadores.addEventListener('dragstart', e => {
    seleccionado = false;
    fighter_seleccionado.src = "";
    drop_zone.classList.add("dropZoneStyleActive");
    drop_zone.style.visibility = "visible";

    e.dataTransfer.setData('nombreFighterUsuario', e.target.id);
    energiaFighterUsuario = document.getElementById(e.target.id).dataset.energy;
    e.dataTransfer.setData('imagenFighterUsuario', e.target.src);

    document.getElementById("nombre_luchador_PC").innerText = "";
    document.getElementById("fighter_PC").src = "";
});

// Si el Luchador es soltado fuera del Círculo Rojo, entonces se oculta nuevamente el Círculo Rojo
luchadores.addEventListener('dragend', e => {
    if (seleccionado == false) {
        drop_zone.style.visibility = "hidden";
    }
});

// Previene el comportamiento normal, para que se permita el evento Drag & Drop
drop_zone.addEventListener("dragover", e => {
    e.preventDefault();
});

// El Luchador es solatado dentro del Círculo Rojo
drop_zone.addEventListener("drop", e => {
    seleccionado = true;
    drop_zone.classList.remove("dropZoneStyleActive");
    nombre_luchador_usuario.innerText = e.dataTransfer.getData('nombreFighterUsuario');
    fighter_seleccionado.src = e.dataTransfer.getData('imagenFighterUsuario');

    /* Eliger un Número entre 0 y 29, luego lo divide entre 10, y al ser un "parseInt", solo reserva la
    parte entera, quedando un número entre 0 y 2. Con ese número, busca el valor en el array "nombresluchadores",
    y lo utiliza para generar toda la info del Luchador de la PC */
    energiaFighterPC = parseInt((Math.random() * 30) / 10);
    nombreFighterPC = nombresluchadores[energiaFighterPC];
    document.getElementById("nombre_luchador_PC").innerText = nombreFighterPC;
    document.getElementById("fighter_PC").src = "img/fighter_" + nombreFighterPC + ".png";

    /* Chequeamos quién ganó, esto lo hacemos restando los valores:
    Le restamos a la Energía del Usuario la Energía de la PC,
    si el valor queda negativo, entonces el Usuario pierde, de lo contrario gana */
    if (energiaFighterUsuario == energiaFighterPC) {
        texto_resultado.style.color = "#333";
        texto_resultado.innerText = "empate";
    } else {
        if (energiaFighterUsuario == 2 && energiaFighterPC == 0 || energiaFighterUsuario == 0 && energiaFighterPC == 2) {
            energiaPivote = energiaFighterUsuario;
            energiaFighterUsuario = energiaFighterPC;
            energiaFighterPC = energiaPivote;
        }
        if (energiaFighterUsuario - energiaFighterPC < 0) {
            texto_resultado.style.color = "#f00";
            texto_resultado.innerText = "Perdiste";
            puntaje_PC++;

        } else {
            texto_resultado.style.color = "#00f";
            texto_resultado.innerText = "Ganaste";
            puntaje_usuario++;
        }
    }

    document.getElementById("puntaje_usuario").innerText = puntaje_usuario;
    document.getElementById("puntaje_PC").innerText = puntaje_PC;
});

// Reiniciamos todos los Valores
function replay() {
    puntaje_usuario = 0;
    puntaje_PC = 0;
    document.getElementById("nombre_luchador_usuario").innerText = "READY";
    document.getElementById("puntaje_usuario").innerText = "0";
    document.getElementById("nombre_luchador_PC").innerText = "READY";
    document.getElementById("puntaje_PC").innerText = "0";
    texto_resultado.innerText = "";
    fighter_seleccionado.src = "";
    document.getElementById("fighter_PC").src = "";
}