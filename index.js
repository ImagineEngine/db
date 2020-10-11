console.log('server is starting')
var express = require('express')
const fs = require('fs')

var raw_data = fs.readFileSync('data.json')

var file = JSON.parse(raw_data);

var app = express()
 
var server = app.listen(3000, listening)
var players = 0;

var game = {};

function listening(){
  console.log('listening')
}

app.use(express.static('website'));
app.use(express.json())
//app.get('/room/:data', update)
app.post('/room', roomState)
app.post('/game', gameState)

function transfer(request, response){
  console.log(request.body)
  response.send(players)
}

function gameState(request, response){
  //request.body[]
  console.log(request.body)
  response.send(JSON.stringify(game))
}

function roomState(request, response){
  if (request.body.ip in game){

  }
  else{
    game[request.body.ip] = {position:{x: 0, y: 0}}
    players += 1
  }
  console.log(request.body.ip)
  response.send(request.body.ip)
}

function update(request, response){
  var data = request.params
  file[data['data']] = 1
  fs.writeFile("data.json", JSON.stringify(file), a)
  console.log(data['data'])
  response.send('hello there')
}


function a(){}