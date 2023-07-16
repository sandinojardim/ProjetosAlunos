class Circle {
    constructor() {
        this.coordenadas = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
        this.coordenadasT = [30, 45, 60, 300, 315, 330]
        this.clickedCoordinate = null; // New property to store the clicked coordinate
        this.coord = [
            "(1,0)", "(√3/2,1/2)", "(√2/2,√2/2)",
            "(1/2,√3/2)", "(0,1)", "(-1/2,√3/2)",
            "(-√2/2,√2/2)", "(-√3/2,1/2)", "(-1,0)",
            "(-√3/2,-1/2)", "(-√2/2,-√2/2)", "(-1/2,-√3/2)",
            "(0,-1)", "(1/2,-√3/2,)", "(√2/2,-√2/2)",
            "(√3/2,-1/2)"];
        this.coordT = [   "(0,√3/3)", "(0,1*)","(0,√3)", 
                                "(0,-√3)", "(0,-1*)", "(0,-√3/3)"];
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
                                this.coordenadaToAngle.set("(0,√3/3)", 30);
                                this.coordenadaToAngle.set("(0,1*)", 45);
                                this.coordenadaToAngle.set("(0,√3)", 60);
                                this.coordenadaToAngle.set("(0,-√3)", 300);
                                this.coordenadaToAngle.set("(0,-1*)", 315);
                                this.coordenadaToAngle.set("(0,-√3/3)", 330);
    }

    //Função para criar o circulo trigonometrico
    DesenhaCircleBingo() {
        stroke(255);
        let radius = 200;
        let x, y;
        strokeWeight(2);
        fill(55, 50, 51);
        ellipse(width - 500, height / 2, radius * 2);
        strokeWeight(4);

        fill(255);
        line(width - 750, height / 2, width - 250, height / 2);
        line(width - 500, height / 2 - 250, width - 500, height / 2 + 250);
        line(width - 300, height / 2 - 350, width - 300, height / 2 + 350);

        strokeWeight(2);
        for (let i = 0; i < this.coordenadas.length; i++) {
            x = radius * cos(radians(this.coordenadas[i]));
            y = radius * -sin(radians(this.coordenadas[i]));

            fill(217, 217, 217);
            
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }
        for (let i = 0; i < this.coordenadasT.length; i++) {
            x = radius * cos(radians(0));
            y = radius * -tan(radians(this.coordenadasT[i]));

        
            fill(217, 217, 217);
            
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }

    }

    DesenhaCircleE() {
        stroke(255);
        let radius = 200;
        let x, y;
        strokeWeight(2);
        fill(55, 50, 51);
        ellipse(width - 500, height / 2, radius * 2);
        strokeWeight(4);

        fill(255);
        line(width - 750, height / 2, width - 250, height / 2);
        line(width - 500, height / 2 - 250, width - 500, height / 2 + 250);
        line(width - 300, height / 2 - 350, width - 300, height / 2 + 350);

        strokeWeight(2);
        for (let i = 0; i < this.coordenadas.length; i++) {
            x = radius * cos(radians(this.coordenadas[i]));
            y = radius * -sin(radians(this.coordenadas[i]));

            fill(217, 217, 217);
            
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }
        for (let i = 0; i < this.coordenadasT.length; i++) {
            x = radius * cos(radians(0));
            y = radius * -tan(radians(this.coordenadasT[i]));

        
            fill(217, 217, 217);
            
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }

    }

    DesenhaCircle(certos, errados, certosT, erradosT) {
        stroke(255);
        let radius = 200;
        let x, y;
        strokeWeight(2);
        fill(55, 50, 51);
        ellipse(width - 500, height / 2, radius * 2);
        strokeWeight(4);

        fill(255);
        line(width - 750, height / 2, width - 250, height / 2);
        line(width - 500, height / 2 - 250, width - 500, height / 2 + 250);
        line(width - 300, height / 2 - 350, width - 300, height / 2 + 350);

        strokeWeight(2);
        for (let i = 0; i < this.coordenadas.length; i++) {
            x = radius * cos(radians(this.coordenadas[i]));
            y = radius * -sin(radians(this.coordenadas[i]));
            fill(217, 217, 217);
            ellipse(x + width - 500, y + height / 2, 30, 30);
            for(const [index, certo] of certos.entries()){
                if (certo === this.coordenadas[i]) {
                    fill(0, 255, 0); // Set the fill color to green
                    ellipse(x + width - 500, y + height / 2, 30, 30);
                    fill(0, 0, 0); // Set the fill color to green
                    text(index+1, x + width - 500, y + height / 2); // Display the index
                    
                }
            }
            for(const [index, errado] of errados.entries()){
                if (errado === this.coordenadas[i]) {
                    fill(255, 0, 0); // Set the fill color to green
                    ellipse(x + width - 500, y + height / 2, 30, 30);
                    fill(0, 0, 0); // Set the fill color to green
                    text(index+1, x + width - 500, y + height / 2); // Display the index
                }
            }
            
            
        }
        for (let i = 0; i < this.coordenadasT.length; i++) {
            x = radius * cos(radians(0));
            y = radius * -tan(radians(this.coordenadasT[i]));
            fill(217, 217, 217);    
            ellipse(x + width - 500, y + height / 2, 30, 30);
            for(const [index, certo] of certosT.entries()){
                if (certo === this.coordenadasT[i]) {
                    fill(0, 255, 0); // Set the fill color to green
                    ellipse(x + width - 500, y + height / 2, 30, 30);
                    fill(0, 0, 0); // Set the fill color to green
                    text(index+certos.length, x + width - 500, y + height / 2); // Display the index
                    
                }
            }
            for(const [index, errado] of erradosT.entries()){
                if (errado === this.coordenadasT[i]) {
                    fill(255, 0, 0); // Set the fill color to green
                    ellipse(x + width - 500, y + height / 2, 30, 30);
                    fill(0, 0, 0); // Set the fill color to green
                    text(index+errados.length, x + width - 500, y + height / 2); // Display the index
                }
            }
        }

    }

    DesenhaCircle(certos, errados) {
        stroke(255);
        let radius = 200;
        let x, y;
        strokeWeight(2);
        fill(55, 50, 51);
        ellipse(width - 500, height / 2, radius * 2);
        strokeWeight(4);

        fill(255);
        line(width - 750, height / 2, width - 250, height / 2);
        line(width - 500, height / 2 - 250, width - 500, height / 2 + 250);
        line(width - 300, height / 2 - 350, width - 300, height / 2 + 350);

        strokeWeight(2);
        for (let i = 0; i < this.coordenadas.length; i++) {
            x = radius * cos(radians(this.coordenadas[i]));
            y = radius * -sin(radians(this.coordenadas[i]));
            fill(217, 217, 217);
            ellipse(x + width - 500, y + height / 2, 30, 30);
            //console.log(certos);
            for(let certo of certos){
                if(this.coord.includes(certo[0])){
                    if (this.coordenadaToAngle.get(certo[0]) === this.coordenadas[i]) {
                        fill(0, 255, 0); // Set the fill color to green
                        ellipse(x + width - 500, y + height / 2, 30, 30);
                        fill(0, 0, 0); // Set the fill color to green
                        text(certo[1], x + width - 500, y + height / 2); // Display the index
                        
                    }
                }
            }
            for(let errado of errados){
                if(this.coord.includes(errado[0])){
                    if (this.coordenadaToAngle.get(errado[0]) === this.coordenadas[i]) {
                        fill(255, 0, 0); // Set the fill color to green
                        ellipse(x + width - 500, y + height / 2, 30, 30);
                        fill(0, 0, 0); // Set the fill color to green
                        text(errado[1], x + width - 500, y + height / 2); // Display the index
                        
                    }

                }
            }  
        }
        for (let i = 0; i < this.coordenadasT.length; i++) {
            x = radius * cos(radians(0));
            y = radius * -tan(radians(this.coordenadasT[i]));
            fill(217, 217, 217);    
            ellipse(x + width - 500, y + height / 2, 30, 30);
            for(let certo of certos){
                if(this.coordT.includes(certo[0])){
                    if (this.coordenadaToAngle.get(certo[0]) === this.coordenadasT[i]) {
                        fill(0, 255, 0); // Set the fill color to green
                        ellipse(x + width - 500, y + height / 2, 30, 30);
                        fill(0, 0, 0); // Set the fill color to green
                        text(certo[1], x + width - 500, y + height / 2); // Display the index
                        
                    }
                }
            }
            for(let errado of errados){
                if(this.coordT.includes(errado[0])){
                    if (this.coordenadaToAngle.get(errado[0]) === this.coordenadasT[i]) {
                        fill(255, 0, 0); // Set the fill color to green
                        ellipse(x + width - 500, y + height / 2, 30, 30);
                        fill(0, 0, 0); // Set the fill color to green
                        text(errado[1], x + width - 500, y + height / 2); // Display the index
                        
                    }

                }
            }
        }

    }
}