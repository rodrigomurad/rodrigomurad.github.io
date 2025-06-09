class fighter {
    constructor(nombre, energia, nombreFile, posX) {
        this.nombre = nombre;
        this.energia = energia;
        this.nombreFile = nombreFile;
        this.posX = posX;
    }

    ataque(poder) {
        this.energia -= poder;
        if (this.energia < 0) {
            this.energia = 0;
        }
        return (this.energia);
    }
}

const infoFightersNombre = $("#infoFightersNombre");
const infoFightersHistoria = $("#infoFightersHistoria");
let contenidoidDiv_2 = $("#idDiv_2");
let fighter1, fighter2, numeroFighter2, desactivaTeclado;
let F1activo = true, F1intervalo;
let Fighter1Selected, Fighter2Selected, selectedFighter;
let F1bloquea = false, F2bloquea;
let F2accion;
let F2walking = false;
let i = 0;
let playerName;
let dataFighter = JSON.parse(info_fighters);
let actualizaPosicionesX, F2actua, F2camina;
let musicaStage = new Audio("./audio/the_courtyard.m4a");
let counterInterval;
let counterDisplay = document.getElementById("countdown_fight_texto");

$(() => {
    // Borra el contenido del campo donde se introduce el Nombre y deshabilita el botón PLAY
    $("#nick")[0].addEventListener('focus', () => {
        $("#nick")[0].value = "";
        $("#buttonPlay").prop('disabled', true);
    });
    detieneIntervalos();

    // Llena la Tabla de los Scores
    for (let item = 0; item < localStorage.length; item++) {
        console.log(localStorage.key(item));
        console.log(localStorage.getItem(localStorage.key(item)));

        contenidoidDiv_2.prepend(`<div style="display:flex;"><label class="campos_scores campos_scores_nombre">${localStorage.key(item)}</label>
                                <label class="campos_scores campos_scores_score">${localStorage.getItem(localStorage.key(item))}</label></div>`);
    }
});

function detieneIntervalos() {
    // Vuelve los Valores a CERO
    desactivaTeclado = true;
    clearInterval(actualizaPosicionesX);
    clearInterval(F2actua);
    clearInterval(F2camina);
    clearInterval(counterInterval);
    // Remueve el Countdown
    counterDisplay.classList.remove("scale-up-center");
    counterDisplay.innerText = "";
}

// Chequea que haya un Texto ingresado en el Campo Nombre
function chequeaNombre() {
    if ($("#nick")[0].value == "") {
        swal({
            title: "",
            text: "Debe ingresar su Nombre o un Apodo. El campo Nombre NO puede estar VACÍO...",
            icon: "warning",
            button: "OK",
        });
    } else {
        // Aca guarda el valor en el localstorage
        playerName = $("#nick")[0].value;
        // Habilita el Botón PLAY
        $("#buttonPlay").removeAttr('disabled');
    }
}

// Muestra el Alert con la Info de los Desarrolladores
function infoDevelopers() {
    swal("coderhouse", "Proyecto Final JavaScript\n\nProfesor: Santiago Avila\nTutor: Uciel Sola\nProgramado por: Rodri");
}

// Muestra el Panel respecto al Botón que se pulsó
function muestraMenu(activo) {
    ocultaMenus(activo);
    $("#idDiv_" + activo).slideDown(1000);

    if (activo == 2) {
        console.log(localStorage);
    }
    if (activo == 3) { $("#idDiv_3_menu").slideDown(); }

    detieneIntervalos();
    console.log(activo);
}

// Oculta los otros Paneles
function ocultaMenus(noDesactivar) {
    for (var i = 1; i <= 3; i++) {
        if (i != noDesactivar) {
            $("#idDiv_" + i).slideUp(1000);
            console.log("#idDiv_" + i);
        }
    }
    $("#stage").hide();
    musicaStage.pause();
}

