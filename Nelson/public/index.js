var socket;
var Sor;
var scene = 1;
var contem = 0;
var button;
var lines = [];
var playerName;
var playerId;
var p = [];
var carta = false;
var circle;
var sorteador = false;
var first = true;
var modo;
var modoProva = false;
var modoBingoButtonVisible = false;
var modoProvaButtonVisible = false;
var i = 1;
var gameStarted = false;
var numProblemas = 0;
var tempo;
var startTime;
var problemasProva = null;
var certos = [];
var countCertos = 0;
var errados = [];

//Função para carregar a media
function carregaMedia() {
  bgImg = loadImage("media/Background.png");
  Bingo = loadImage("media/Bingo.png");


  /*
    *
    *   Botões do ecrã inicial 
    * 
  */
  Criar = loadImage("media/CriarButton.png");
  CriarActive = loadImage("media/CriarActiveButton.png");
  Entrar = loadImage("media/EntrarButton.png");
  EntrarActive = loadImage("media/EntrarActiveButton.png");

  ModoBingo = loadImage("media/BingoModeButton.png");
  ModoBingoAtivo = loadImage("media/BingoModeActiveButton.png");
  ModoProva = loadImage("media/ProvaModeButton.png");
  ModoProvaAtivo = loadImage("media/ProvaModeActiveButton.png");

  Comecar = loadImage("media/ComecarButton.png");
  ComecarActive = loadImage("media/ComecarActiveButton.png");

  Seguinte = loadImage("media/SeguinteButton.png");
  SeguinteActive = loadImage("media/SeguinteActiveButton.png");

  Desafios = loadImage("media/DesafiosActive.png")
  Tempo = loadImage("media/TempoActive.png")

  Info = loadImage("media/InfoButton.png");
  InfoJogador = loadImage("media/InfoJogador.png");
  InfoSorteador = loadImage("media/InfoShown.png");

  BingoTitulo = loadImage("media/BingoTitulo.png");
  ProvaTitulo = loadImage("media/ProvaTitulo.png");
  Card = loadImage("media/Card.png");


  Logo = loadImage("media/LogoV1.png");
}

function setup() {
  //tamanho do canvas
  createCanvas(windowWidth, windowHeight);
  //carrega a media
  carregaMedia();
  //conexão ao servidor
  socket = io.connect('http://localhost:3000');
  //---
  //Criação de botoes
  var col = color(200, 255, 255);
  button = createImg("media/Rodar.png");
  button.style('background-color', col);
  button.mousePressed(changeBG);
  button.hide();

  problemasInput = createSelect();
  problemasInput.position(1000, 500);
  problemasInput.size(552, 52);
  problemasInput.option("3 Problemas",3)
  problemasInput.option("6 Problemas",6)
  problemasInput.option("9 Problemas",9)
  problemasInput.hide()

  tempoInput = createSelect();
  tempoInput.position(1000, 900);
  tempoInput.size(552, 52);
  tempoInput.option("1 minuto",60000)
  tempoInput.option("2 minutos",120000)
  tempoInput.option("5 minutos",300000)
  tempoInput.hide()

  //Cria um novo sorteador
  Sor = new Sorteador();

  usernameInput = createInput('Nome de jogador', 'text');
  usernameInput.position(width / 2 - 280, 550);
  usernameInput.size(552, 52);
  usernameInput.hide();
}
function draw() {
  //scale(0.5);
  //Define em que pagina estamos
  switch (scene) {
    case 1:
      // --- FIRST ---
      page1();
      break;
    case 2:
      // --- NOME ---
      page2();
      break;
    case 3:
      // --- SORTEADOR ---
      page3();
      break;
    case 4:
      // --- JOGADOR ---
      page4();
      break;
    case 5:
      // --- VENCEDOR ---
      page5();
      break;
    case 6:
      page6();
      break;
    case 7:
      page7(); //tempo esgotado
      break;
    default:
      break;
  }

  //confirma se alguem ganhou o jogo
  if (contem == 5) {
    socket.emit('emiteGanhou', playerName);
    scene = 5;
  };
}

