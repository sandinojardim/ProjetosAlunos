class Circle {
    constructor() {
        this.coordenadas = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
        this.coordenadasT = [30, 45, 60, 120, 135, 150]
        this.clickedCoordinate = null; // New property to store the clicked coordinate

    }

    //Função para criar o circulo trigonometrico
    DesenhaCircle() {
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
            for(let certo of certos){
                if (certo === this.coordenadas[i]) {
                    fill(0, 255, 0); // Set the fill color to green
                }
            }
            for(let errado of errados){
                if (errado === this.coordenadas[i]) {
                    fill(255, 0, 0); // Set the fill color to green
                }
            }
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }
        for (let i = 0; i < this.coordenadasT.length; i++) {
            x = radius * cos(radians(0));
            y = radius * -tan(radians(this.coordenadasT[i]));
            fill(217, 217, 217);    
            for(let certo of certos){
                if (certo === this.coordenadasT[i]) {
                    fill(0, 255, 0); // Set the fill color to green
                }
            }
            for(let errado of errados){
                if (errado === this.coordenadasT[i]) {
                    fill(255, 0, 0); // Set the fill color to green
                }
            }
            ellipse(x + width - 500, y + height / 2, 30, 30);
        }

    }
}