// Muestra la Info del Luchador seleccionado
function infoLuchador(selectedFighter) {
    // Script por si necesitara cargarlo desde el Servidor
    // const url = "info_fighters.json";
    // $.get(url, function (respuesta, estado) {
    //     if (estado === "success") {
    //         console.log(respuesta);
    //     } else {
    //         console.log("Se ha producido un Error y no se puede recuperar el JSON del Servidor");
    //     }
    // });

    const luchadorSeleccionado = dataFighter.findIndex(elemento => elemento.nombre == keyNombre[selectedFighter]);

    // Llena los campos con la info del Luchador
    infoFightersNombre.text(dataFighter[luchadorSeleccionado].nombre);
    infoFightersHistoria.text(dataFighter[luchadorSeleccionado].historia);
    infoFightersImagen.style.backgroundImage = "url(./img/" + dataFighter[luchadorSeleccionado].img + ")";

    // Dice el Nombre del Luchador seleccionado
    let infoFighterAudio = new Audio("./audio/" + dataFighter[luchadorSeleccionado].audio);
    infoFighterAudio.currentTime = 0;
    infoFighterAudio.play();
}

// Objeto JSON que posee en las KEY el ID del TAG (y de los Nombre de los Archivos) y en los VALORES el Nombres correspondiente al Luchador
const keyNombre = {
    "johnny_cage": "Johnny Cage",
    "kano": "Kano",
    "raiden": "Raiden",
    "liu_kang": "Liu Kang",
    "scorpion": "Scorpion",
    "sub-zero": "Sub-Zero",
    "sonya": "Sonya Blade"
};

// Ilumina el Luchador en el Tablero de Selección
function glow(selectedFighter) {
    const glowFighter = document.getElementById(selectedFighter);
    glowFighter.style.borderColor = "#0f0";
    glowFighter.style.borderWidth = "5px";
}

// Apaga el Luchador en el Tablero de Selección
function unGlow(selectedFighter) {
    const glowFighter = document.getElementById(selectedFighter);
    glowFighter.style.borderColor = "transparent";
    glowFighter.style.borderWidth = "5px";
}

function seleccionaLuchador(selectedFighter) {
    // Oculta los Luchadores
    $("#idDiv_3_menu").hide();

    // Usuario Selecciona Luchador
    Fighter1Selected = document.getElementById("player1");
    Fighter1Selected.src = "./img/" + selectedFighter + ".gif";

    // Coloca el Nombre del Luchador 1 en la Barra de Energía
    const NombreFighter1 = document.getElementById("NombreFighter1");
    NombreFighter1.textContent = keyNombre[selectedFighter];

    // Dice el nombre del Luchador
    let infoFighterAudio = new Audio("./audio/" + selectedFighter + ".mp3");
    infoFighterAudio.currentTime = 0;
    infoFighterAudio.play();

    // Crea el Luchador 1
    fighter1 = new fighter(keyNombre[selectedFighter], 100, selectedFighter, Fighter1Selected.offsetLeft);

    // Computadora Selecciona Luchador
    Fighter2Selected = document.getElementById("player2");
    let keysFighters = Object.keys(keyNombre);

    // Se asegura que el Luchador de la PC sea diferente al del Usuario
    do {
        numeroFighter2 = parseInt(Math.random() * 7 + 1);
    } while (keysFighters[numeroFighter2 - 1] == selectedFighter);
    Fighter2Selected.src = "./img/" + keysFighters[numeroFighter2 - 1] + ".gif";

    // Coloca el Nombre del Luchador 2 en la Barra de Energía
    const NombreFighter2 = document.getElementById("NombreFighter2");
    NombreFighter2.textContent = keyNombre[keysFighters[numeroFighter2 - 1]];

    // Crea el Luchador 2
    fighter2 = new fighter(keyNombre[keysFighters[numeroFighter2 - 1]], 100, keysFighters[numeroFighter2 - 1], Fighter2Selected.offsetLeft);

    // Vuelve los Valores a CERO. Quita la Clase Superglow de los Luchadores
    Fighter1Selected.classList.remove("fighterSuperglow");
    Fighter2Selected.classList.remove("fighterSuperglow");
    document.getElementById("EnergiaFighter1").style.width = "100%";
    document.getElementById("EnergiaFighter2").style.width = "100%";
    document.getElementById("EnergiaFighter2").style.marginLeft = "0%";
    fighter1.posX = 60;
    fighter2.posX = 230;

    // Muestra el Stage de Pelea
    $("#stage").show();

    // Hace el Countdown
    let timer = 3;
    counterDisplay.style.visibility = "visible";
    counterDisplay.classList.add("scale-up-center");
    counterInterval = setInterval(() => {
        counterDisplay.innerText = timer;
        if (timer > 0) {
            counterDisplay.innerText = timer;
        } else {
            counterDisplay.innerText = "FIGHT";
            let fightAudio = new Audio("./audio/fight.mp3");
            fightAudio.currentTime = 0;
            fightAudio.play();

            clearInterval(counterInterval);
            let counterTimesUp = setTimeout(() => {
                counterDisplay.classList.remove("scale-up-center");
                counterDisplay.style.visibility = "hidden";

                musicaStage.currentTime = 0;
                musicaStage.loop = true;
                musicaStage.play();

                desactivaTeclado = false;
                actualizaPosicionesXF();
                F2actuaF();
                F2caminaF();
                clearTimeout(counterTimesUp);
            }, 1000);
        }
        timer--;
    }, 1000);
}