function selecionarModoBingo() {
  modoBingoButtonVisible = false;
  modoProvaButtonVisible = false;
  scene = 3;
  socket.on('players', recebePlayers);
  console.log('MODO BINGO');
  mode = 'bingo';
  socket.emit('modo',mode);
}
function selecionarModoProva() {
  modoBingoButtonVisible = false;
  modoProvaButtonVisible = false;
  scene = 6;
  socket.on('players', recebePlayers);
  console.log('MODO PROVA');
  mode = 'prova';
  modoProva = true
  socket.emit('modo', mode);
}
//pagina Inicial
function page1() {
  //recebe o estado do sorteador
  socket.on('sorteadorEstado', estadoSorteador);
  background(bgImg);
  image(Logo, width / 2 - 376, 200);

  /*
    *
    *  Verificação se já existe um jogo criado,
    *  esta verificação vai alternar entre o 
    *  botão de criar jogo e entrar no jogo.
    *  
  */
  if (!sorteador) {
    if (!modoProvaButtonVisible && !modoBingoButtonVisible) {
      image(Criar, width / 2 - 280, 550);
      if (mouseX > (width / 2 - 280) && mouseX < (width / 2 + 288) && mouseY > 550 && mouseY < 602) {
        image(CriarActive, width / 2 - 280, 550);
      }
      image(Info, width / 2 - 280, 625);
      if (mouseX > (width / 2 - 280) && mouseX < (width / 2 + 288) && mouseY > 625 && mouseY < 677) {
        image(InfoSorteador, width / 2 - 280, 625);
      }
    }
  } else {
    image(Entrar, width / 2 - 280, 550);
    if (mouseX > (width / 2 - 280) && mouseX < (width / 2 + 288) && mouseY > 550 && mouseY < 602) {
      image(EntrarActive, width / 2 - 280, 550);
      if (mouseIsPressed) {
        scene = 2;
        socket.on('players', recebePlayers);
      }
    }
  }

  //recebe o id do player que se conectou
  socket.on('playerId', pID);

  if (modoBingoButtonVisible) {
    image(ModoBingo, width / 2 - 280, 550);
    if (mouseX > (width / 2 - 280) && mouseX < (width / 2 - 20) && mouseY > 550 && mouseY < 602) {
      image(ModoBingoAtivo, width / 2 - 280, 550);
    }
  }
  if (modoProvaButtonVisible) {
    image(ModoProva, width / 2 + 10, 550);
    if (mouseX > (width / 2 + 10) && mouseX < (width / 2 + 270) && mouseY > 550 && mouseY < 602) {
      image(ModoProvaAtivo, width / 2 + 10, 550);
    }
  }

  //se clicar no primeiro botao "Criar" vai para a pagina do sorteador
  if (mouseX > (width / 2 - 150) && mouseX < (width / 2 + 210) && mouseY > 500 && mouseY < 607) {
    if (sorteador == false) {
      if (mouseIsPressed) {
        // Exibir os botões "Modo Bingo" e "Modo Prova"
        setTimeout(() => {
          modoBingoButtonVisible = true;
          modoProvaButtonVisible = true;
        }, 200);
      }
    }
  }
  if (mouseX > (width / 2 - 280) && mouseX < (width / 2 - 20) && mouseY > 550 && mouseY < 602) {
    if (sorteador == false && modoBingoButtonVisible == true) {
      if (mouseIsPressed) {
        selecionarModoBingo();
      }
    }
  }
  if (mouseX > (width / 2 + 10) && mouseX < (width / 2 + 270) && mouseY > 550 && mouseY < 602) {
    if (sorteador == false && modoProvaButtonVisible == true) {
      if (mouseIsPressed) {
        selecionarModoProva();
      }
    }
  }

  //se clicar no segundo botao "Entao" vai para a pagina do Jogador
  if (mouseX > (width / 2 - 210) && mouseX < (width / 2 + 150) && mouseY > 650 && mouseY < 757) {
    if (sorteador == true) {
      if (mouseIsPressed) {
        scene = 2;
        socket.on('players', recebePlayers);
      }
    }
  }
}
//Função que recebe o estado do sorteador
function estadoSorteador(data) {
  sorteador = data;
}


