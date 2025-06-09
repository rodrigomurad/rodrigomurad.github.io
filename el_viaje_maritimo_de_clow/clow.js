class clowFish {
    constructor(posX, posY, direccion, energia, vidas, ID) {
        this.ID = document.getElementById(ID);
        this.posX = posX;
        this.posY = posY;
        this.direccion = direccion;
        this.energia = energia;
        this.vidas = vidas;
    }
}

class classPez {
    constructor(posX, posY, nivelAgresividad, ID) {
        this.ID = document.getElementById(ID);
        this.nivelAgresividad = nivelAgresividad;
        this.posX = posX;
        this.posY = posY;
        this.delayStart;
        this.probabilidadDeMovimiento;
    }

    movimiento_horizontal() {
        if (this.posX <= (this.ID.getBoundingClientRect().width + 100) * -1) {
            this.posX = ancho_viewport + 5;
            this.posY = parseInt(((this.ID.id).slice(-1) - 1) * (alto_viewport / 3) + Math.floor(Math.random() * (alto_viewport / 3 - 100)));
            this.delayStart = Math.floor((Math.random() * 400));
            this.nivelAgresividad = Math.floor((Math.random() * 3));

            // Dependiendo del Nivel de Agresividad se le asigna un Pez
            switch (this.nivelAgresividad) {
                case 0:
                    this.ID.src = imagenesPeces[Math.floor((Math.random() * 5) + 3) + 1].src;
                    break;
                case 1:
                    this.ID.src = imagenesPeces[Math.floor((Math.random() * 2) + 1) + 1].src;
                    break;
                case 2:
                    this.ID.src = imagenesPeces[1].src;
                    break;
            }
        } else {
            if (this.delayStart <= 0) this.posX -= 2;
            this.delayStart -= 1;
        }
    }

    movimiento_vertical(clowPosY, clowPosX) {
        this.probabilidadDeMovimiento = Math.floor((Math.random() * 100 + 1));

        // Dependiendo del Nivel de Agresividad, calcula si debe Moverse Verticalmente o No
        switch (this.nivelAgresividad) {
            case 1:
                (this.probabilidadDeMovimiento > 65) ? this.mueve = 1: this.mueve = 0;
                break;
            case 2:
                (this.probabilidadDeMovimiento >= 50) ? this.mueve = 1: this.mueve = 0;
                break;
        }

        if (this.mueve == 1 && this.nivelAgresividad != 0 && this.delayStart <= 0) {
            if (clowPosY != this.posY && clowPosY + 1 != this.posY && clowPosY - 1 != this.posY && clowPosX <= this.posX) {
                // Dependiendo del Nivel de Agresividad elige la Velocidad (desplazamiento en px) del Pez
                (this.nivelAgresividad == 1) ? this.desplaza = 1: this.desplaza = 1.5;
                // Mueve los Peces Verticalmente solo si Clow está dentro de su Campo Visible
                (clowPosY < this.posY) ? this.posY -= this.desplaza: this.posY += this.desplaza;
            }
        }
    }
}

class classBurbuja {
    constructor(posX, posY, ID, letra) {
        this.ID = document.getElementById(ID);
        this.posX = posX;
        this.posY = posY;
        this.letra = letra;
        this.delayStart;
    }

    movimiento_vertical() {
        if (this.posY <= -100) {
            this.posY = alto_viewport + 5;

            // document.getElementById('letra' + i).innerText = this.letra;

            /* Para elegir la nueva Letra de la Burbuja, se genera un Número Aleatorio entre 1 y 2.
            Si el valor es 1: se le asigna un Número (una Letra) al Azar.
            Si el valor es 2: se le asigna un una de las Letras de la Palabra Elegida. */
            switch (Math.floor(Math.random() * 2 + 1)) {
                case 1:
                    this.letra = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
                    break;
                case 2:
                    this.letra = palabra_elegida[Math.floor(Math.random() * palabra_elegida.length)];
                    break;
            }

            // Le agrega un pequeño Giro a las Letras
            switch (Math.floor(Math.random() * 2 + 1)) {
                case 1:
                    document.getElementById('letra' + (this.ID.id).slice(-1)).style.transform = "rotate(-20deg)";
                    break;
                case 2:
                    document.getElementById('letra' + (this.ID.id).slice(-1)).style.transform = "rotate(20deg)";
                    break;
            }

            document.getElementById('letra' + i).innerText = this.letra;

            this.delayStart = Math.floor((Math.random() * 100));
        } else {
            if (this.delayStart <= 0) this.posY -= 2;
            this.delayStart -= 1;
        }
    }
}

