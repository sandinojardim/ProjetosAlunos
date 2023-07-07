
class Player{
    constructor(player){
        this.id = player.id;
        this.name = player.name;
        this.card=[];
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
}