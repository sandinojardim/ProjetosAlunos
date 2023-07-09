class Sorteador {
    constructor() {
        this.coordenadas = [
            "(1,0)", "(√3/2,1/2)", "(√2/2,√2/2)",
            "(1/2,√3/2)", "(0,1)", "(-1/2,√3/2)",
            "(-√2/2,√2/2)", "(-√3/2,1/2)", "(-1,0)",
            "(-√3/2,-1/2)", "(-√2/2,-√2/2)", "(-1/2,-√3/2)",
            "(0,-1)", "(1/2,-√3/2,)", "(√2/2,-√2/2)",
            "(√3/2,-1/2)", "(0,√3/3)", "(0,1*)",
            "(0,√3)", "(0,-√3)", "(0,-1*)", "(0,-√3/3)"];

        this.coordenadasretiradas = [];
        this.coordenadasProva = [];
        this.players = new Map();
        this.coordenada = null;
        this.retirarCoordernada = false;

        this.coordenadaToAngle = new Map();
        this.coordenadaToAngle.set("(1,0)", 0);
        this.coordenadaToAngle.set("(√3/2,1/2)", 30);
        this.coordenadaToAngle.set("(√2/2,√2/2)", 45);
        this.coordenadaToAngle.set("(1/2,√3/2)", 60);
        this.coordenadaToAngle.set("(0,1)", 90);
        this.coordenadaToAngle.set("(-1/2,√3/2)", 120);
        this.coordenadaToAngle.set("(-√2/2,√2/2)", 135);
        this.coordenadaToAngle.set("(-√3/2,1/2)", 150);
        this.coordenadaToAngle.set("(-1,0)", 180);
        this.coordenadaToAngle.set("(-√3/2,-1/2)", 210);
        this.coordenadaToAngle.set("(-√2/2,-√2/2)", 225);
        this.coordenadaToAngle.set("(-1/2,-√3/2)", 240);
        this.coordenadaToAngle.set("(0,-1)", 270);
        this.coordenadaToAngle.set("(1/2,-√3/2,)", 300);
        this.coordenadaToAngle.set("(√2/2,-√2/2)", 315);
        this.coordenadaToAngle.set("(√3/2,-1/2)", 330);

    }
    //função que retirar uma coordenada do array de coordenadas
    retiraCoordenada() {
        this.coordenada = random(this.coordenadas);
        this.coordenadasretiradas.push(this.coordenada);
        for (var i = 0; i < this.coordenadas.length; i++) {
            if (this.coordenadas[i] == this.coordenada) {
                this.coordenadas.splice(i, 1);
            }
        }
    }
    retiraCoordenadas(numProblemas){
        while (this.coordenadasProva.length < numProblemas){
            let randomCoordinate = random(this.coordenadas);
            this.coordenadasProva.push(randomCoordinate);
            this.coordenadas = this.coordenadas.filter(coordinate => coordinate !== randomCoordinate);
        }
    }
    
    //Desenha a coordenadas que ja sairam
    DesenhaCoordenadas() {
        if (this.coordenadasretiradas.length > 0) {
            for (var i = 0; i < this.coordenadasretiradas.length; i++) {
                var k = 125;
                var l;
                if (i > 10) {
                    k = 380;
                    l = 550 + (i - 11) * 45;
                } else {
                    l = 550 + i * 45;
                }
                textSize(32);
                fill(255, 255, 255);
                text(this.coordenadasretiradas[i], k, l);
            }
        }
    }
    //Desenha a coordenadas da Prova
    DesenhaCoordenadasProva() {
        if (this.coordenadasProva.length > 0) {
            for (var i = 0; i < this.coordenadasProva.length; i++) {
                var k = 125;
                var l;
                if (i > 10) {
                    k = 380;
                    l = 550 + (i - 11) * 45;
                } else {
                    l = 550 + i * 45;
                }
                textSize(32);
                fill(255, 255, 255);
                text(this.coordenadasProva[i], k, l);
            }
        }
    }
    //desenha os players no ecra
    DesenhaPlayers() {
        for (var i = 0; i < this.players.length; i++) {
            var x = 0;
            var y;
            if (i > 15) {
                x = 230;
                y = 550 + (i - 16) * 45
            } else {
                y = 550 + i * 45;
            }
            textSize(32);
            fill(255, 255, 255);
            //textFont(font);
            text(this.players[i].name, 2025 + x, y);
        }
    }


}