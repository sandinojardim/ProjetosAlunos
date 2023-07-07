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
        this.players = [];
        this.coordenada = null;
        this.retirarCoordernada = false;
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