let palabras = ["ABETO", "ACTOR", "AGUAS", "AGUDO", "ALADO", "ALBAS", "ALTAR", "ATIZO", "AVALA", "BABAS", "BACAS", "BACHE", "BAJES", "BALAS", "BICHO", "BIZCO", "BUENO", "BUSCA", "CABRA", "CAJAS", "CALAR", "CALAS", "CALCA", "CALLA", "CALMA", "CAMBA", "CAMPO", "CANAS", "CAPTO", "CARAS", "CARRO", "CASAS", "CATAR", "CEJAS", "CELIA", "CENAS", "CEPAS", "CERCA", "CERCO", "CERDO", "CHILE", "CHINA", "CIEGO", "CINES", "CITAS", "CLARA", "CLAVO", "COLAS", "COLON", "CORAL", "CORAS", "COREA", "CORRO", "COSAS", "COSTO", "CRUDO", "CURAR", "DADOS", "DAGAS", "DATOS", "DAÑOS", "DEJAR", "DEJES", "DENSO", "DICES", "DOTES", "DUNAS", "DURES", "DUROS", "ELLOS", "EDITO", "ELEVO", "EMULO", "ENOJE", "ERROR", "FALLO", "FALTO", "FERIA", "FIJOS", "FILAS", "FILIA", "FINCA", "GAFAS", "GALAS", "GALES", "GALOS", "GANAS", "GANES", "GASES", "GASTO", "GIRAS", "GORDO", "GORRO", "GRAVE", "GRITO", "HACER", "HALOS", "HASTA", "HECES", "HIELO", "IDEAS", "INDIA", "INFLO", "ISLAS", "JEFAS", "JERGA", "JULIO", "MALOS", "MARCA", "MARCO", "MENOS", "METER", "METRO", "MOLER", "MONTE", "MORIR", "NACER", "NADAR", "NARRO", "NATAS", "NAVES", "NECIO", "NIÑOS", "NOTAS", "NUBES", "OBRAS", "OCIOS", "OLLAS", "ONDAS", "ONZAS", "OPERA", "OTROS", "OVULO", "PALAS", "PEDIR", "PELEA", "PELOS", "PERAS", "PERRO", "PESOS", "PILAS", "PINTO", "PODER", "QUEDO", "QUEMA", "QUITO", "RELOJ", "RUBIO", "RASCO", "RATAS", "RATOS", "REDES", "REMAR", "RENOS", "RENTA", "SABIO", "SACAR", "SALIR", "SELVA", "SANAR", "SOPAS", "SECAR", "SERIO", "SOBAR", "SONAR", "SUBIR", "SUCIO", "SIETE", "TABLA", "TACOS", "TANIA", "TAPAS", "TAZAS", "TENER", "TENIS", "TERCO", "TERSO", "TEXAS", "TIPOS", "TIRAS", "TODAS", "TODOS", "TOMAR", "TONOS", "TOQUE", "TORPE", "TROTE", "VACAS", "VAGOS", "VALER", "VALOR", "VECES", "VEDAS", "VELAS", "VEMOS", "VENAS", "VENIR", "VERDE", "VIERA", "VIGAS", "VINOS", "VIVIR", "VOLAR", "VOTAR", "YATES", "YEMAS", "YENDO", "YENES", "YOGUR", "YUGOS", "ZORRO", "ZURDO"];
let palabra_elegida;

console.log("INICIO PARTIDA");
// Seteamos los Datos del Usuario que necesitaremos para el SQL
let id_usuario = "38195900",
    nivel = 1,
    completado = 0;

