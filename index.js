console.log('server is starting');
var express = require('express');
const fs = require('fs');

var raw_data = fs.readFileSync('data.json');

var file = JSON.parse(raw_data);

var app = express();

var server = app.listen(3000, listening);
var players = 0;

var game = {};

function generatePoints(){
  var pt_list;
  for (var i = 0; i<= 100; i++){
    pt_list.push({'x': Math.floor((Math.random() * 2000) + 1)-1000, 'y': Math.floor((Math.random() * 2000) + 1)-1000})
  }
}

function listening() {
	console.log('listening');
}

app.use(express.static('website'));
app.use(express.json());
//app.get('/room/:data', update)
app.post('/room', roomState);
app.post('/game', gameUpdate);
app.get('/game', gameState)

function roomState(request, response) {
  if(request.body['status'] == 'exit'){
    delete game[request.body['player']]
  }
  else{
    response.send(String(players + 1));
    game[String(players + 1)] = { position: { 'x': 0, 'y': 0 }, prev_pos: {'x': 0, 'y':0}};
    players += 1;
  }
  console.log(request.body['player'])
}

function gameUpdate(request, response) {
	//request.body[]
	//console.log(game[request.body['player']].position);
  game[request.body['player']].position = request.body['position'];
	response.send(JSON.stringify(game));
}

function gameState(request, response){
  response.send(JSON.stringify(game));
}