//pagina do introduzir nome
function page2() {
  background(bgImg);
  usernameInput.show();
  image(Logo, width / 2 - 376, 200);
  image(Seguinte, width / 2 - 280, 625);
  if (mouseX > (width / 2 - 280) && mouseX < (width / 2 + 288) && mouseY > 625 && mouseY < 677) {
    image(SeguinteActive, width / 2 - 280, 625);
    if (mouseIsPressed) {
      Nome();
    }
  }
}
//pagina do sorteador
function page3() {
  background(bgImg);
  socket.on('ganhou', ganhouJogo);
  if(modo == 'bingo'){
   	image(BingoTitulo, 100, 100);
  }else{
  	image(ProvaTitulo, 100, 100);
  }
  image(Card, 100, 400);
  image(Card, 2000, 400);
  if (!gameStarted) {
    image(Comecar, 100, 325);
    if (mouseX > 100 && mouseX < 668 && mouseY > 325 && mouseY < 377) {
      image(ComecarActive, 100, 325);
      if (mouseIsPressed) {
        gameStarted = true;
        changeBG();
      }
    }
  }
  textSize(48);
  text("Valores Sorteados", 125, 465);
  text("Jogadores", 2025, 465);
  fill(255, 255, 255);
  sorteador = true;
  //manda para o servidor a informação que ja existe sorteador
  socket.emit('sorteador', sorteador);
  //chama a função para Desenhar  os PLayers da Class sorteador
  Sor.DesenhaPlayers();
  //chama a função para Desenhar as coordenadas da Class sorteador
  Sor.DesenhaCoordenadas();
}
//função para retirar a coordenada e mandar para o servidor
function changeBG() {
  if (first) {
    Sor.retiraCoordenada();
    //manda para o servidor a coordenada retirada
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }
  }
  setInterval(() => {
    first = false;
    //chama a função retirar a coordenada da Class sorteador
    Sor.retiraCoordenada();
    //manda para o servidor a coordenada retirada
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }
  }, 5000);
}
//pagina do jogador
function page4() {
  
  //Cria um novo Circulo
  if(modo == 'bingo'){
    //console.log(modo)
    circle = new Circle(Sor.coordenadas);
    //Recebe a coordenada do servidor
    socket.on('recebeBola', numeroBall);
    //recebe se alguem ganhou o jogo
    socket.on('ganhou', ganhouJogo);
    background(bgImg);
    image(BingoTitulo, 100, 100);
    image(Card, 100, 400);
    //chama a função para criar o cartao
    for (var i = 0; i < Sor.players.length; i++) {
      if (playerId == Sor.players[i].id && carta == false) {
        p = Sor.players[i];
        p.CriarCard(Sor.coordenadas);
        carta = true;
      }
    }

    //desenha o cartao e as coordenadas dele
    desenhar();
    //desenha o circulo trigonometrico
    circle.DesenhaCircle();
    //desenha as linhas
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] != null) {
        stroke(0, 100, 0);
        strokeWeight(4);

        lines[i].display();
      }

    }
    if(mouseIsPressed){
      mouseClicked()
      scene=4
    }
  }else{//Modo Prova
    socket.on('tempo',recebeTempos);
    const currentTime = millis();
    const elapsedTime = currentTime - startTime;
    timeLeft = tempo - elapsedTime;
    //console.log(currentTime+' '+elapsedTime+' '+timeLeft+' '+tempo+' '+startTime)
    if (timeLeft <= 0) {
      // Time has ended, transition to page7
      scene = 7;
      return;
    } 
    background(bgImg);
    image(ProvaTitulo, 100, 100);
    image(Card, 100, 400);

    // Display the time remaining
    const seconds = Math.ceil(timeLeft / 1000);
    //console.log(seconds);
    textSize(60);
    fill(255,255,255);
    text("Tempo restante: " + seconds + "s", 1000, 1000);
    //Recebe a coordenada do servidor
    socket.on('recebeProblemas', problemas);
    circle = new Circle(Sor.coordenadasProva);
    //recebe se alguem ganhou o jogo
    socket.on('ganhou', ganhouJogo);
    

    //for (var i = 0; i < Sor.players.length; i++) {
      if (problemasProva != null) {
        p = Sor.players.get(playerId);
        if(p.card.length == 0){
          p.CriarCardProva(problemasProva);
        }

      }
    //}
    
    //desenha o cartao e as coordenadas dele
    desenharProva(Sor.coordenadasProva, circle);
    //desenha o circulo trigonometrico
    circle.DesenhaCircle(certos, errados);
    //desenha as linhas
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] != null) {
        stroke(0, 100, 0);
        strokeWeight(4);

        lines[i].display();
      }

    }
    // if(mouseIsPressed){
    //   mouseClicked()
    //   scene=4
    // }

  }
}
function page6() {
  background(bgImg);
  socket.on('ganhou', ganhouJogo);
  image(ProvaTitulo, 100, 100);
  image(Card, 100, 400);
  image(Card, 2000, 400);
  image(Desafios, 1000, 400);
  
  problemasInput.show()
  

  image(Tempo, 1000, 800);
  tempoInput.show()

  

  if (!gameStarted) {
    image(Comecar, 100, 325);
    if (mouseX > 100 && mouseX < 668 && mouseY > 325 && mouseY < 377) {
      image(ComecarActive, 100, 325);
      if(mouseIsPressed){
        numProblemas = parseInt(problemasInput.value())
        tempo = parseInt(tempoInput.value())
        gameStarted = true;
        //startTime = millis();
        changeBG(numProblemas, tempo);
      }
      
    }
  }
  textSize(48);
  text("Valores Sorteados", 125, 465);
  text("Jogadores", 2025, 465);
  fill(255, 255, 255);
  sorteador = true;
  //manda para o servidor a informação que ja existe sorteador
  socket.emit('sorteador', sorteador);
  //chama a função para Desenhar  os PLayers da Class sorteador
  var player_acertos = new Map()
  for (let player of Sor.players.values()) {
    socket.emit('getCertos',player.id);
    socket.on('recebeAcertos',recebeAcertos)
    player_acertos.set(player.id,countCertos)
    
  }
  Sor.DesenhaPlayers(player_acertos);
  //chama a função para Desenhar as coordenadas da Class sorteador
  Sor.DesenhaCoordenadasProva();
}
//função para retirar a coordenada e mandar para o servidor
function changeBG() {
  if (first) {
    Sor.retiraCoordenada();
    //manda para o servidor a coordenada retirada
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }
  }
  setInterval(() => {
    first = false;
    //chama a função retirar a coordenada da Class sorteador
    Sor.retiraCoordenada();
    //manda para o servidor a coordenada retirada
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }
  }, 5000);
}