// Guardamos Año, Mes, Día, Hora, Minutos y Segundos en que empieza la Partida
let recuperador_fecha = new Date();
let anio = recuperador_fecha.getFullYear();
let mes = recuperador_fecha.getMonth();
let dia = recuperador_fecha.getDate();
let tiempo_inic = (recuperador_fecha.getHours()).toString().padStart(2, '0');
tiempo_inic += (recuperador_fecha.getMinutes()).toString().padStart(2, '0');
tiempo_inic += (recuperador_fecha.getSeconds()).toString().padStart(2, '0');
let errores = 0,
    aciertos = 0;

let i, altura_planta, pezPosY, pezPosX;
let plantas = new Array();
let imagenesClow = new Array();
imagenesClow[0] = new Image();
imagenesClow[0].src = './img/clowR.png';
imagenesClow[1] = new Image();
imagenesClow[1].src = './img/clowL.png';
let dedo = document.getElementById("dedo");
let alto_viewport = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let ancho_viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let imagenesPeces = new Array();
let pez = new Array();
let pezColision = new Array();
let colliderClow, colliderPez, colliderDistancia, colisionando = false;

let burbujaPosX, burbujaPosY, letraBurbuja;
let burbuja = new Array();

// Preparamos el Escenario
function prepara_escenario() {
    // Elegimos la Palabra y la Cargamos
    palabra_elegida = palabras[Math.floor((Math.random() * palabras.length))];
    document.getElementById("palabraElegida").innerText = palabra_elegida;

    // Creamos las Burbujas
    for (i = 1; i <= 3; i++) {
        burbujaPosX = ancho_viewport / 4 * i;
        burbujaPosY = alto_viewport + 5;
        letraBurbuja = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        burbuja[i] = new classBurbuja(burbujaPosX, burbujaPosY, 'burbuja' + i, letraBurbuja);
        burbuja[i].delayStart = Math.floor((Math.random() * 100));
        burbuja[i].ID.style.left = burbuja[i].posX + "px";
        burbuja[i].ID.style.top = burbuja[i].posY + "px";
        burbuja[i].letra = letraBurbuja;

        // Le agrega un pequeño Giro a las Letras
        switch (Math.floor(Math.random() * 2 + 1)) {
            case 1:
                document.getElementById('letra' + i).style.transform = "rotate(-20deg)";
                break;
            case 2:
                document.getElementById('letra' + i).style.transform = "rotate(20deg)";
                break;
        }
        document.getElementById('letra' + i).innerText = letraBurbuja;
    }

    // Sustituímos la letra de una de las Burbujas, por alguna que esté en la Palabra
    i = Math.floor((Math.random() * 3) + 1);
    burbuja[i].letra = palabra_elegida[Math.floor(Math.random() * palabra_elegida.length)];
    document.getElementById('letra' + i).innerText = burbuja[i].letra;

    // Cargamos las Imágenes de los Peces
    for (i = 1; i <= 9; i++) {
        imagenesPeces[i] = new Image();
        imagenesPeces[i].src = './img/pez_0' + i + '.png';
    }

    for (i = 1; i <= 3; i++) {
        pezPosY = parseInt((i - 1) * (alto_viewport / 3) + Math.floor(Math.random() * (alto_viewport / 3 - 100)));
        pezPosX = ancho_viewport + 5;

        pez[i] = new classPez(pezPosX, pezPosY, Math.floor((Math.random() * 3)), 'pez' + i);
        pez[i].delayStart = Math.floor((Math.random() * 400));

        pez[i].ID.style.left = pez[i].posX + "px";
        pez[i].ID.style.top = pez[i].posY + "px";

        // Dependiendo del Nivel de Agresividad se le asigna un Pez
        switch (pez[i].nivelAgresividad) {
            case 0:
                pez[i].ID.src = imagenesPeces[Math.floor((Math.random() * 6) + 3) + 1].src;
                break;
            case 1:
                pez[i].ID.src = imagenesPeces[Math.floor((Math.random() * 2) + 1) + 1].src;
                break;
            case 2:
                pez[i].ID.src = imagenesPeces[1].src;
                break;
        }
    }

    // Coloca las Plantas
    for (i = -50; i <= ancho_viewport + 50; i += 70) {
        // Coloca la Primera Línea de Plantas
        altura_planta = Math.floor((Math.random() * (alto_viewport - (alto_viewport - 75)) + (alto_viewport - 105)));
        document.getElementById("fauna1").insertAdjacentHTML("beforeend", "<img src='./img/planta_" + Math.floor((Math.random() * 12 + 1)) + ".png' style='left: " + (i - 70) + "px; top: " + altura_planta + "px;' class='plantas1'>");

        // Coloca la Segunda Línea de Plantas
        altura_planta = Math.floor((Math.random() * (alto_viewport - (alto_viewport - 75)) + (alto_viewport - 135)));
        document.getElementById("fauna2").insertAdjacentHTML("beforeend", "<img src='./img/planta_" + Math.floor((Math.random() * 12 + 1)) + ".png' style='left: " + i + "px; top: " + altura_planta + "px;' class='plantas2'>");
    }

    mueveBurbujas = setInterval(() => {
        for (i = 1; i <= 3; i++) {
            burbuja[i].movimiento_vertical();
            burbuja[i].ID.style.top = burbuja[i].posY + "px";

            // Chequea si Clow tocó alguna Burbuja
            chequeaColisionBurbuja(clow.ID.getBoundingClientRect(), burbuja[i].ID.getBoundingClientRect(), i);
        }
    }, 25);

    muevepez = setInterval(() => {
        for (i = 1; i <= 3; i++) {
            pez[i].movimiento_horizontal();
            pez[i].ID.style.left = pez[i].posX + "px";
            pez[i].movimiento_vertical(clow.ID.getBoundingClientRect().top, clow.ID.getBoundingClientRect().left);
            pez[i].ID.style.top = pez[i].posY + "px";

            // Chequeamos si Clow Colisionó con algún Pez
            chequeaColision(clow.ID.getBoundingClientRect(), pez[i].ID.getBoundingClientRect(), i);
        }

        // Si Hubo Colisión y no estaba Colisionando, entonces Resta una Vida y marca que está en estado de Colisión
        if (pezColision.some(huboColision => huboColision == 1) && colisionando == false) {
            clow.energia -= 10;
            colisionando = true;
            clow.ID.classList.add("hitPez");
            if (clow.energia <= 0) {
                clow.vidas--;
                clow.energia = 100;
            }

            if (clow.vidas <= 0) {
                clow.vidas = 0;
                clow.energia = 0;
                document.getElementById("gana").style.display = "flex";
            }
        }
        document.getElementById("vidas").innerHTML = clow.vidas;
        document.getElementById("energia").innerHTML = clow.energia;

        // Si no se encontraron Colisiones en el Array Indicador de Colisiones, entonces marca que no está en estado de Colisión 
        if (!pezColision.some(huboColision => huboColision == 1)) {
            colisionando = false;
            clow.ID.classList.remove("hitPez");
        }

        // Vacía el Array Indicador de Colisiones
        pezColision = [];
    }, 5);

}

