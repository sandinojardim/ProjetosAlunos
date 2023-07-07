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
var modoProva = false;
var modoBingoButtonVisible = false;
var modoProvaButtonVisible = false;
var i = 1;
var gameStarted = false;

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

  Info = loadImage("media/InfoButton.png");
  InfoJogador = loadImage("media/InfoJogador.png");
  InfoSorteador = loadImage("media/InfoShown.png");

  BingoTitulo = loadImage("media/BingoTitulo.png");
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
}
function selecionarModoProva() {
  modoBingoButtonVisible = false;
  modoProvaButtonVisible = false;
  scene = 6;
  socket.on('players', recebePlayers);
  console.log('MODO PROVA');
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
  image(BingoTitulo, 100, 100);
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
  }, 10000);
}
//pagina do jogador
function page4() {
  //Cria um novo Circulo
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
}
function page6() {
  //Cria um novo Circulo
  circle = new Circle(Sor.coordenadas);
  //Recebe a coordenada do servidor
  socket.on('recebeBola', numeroBall);
  //recebe se alguem ganhou o jogo
  socket.on('ganhou', ganhouJogo);
  background(bgImg);
  image(Cartaz, 100, 50, 526, 839);
  image(circulo, width - 1000, 50, 958, 840);
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
      strokeWeight(2);

      lines[i].display();
    }
  }
  for (var i = 0; i < lines.length; i++) {
    if (circles[i] != null) {
      stroke(0, 100, 0);
      strokeWeight(2);

      lines[i].display();
    }
  }

  setInterval(() => {
    if (i < 5) {
      Sor.retiraCoordenada();
      socket.emit('emitBola', Sor.coordenada);
      i++;
    }
  }, 500);
}
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

//função que recebe os Jogadores,Criar um novo array de "Player" e verificar que ja Existe esse player
//pelo Id tambem remove o player do array se ele sair
function recebePlayers(data) {
  var removedPlayers = Sor.players.filter(p => data.findIndex(s => s.id == p.id));
  for (let player of removedPlayers) {
    removePlayer(player.id);
  }
  for (var i = 0; i < data.length; i++) {
    var playersServer = data[i];
    if (!playerExiste(playersServer)) {
      Sor.players.push(new Player(playersServer));
    }
  }
}
//verificar que o Id do jogador Existe
function playerExiste(playersServer) {
  for (var i = 0; i < Sor.players.length; i++) {
    if (Sor.players[i].id == playersServer.id) {
      return true;
    }
  }
  return false;
}
//se o Id do Jogador sair do servidor cria um novo array sem esse Jogador
function removePlayer(playerId) {

  Sor.players = Sor.players.filter(player => player.id !== playerId);
}
//Função que recebe a coordenada
function numeroBall(data) {
  Sor.coordenada = data;
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