function changeBG(numProblemas, tempo){
  Sor.retiraCoordenadas(numProblemas);
  var infotempo = [];
  infotempo.push(tempo);
  startTime = millis()
  infotempo.push(startTime)
  socket.emit('emitProblemas',Sor.coordenadasProva);
  socket.emit('emitTempo',infotempo);
}

/*function changeBG(numProblemas, tempo) {
  if (first) {
    Sor.retiraCoordenada();
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }
  }

  var counter = 1;
  var intervalID = setInterval(() => {
    if (counter >= numProblemas) {
      clearInterval(intervalID);
      contem = 5;
      return;
    }

    Sor.retiraCoordenada();
    socket.emit('emitBola', Sor.coordenada);
    if (Sor.coordenada == null) {
      playerName = "Ninguem";
      contem = 5;
    }

    counter++;
  }, tempo);
} //função para versão bingo/prova */

//função para desenhar as coordenadas do cartao e a coordenada que saiu
function desenhar() {
  if (p.card != null) {
    for (var i = 0; i < 5; i++) {
      fill(255);
      textSize(32);
      text(p.card[i], 125, 550 + i * 45);
    }
  }

  if (Sor.coordenada != null) {
    fill(255);
    textSize(32);
    text(Sor.coordenada, width / 2, 550);
  }
}