// Creamos a Clow
let clow = new clowFish(20, Math.floor(Math.random() * (alto_viewport - 290) + 180), 0, 100, 3, 'clow');
clow.ID.style.left = clow.posX + "px";
clow.ID.style.top = clow.posY + "px";

function chequeaColision(colliderClow, colliderPez, i) {
    // Collider Circular
    colliderDistancia = Math.sqrt(Math.pow((colliderClow.left - colliderPez.left), 2) + Math.pow((colliderClow.top - colliderPez.top), 2));

    if (colliderDistancia < (colliderClow.width / 2 - 10) + (colliderPez.width / 2 - 10)) {
        // Si se detectó Colisión, se fija si el Pez es Agresivo, y de ser así, se agrega un 1 avisando que ese Pez está Colisionando
        if (pez[i].nivelAgresividad > 0) pezColision.push(1);
    }
}

function chequeaColisionBurbuja(colliderClow, colliderBurbuja, i) {
    // Collider Circular
    colliderDistancia = Math.sqrt(Math.pow((colliderClow.left - colliderBurbuja.left), 2) + Math.pow((colliderClow.top - colliderBurbuja.top), 2));

    if (colliderDistancia < (colliderClow.width / 2) + (colliderBurbuja.width / 2)) {
        // Si se detectó Colisión, se fija si la Letra está en la Palabra, y de ser así, se suma un Punto
        if (palabra_elegida.indexOf(burbuja[i].letra) == -1) {
            errores++;
        } else {
            aciertos++;
            // Removemos la Letra de la Palabra y del Texto Visible
            palabra_elegida = palabra_elegida.replace(burbuja[i].letra, "");
            document.getElementById("palabraElegida").innerText = palabra_elegida;
        }

        burbuja[i].posY = -100;
        console.log("ERRORES: ", errores, " / ACIERTOS: ", aciertos);
        if (palabra_elegida.length == 0) {
            completado = 1;
            salir_juego();
        }
    }
}

