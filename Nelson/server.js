//importe do express
var express = require('express');
var app = express();
var server = app.listen('3000');
app.use(express.static('public'));
//importe do socket.io
var io = require('socket.io')(server);
var Player = require("./Player");
var players = [];
var numero;
var problems = [];
var sorteador=false;
var modo;
var tempos = [];
var acertos = new Map()


console.log("http://localhost:3000");
// chamar a função jogo Update
setInterval(jogoUpdate, 16);

// Função executada quando um connexão é estabelecida
io.sockets.on('connection', newConnection);
function newConnection(socket){
    console.log('new connection ' +  socket.id);
    socket.emit('playerId',socket.id);
    //recebe o nome do player eo seu id
  socket.on('playerName',Name);
  function Name(data){
    //Cria um novo "Player" com os dados recebidos
    players.push(new Player(data.id,data.name));
    acertos.set(data.id,0)
    console.log(players);
  }

  socket.on('acerto',recebeAcerto);
  function recebeAcerto(data){
    var a = acertos.get(data);
    a++;
    acertos.set(data,a);
    console.log('acerto '+data,a)
  }

  socket.on('getCertos',getCertos);
  function getCertos(data){
    socket.emit('recebeAcertos',acertos.get(data));
  }

  socket.on('modo',mode);
  function mode(data){
    modo = data;
  }

  //recebe se existe sorteador ou nao
  socket.on('sorteador',sorteadorEstado);
  sorteador=false;
  function sorteadorEstado(data){
   // sorteador=false;
    sorteador=data;
    // emit o estado o player para o jogo

    //console.log(data);
  }

  //recebe a coordenada que saiu
    socket.on('emitBola',bola);
    function bola(data){
      numero=data;
    }

    socket.on('emitProblemas',problemas);
    function problemas(data){
      problems = data
    }

    socket.on('emitTempo',tempo);
    function tempo(data){
      tempos[0] = data[0]
      tempos[1] = data[1]
    }

    //recebe se alguem ganhou o jogo
    socket.on('emiteGanhou',ganhou);
    function ganhou(data){
      // emite ao jogo quem ganhou o jogo
      socket.broadcast.emit('ganhou',data);
      //console.log(data);
    }

    //função para quando existe um disconnect e atualiza o array de "Players"
    socket.on("disconnect", disconnect)
    function disconnect(){
      console.log("Client has disconnected: " + socket.id) ;
      players = players.filter(player => player.id !== socket.id);
    };
  }


  //função para atualizar o jogo
  // manda a coordenada recebida e os players que estao conectados
  function jogoUpdate(){
    if (modo == 'bingo'){
      io.emit('sorteadorEstado',sorteador);
      io.emit('recebeBola',numero);
      io.emit('players',players);
    }else{
      io.emit('sorteadorEstado',sorteador);
      io.emit('recebeProblemas',problems)
      io.emit('players',players);
      io.emit('tempo',tempos)
    }
  }




  