//função para desenhar as coordenadas do cartao e a coordenada que saiu
var clickedCoordinate = null;
function desenharProva(coordenadas, circle) {
  
  if (p.card != null) {
    for (var i = 0; i < 5; i++) {
      fill(255);
      textSize(32);
      text(p.card[i], 125, 550 + i * 45);

      if (mouseIsPressed && mouseX > 125 && mouseX < 225 && mouseY > 550 + i * 45 - 32 && mouseY < 550 + i * 45) {
        clickedCoordinate = p.card[i]; // Store the clicked coordinate
        mouseIsPressed = false
        // You can perform further actions with the clicked coordinate here
      }
      if (clickedCoordinate != null){
        var angleClicked = Sor.coordenadaToAngle.get(clickedCoordinate)
        // Check if a mouse click occurred within the circle area
          if (mouseIsPressed && mouseX > width - 700 && mouseX < width - 300 && mouseY > height / 2 - 350 && mouseY < height / 2 + 350) {
            // Calculate the angle of the clicked position
            let angle = degrees(atan2(mouseY - height / 2, mouseX - (width - 500)));
            if (angle < 0) {
              angle += 360; // Adjust negative angles to positive values
            }
            angle = 360 - angle; // Reverse the direction of the angle

            // Check if the clicked position matches any of the coordinates
            
              mouseIsPressed = false
              if (round(angle) >= angleClicked - 2 && round(angle) <= angleClicked + 2) { //tolerance
                // Student is correct
                alert("Student is correct for coordinate: " + clickedCoordinate);
                for (var j = 0; j < p.card.length; j++) {
                  if(p.card[j] == clickedCoordinate){
                    certos.push(angleClicked)
                    socket.emit('acerto',p.id)
                    
                  }
                }
              }else{
                for (var j = 0; j < p.card.length; j++) {
                  if(p.card[j] == clickedCoordinate){
                    errados.push(angleClicked);
                  }
                }
              }
            
          }
          fill(255);
          textSize(32);
          text(clickedCoordinate, width / 2, 550);
        }
      }

      
      
  }

}
function recebeAcertos(data){
  countCertos = data
}

//função que recebe os Jogadores,Criar um novo array de "Player" e verificar que ja Existe esse player
//pelo Id tambem remove o player do array se ele sair
function recebePlayers(data) {
  var removedPlayers = Array.from(Sor.players.values()).filter(p => data.findIndex(s => s.id === p.id) === -1);
  for (let player of removedPlayers) {
    removePlayer(player.id);
  }
  for (var i = 0; i < data.length; i++) {
    var playersServer = data[i];
    if (!playerExiste(playersServer)) {
      Sor.players.set(playersServer.id, new Player(playersServer));
    }
  }

}
//verificar que o Id do jogador Existe
function playerExiste(playersServer) {
  for (let player of Sor.players.values()) {
    if (player.id === playersServer.id) {
      return true;
    }
  }
  return false;
}
//se o Id do Jogador sair do servidor cria um novo array sem esse Jogador
function removePlayer(playerId) {
  Sor.players.delete(playerId);
}