function F1actua(accion) {
    // Desactiva el KEYDOWN para permitir que se realicen las acciones
    F1activo = false;
    switch (accion) {
        case 'ArrowLeft':
            // Mueve al Fighter 1 hacia Atrás
            Fighter1Selected.src = "./img/" + fighter1.nombreFile + "-walk-BW.gif";
            F1intervalo = setInterval(() => {
                fighter1.posX -= 10;
                // Si la posición a la que se mueve es Menor a CERO (se sale de la pantalla), la establece a CERO
                if (fighter1.posX < 0) fighter1.posX = 0;
            }, 70);
            break;
        case 'ArrowRight':
            // Mueve al Fighter 1 hacia Adelante
            Fighter1Selected.src = "./img/" + fighter1.nombreFile + "-walk-FW.gif";
            F1intervalo = setInterval(() => {
                fighter1.posX += 10;
                // Si la posición a la que se mueve es Mayor a 270 (se sale de la pantalla), la establece a 270
                if (fighter1.posX > 270) fighter1.posX = 270;
            }, 70);
            break;
        case 'ArrowDown':
            // Bloquea el Ataque
            Fighter1Selected.src = "./img/" + fighter1.nombreFile + "-blocks.gif";
            F1bloquea = true;
            break;
        case 'f':
            // Ataca
            Fighter1Selected.src = "./img/" + fighter1.nombreFile + "-strikes.gif";

            // La computadora (Fighter 2) genera un Número Aleatorio que determinará si Bloquea o No el Ataque
            F2bloquea = parseInt(Math.random() * 100);
            if (fighter2.posX <= fighter1.posX + 15 && F2bloquea < 90) {
                // El Fighter 2 No Bloqueó el Ataque
                fighter2.ataque(10);
                document.getElementById("EnergiaFighter2").style.width = fighter2.energia + "%";
                document.getElementById("EnergiaFighter2").style.marginLeft = Math.abs(100 - fighter2.energia) + "%";

                /* Al haber sido golpeado el Fighter 2, lo hace retroceder.
                Si al retroceder el Fighter 2 se sale de la pantalla, entonces lo hace retroceder al Fighter 1 */
                if (fighter2.posX < 275) {
                    fighter2.posX += 50;
                } else {
                    fighter1.posX -= 50;
                }
            } else {
                // El Fighter 2 Bloqueó el Ataque
                Fighter2Selected.src = "./img/" + fighter2.nombreFile + "-blocks.gif";
            }
            break;
    }
}

// Función que Captura la Tecla Pulsada
window.addEventListener("keydown", (event) => {
    if (!F1activo || desactivaTeclado) return;
    console.log(event.key);
    F1actua(event.key);
});

