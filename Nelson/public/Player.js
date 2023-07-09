
class Player{
    constructor(player){
        this.id = player.id;
        this.name = player.name;
        this.card=[];
        this.cardProva = null;
        this.certos = [];
        this.errados = [];
        this.ballcard=null;
    }


    //Função que cria um cartao com 5 coordenadas aleatorias
    CriarCard(coordenadas){
        while(this.card.length<5)
        {
            this.ballcard=random(coordenadas);
            if(this.card.includes(this.ballcard)){
            }else{
                this.card.push(this.ballcard);
            }
        }

    }

    //Função que cria um cartao com 5 coordenadas dos problemas iguais para todos
    CriarCardProva(coordenadas){
        for (let coord of coordenadas){
            this.card.push(coord)
        }
        

    }

    removeCoordenada(coordenada){

    }
}