//Função que recebe a coordenada
function numeroBall(data) {
  Sor.coordenada = data;
}

function problemas(data){
  Sor.coordenadasProva = data
  problemasProva = data

}
function recebeTempos(data){
  tempo = data[0];
  startTime = data[1];

}
//Função que recebe se alguem ganhou o Jogo
function ganhouJogo(data) {
  playerName = data;
  contem = 5;
}
//função que é chamada pelo botao quando se Introduz o nome e manda a informação para o servidor
//do Jogador
function Nome() {
  playerName = usernameInput.value();
  var data = {
    id: playerId,
    name: playerName,
  }
  // manda para o servidor o nome e o id do Jogador
  socket.emit('playerName', data);
  usernameInput.hide();
  scene = 4;
}
//recebe o Id quem entrou no servidor
function pID(data) {
  playerId = data;
}
//função para o "MouseClicked" que verifica se a coordenada esta no seu cartao
//E se clicou no sitio certo no circulo trigonometrico adiciona um linha no local que clicou
function mouseClicked() {
  if (p.card != null) {
    for (var i = 0; i < 5; i++) {
      if (p.card[i] == Sor.coordenada) {
        for (var j = 0; j < Sor.coordenadas.length; j++) {
          if (Sor.coordenadas[j] == Sor.coordenada) {
            if (j < 16) {
              if (mouseX > (200 * cos(radians(circle.coordenadas[j])) + width - 500) - 15 &&
                mouseX < (200 * cos(radians(circle.coordenadas[j])) + width - 500) + 15 &&
                mouseY > (200 * -sin(radians(circle.coordenadas[j])) + height / 2) - 15 &&
                mouseY < (200 * -sin(radians(circle.coordenadas[j])) + height / 2) + 15
              ) {
                if (lines[i] == null) {
                  alert('ACERTOU');
                  lines[i] = new Linha((200 * cos(radians(circle.coordenadas[j])) + width - 500) - 15,
                    (200 * -sin(radians(circle.coordenadas[j])) + height / 2) - 15,
                    (200 * cos(radians(circle.coordenadas[j])) + width - 500) + 15,
                    (200 * -sin(radians(circle.coordenadas[j])) + height / 2) + 15);
                  contem++;
                }
              }
            } else {
              if (mouseX > (200 * cos(radians(0)) + width - 500) - 15 &&
                mouseX < (200 * cos(radians(0)) + width - 500) + 15 &&
                mouseY > (200 * -tan(radians(circle.coordenadasT[j - 16])) + height / 2) - 15 &&
                mouseY < (200 * -tan(radians(circle.coordenadasT[j - 16])) + height / 2) + 15) {
                if (lines[i] == null) {
                  alert('ERROU')
                  lines[i] = new Linha((200 * cos(radians(circle.coordenadas[0])) + width - 500) - 15,
                    (200 * -tan(radians(circle.coordenadasT[j - 16])) + height / 2) - 15,
                    (200 * cos(radians(circle.coordenadas[0])) + width - 500) + 15,
                    (200 * -tan(radians(circle.coordenadasT[j - 16])) + height / 2) + 15);
                  contem++;
                }
              }

            }

          }
        }
      }
    }
    //}
  }
}
//pagina do Vencedor
function page5() {
  background(bgImg);
  image(circulo, width / 2 - 500, 50, 958, 840);
  textSize(100);
  fill(26, 34, 87);
  stroke(0);
  text("Vencedor", width / 2 - 200, 200);
  text(playerName + " Ganhou", width / 2 - 400, 500);
  button.hide();
}
function page7() {
  background(bgImg);
  image(circulo, width / 2 - 500, 50, 958, 840);
  textSize(100);
  fill(26, 34, 87);
  stroke(0);
  text("Tempo esgotado", width / 2 - 200, 200);
  //text(playerName + " Ganhou", width / 2 - 400, 500);
  button.hide();
}
