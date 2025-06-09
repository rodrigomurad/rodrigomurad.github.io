let numeros_fichas = [],
    numeros_fichas_asignados = [],
    num_aleatorio;
let elID, num_pieza, num_pieza1, num_pieza2, num_pieza_i, click_pieza1, click_pieza2;
let fallos, aciertos, cantidad_intentos, countdown, countdown_activo;
const energia = document.getElementById("energia");
let setIntervalCountdown;

function iniciar() {
    numeros_fichas = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18], numeros_fichas_asignados = [];
    num_pieza1 = -1, num_pieza2 = -1, num_pieza_i = 0;
    fallos = 0, aciertos = 0, countdown = 60, countdown_activo = 0;
    cantidad_intentos = 14;
    energia.style.clipPath = "inset(0px calc((100% / " + cantidad_intentos + ") * (" + (cantidad_intentos - fallos) + ")) 0px 0px)";
    document.getElementById("contenedor").innerHTML = "";
    document.getElementById("gana").style.display = "none";
    document.getElementById("pierde").style.display = "none";
    clearInterval(setIntervalCountdown);
    document.getElementById("countdown").innerText = "TIEMPO RESTANTE: " + countdown;

    // Asignamos Aleatoriamente los Números de las Fichas al Array
    do {
        num_aleatorio = parseInt(Math.random() * numeros_fichas.length);
        numeros_fichas_asignados.push(numeros_fichas[num_aleatorio]);
        numeros_fichas.splice(num_aleatorio, 1);

        // Ya que a medida que el vector "numeros_fichas_asignados" va creciendo, usamos su "length" para asignar el ID a cada Pieza
        document.getElementById("contenedor").innerHTML += `<div class="pieza"><img src="img/pieza_${numeros_fichas_asignados.length}.png" alt="" onclick="evaluar(this.id)" id="${numeros_fichas_asignados.length - 1}"></div>`;
    } while (numeros_fichas.length != 0);
    console.log(numeros_fichas_asignados);
}

function evaluar(elID) {
    // Se fija si el Countdown está activo, de no estarlo, lo activa.
    if (countdown_activo == 0) {
        setIntervalCountdown = setInterval(timer_countdown, 1000);
        countdown_activo = 1;
    }

    /* Nos fijamos cuántas veces se ha hecho click, para saber si ya se han dado vuelta dos fichas,
    de ser así, se borran los valores de las piezas */
    if (num_pieza_i < 2) {
        num_pieza_i++;
    } else {
        num_pieza_i = 1;
        num_pieza1 = -1;
        num_pieza2 = -1;
    }

    elID = Number(elID);
    console.log("ID de la Pieza: " + elID);

    /* Evalúa si el Número almacenado en ese ID es menor a 8, para armar el nombre del archivo directamente,
    de lo contrario, le resta 10, para que caiga dentro de los números válidos de las imágenes */
    if (numeros_fichas_asignados[elID] <= 8) {
        document.getElementById(elID).src = "img/jeroglifico_" + numeros_fichas_asignados[elID] + ".png";
        num_pieza = numeros_fichas_asignados[elID];
    } else {
        document.getElementById(elID).src = "img/jeroglifico_" + (numeros_fichas_asignados[elID] - 10) + ".png";
        num_pieza = numeros_fichas_asignados[elID] - 10;
    }

    // Dependiendo de la cantidad de Piezas en las que se ha hecho click es 1 o 2, se le asigna el valor a Pieza1 o Pieza2
    console.log("Valor i: " + num_pieza_i);
    if (num_pieza_i == 1) {
        num_pieza1 = num_pieza;
        click_pieza1 = elID;
        document.getElementById(click_pieza1).classList.add("deshabilitarClick");
    } else {
        num_pieza2 = num_pieza;
        click_pieza2 = elID;
    }

    console.log(num_pieza1 + " " + num_pieza2);

    // Si se han dado vuelta 2 Piezas, entonces se evalúa si son Iguales
    if (num_pieza1 != -1 && num_pieza2 != -1) {
        if (num_pieza1 == num_pieza2) {
            console.log("HUBO MATCH!");
            aciertos++;
            document.getElementById(click_pieza1).classList.add("deshabilitarClick");
            document.getElementById(click_pieza2).classList.add("deshabilitarClick");
            document.getElementById(click_pieza1).style.filter = "grayscale(90%)";
            document.getElementById(click_pieza2).style.filter = "grayscale(90%)";
        } else {
            // Si no son Iguales, entonces las vuelve a su estado Original
            console.log("DIFERENTES");
            fallos++;
            energia.style.clipPath = "inset(0px calc((100% / " + cantidad_intentos + ") * (" + (cantidad_intentos - fallos) + ")) 0px 0px)";
            document.getElementById("contenedor").classList.add("deshabilitarClick");
            const espera_noMatch1 = setTimeout(noMatch1, 500);
        }
    }

    if (aciertos == 8) {
        document.getElementById("gana").style.display = "flex";
        clearInterval(setIntervalCountdown);
    }
    if (fallos >= cantidad_intentos) pierde();
}

function noMatch1() {
    document.getElementById(click_pieza1).classList.add("desapareceJeroglifico");
    document.getElementById(click_pieza2).classList.add("desapareceJeroglifico");
    espera_noMatch2 = setTimeout(noMatch2, 400);
}

function noMatch2() {
    document.getElementById(click_pieza1).src = "img/pieza_" + (click_pieza1 + 1) + ".png";
    document.getElementById(click_pieza2).src = "img/pieza_" + (click_pieza2 + 1) + ".png";
    document.getElementById(click_pieza1).classList.remove("deshabilitarClick");
    document.getElementById("contenedor").classList.remove("deshabilitarClick");

    document.getElementById(click_pieza1).classList.remove("desapareceJeroglifico");
    document.getElementById(click_pieza2).classList.remove("desapareceJeroglifico");

    document.getElementById(click_pieza1).classList.add("aparecePieza");
    document.getElementById(click_pieza2).classList.add("aparecePieza");
}

function timer_countdown() {
    countdown--;
    document.getElementById("countdown").innerText = "TIEMPO RESTANTE: " + countdown;
    if (countdown == 0) pierde();
}

function pierde() {
    document.getElementById("pierde").style.display = "flex";
    clearInterval(setIntervalCountdown);
}