window.addEventListener("click", (Event) => {
    if (Event.clientX < clow.ID.getBoundingClientRect().left) {
        clow.direccion = 1;
        clow.ID.src = imagenesClow[1].src;
        clow.ID.style.transform = "translate(" + (Event.clientX - clow.posX + 3) + "px, " + (Event.clientY - clow.posY - 47 + 6) + "px)";
    } else {
        clow.direccion = 0;
        clow.ID.src = imagenesClow[0].src;
        clow.ID.style.transform = "translate(" + (Event.clientX - clow.posX - 107 + 3) + "px, " + (Event.clientY - clow.posY - 47 + 6) + "px)";
    }
});

// Función que Captura el Movimiento del Mouse
window.addEventListener("mousemove", (Event) => {
    dedo.style.left = Event.clientX + 1 + "px";
    dedo.style.top = Event.clientY + 1 + "px";
});

function salir_juego() {
    // Generamos Todos los Datos que se Almacenarán en la Base de Datos (Tabla "Partida")
    let recuperador_fecha = new Date();
    anio = recuperador_fecha.getFullYear();
    mes = recuperador_fecha.getMonth();
    dia = recuperador_fecha.getDate();
    let tiempo_final = (recuperador_fecha.getHours()).toString().padStart(2, '0');
    tiempo_final += (recuperador_fecha.getMinutes()).toString().padStart(2, '0');
    tiempo_final += (recuperador_fecha.getSeconds()).toString().padStart(2, '0');

    // Código Generado de SQL
    console.log(">>> Código SQL");
    console.log('INSERT INTO partidas (rela_usuario, nivel, vidas, energia, anio, mes, dia, tiempo_inic, tiempo_final, errores, aciertos, completado) VALUES (' + id_usuario + ',' + nivel + ',' + clow.vidas + ',' + clow.energia + ',' + anio + ',' + mes + ',' + dia + ',"' + tiempo_inic + '","' + tiempo_final + '",' + errores + ',' + aciertos + ',' + completado + ');');

    // Código Generado de Node.js
    console.log(">>> Node.js");
    console.log('db.run(sql, [' + id_usuario + ',' + nivel + ',' + clow.vidas + ',' + clow.energia + ',' + anio + ',' + mes + ',' + dia + ',"' + tiempo_inic + '","' + tiempo_final + '",' + errores + ',' + aciertos + ',' + completado + '], (err) => {');


    // Copia el Código Generado de SQL en Memoria
    navigator.clipboard.writeText('INSERT INTO partidas (rela_usuario, nivel, vidas, energia, anio, mes, dia, tiempo_inic, tiempo_final, errores, aciertos, completado) VALUES (' + id_usuario + ',' + nivel + ',' + clow.vidas + ',' + clow.energia + ',' + anio + ',' + mes + ',' + dia + ',"' + tiempo_inic + '","' + tiempo_final + '",' + errores + ',' + aciertos + ',' + completado + ');')
        .then(() => {
            console.log('Sentencia SQL Copiada al Portapapeles');
        }, () => {
            console.error('ERROR: Falló la Copia al Portapapeles');
        });

    clearInterval(mueveBurbujas);
    clearInterval(muevepez);

    console.log("FIN PARTIDA");
}