// Función que Restablece al Fighter 1 al soltarse la Tecla
window.addEventListener("keyup", () => {
    if (desactivaTeclado) return;
    clearInterval(F1intervalo);
    Fighter1Selected.src = "./img/" + fighter1.nombreFile + ".gif";
    F1bloquea = false;
    F1activo = true;
});

// Hace que el Fighter 2 Avance
function F2caminaF() {
    F2camina = setInterval(() => {
        if (fighter2.posX > fighter1.posX + 15) {
            Fighter2Selected.src = "./img/" + fighter2.nombreFile + "-walk-FW.gif";
            fighter2.posX -= 25;
        }
    }, 300);
}

// La IA con la cual se generan las Acciones que realizará el Fighter 2
function F2actuaF() {
    F2actua = setInterval(() => {
        // Si está dentro de la distancia crítica evalúa que acción realizar
        if (fighter2.posX <= fighter1.posX + 15) {
            F2accion = parseInt(Math.random() * 15 + 1);
            // Retrocede
            if (F2accion < 10) {
                if (F2walking == false) {
                    F2walking = true;
                    Fighter2Selected.src = "./img/" + fighter2.nombreFile + "-walk-BW.gif";
                    let caminandoBW = setInterval(() => {
                        if (fighter2.posX < 270) fighter2.posX += 20;
                        i++;
                        if (i == 4) {
                            i = 0;
                            F2walking = false;
                            clearInterval(caminandoBW);
                        }
                    }, 70);
                }
            } else {
                // Ataca
                Fighter2Selected.src = "./img/" + fighter2.nombreFile + "-strikes.gif";

                // Evalúa si el Fighter 1 Bloquea el Ataque o No
                if (F1bloquea == false) {
                    fighter1.ataque(10);
                    document.getElementById("EnergiaFighter1").style.width = fighter1.energia + "%";
                    document.getElementById("EnergiaFighter1").style.marginRight = Math.abs(100 - fighter1.energia) + "%";

                    /* Al haber sido golpeado el Fighter 1, lo hace retroceder.
                    Si al retroceder el Fighter 1 se sale de la pantalla, entonces lo hace retroceder al Fighter 2 */
                    if (fighter1.posX > 25) {
                        fighter1.posX -= 25;
                    } else {
                        fighter2.posX += 50;
                    }
                }
            }
        }

        console.log(fighter1.posX + " / " + fighter2.posX);
    }, 230);
}

// Actualiza permanentemente las Posiciones de los Objetos HTML de los Fighters y Evalua el Fin del Juego
function actualizaPosicionesXF() {
    actualizaPosicionesX = setInterval(() => {
        Fighter1Selected.style.left = fighter1.posX + "px";
        Fighter2Selected.style.left = fighter2.posX + "px";

        if (fighter1.energia <= 0 || fighter2.energia <= 0) {
            desactivaTeclado = true;
            if (fighter1.energia <= 0) {
                Fighter2Selected.src = "./img/" + fighter2.nombreFile + "-wins.gif";
                Fighter1Selected.classList.add("fighterSuperglow");
                audioFighterWinner(fighter2.nombreFile);
            } else {
                Fighter1Selected.src = "./img/" + fighter1.nombreFile + "-wins.gif";
                Fighter2Selected.classList.add("fighterSuperglow");
                audioFighterWinner(fighter1.nombreFile);
            }
            musicaStage.pause();
            clearInterval(actualizaPosicionesX);
            detieneIntervalos();

            // Guarda el Nombre y el Score en el localStorage
            localStorage.setItem($("#nick")[0].value, fighter1.energia);
            contenidoidDiv_2.prepend(`<div style="display:flex;"><label class="campos_scores campos_scores_nombre">${$("#nick")[0].value}</label>
                                <label class="campos_scores campos_scores_score">${fighter1.energia}</label></div>`);
        }

        // Dice el nombre del Luchador ganador
        function audioFighterWinner(winner) {
            let infoFighterAudio = new Audio("./audio/" + winner + "-wins.mp3");
            infoFighterAudio.currentTime = 0;
            infoFighterAudio.play();
        }
    }, 70);
}
