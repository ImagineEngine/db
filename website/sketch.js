var player;
var ip;
var done = false;
var data;
var x = 0;
var y = 0;
var gameData = {};
var joystickTouch = false;
var joystickPosition = {'x': 0, 'y': 0}

function setup() {
  createCanvas(windowWidth, windowHeight);
  start()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function vScale(v1, c){
  return {'x': v1.x*c, 'y': v1.y*c} 
}

function vAdd(v1, v2){
  return {'x': v1['x']+v2['x'], 'y': v1['y']+v2['y']} 
}

function draw() {
  background(100, 255, 50);
  ellipse(x, y, 25, 25);
  fill(230)
  ellipse(windowWidth/7, windowHeight-windowWidth/7, windowWidth/4, windowWidth/4)
  if (joystickTouch){
    if (Math.sqrt(Math.pow(mouseX-windowWidth/7, 2)+Math.pow(mouseY+windowWidth/7-windowHeight, 2)) < windowWidth/8){
      ellipse(mouseX, mouseY, windowWidth/12, windowWidth/12)
      joystickPosition = {'x': mouseX-windowWidth/7, 'y': mouseY+windowWidth/7-windowHeight}
    }
    else{
      ratio = (windowWidth/8)/Math.sqrt(Math.pow(mouseX-windowWidth/7, 2)+Math.pow(mouseY+windowWidth/7-windowHeight, 2))

      ellipse((mouseX-windowWidth/7)*ratio+windowWidth/7, (mouseY+windowWidth/7-windowHeight)*ratio+windowHeight-windowWidth/7, windowWidth/12, windowWidth/12)

      joystickPosition = {'x': (mouseX-windowWidth/7)*ratio, 'y': (mouseY+windowWidth/7-windowHeight)*ratio}
    }
  }
  for (var i = 0; i < Object.keys(gameData).length; i++){
    if (String(Object.keys(gameData)[i]) == String(player)){}
    //if(0 == 1){}
    else{
      ellipse(gameData[Object.keys(gameData)[i]].position.x, gameData[Object.keys(gameData)[i]].position.y, 25, 25)
    }
  }
  
}


async function start() {
  await fetch('https://db.imagineengine.repl.co/room', {method: 'POST'}).then(response => response.text()).then(text => { player = text })
  data = { 'player': player, 'position': {'x': x, 'y': y}}
  getData()
  game()
}

function hyp(a, b){
  return Math.sqrt(Math.pow(a, 2)+Math.pow(b, 2))
}

async function game() {
  while (!done){
    if (joystickTouch){
      x += Number(joystickPosition.x/(windowWidth)*32)
      y += Number(joystickPosition.y/(windowWidth)*32)
    }
    if (x<0){
      x=0
    }
    if (y<0){
      y=0
    }
    if (x>windowWidth){
      x = windowWidth
    }
    if (y>windowHeight){
      y = windowHeight
    }
    //console.log(Object.keys(gameData))
    //console.log(hyp(Number(joystickPosition.y/(windowWidth)*32), Number(joystickPosition.x/(windowWidth)*32))/2)
    await sleep()
  }
}

async function getData(){
  while (!done){
    data = { 'player': player, 'position': {'x': x, 'y': y}}

    fetch('https://db.imagineengine.repl.co/game', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(response => response.json()).then(JSON => {gameData = JSON})
    await sleep(25);
  }
}

function touchStarted() {
  if (Math.sqrt(Math.pow(mouseX-windowWidth/7, 2)+Math.pow(mouseY+windowWidth/7-windowHeight, 2)) < windowWidth/8){
    joystickTouch = true
  }
}

function touchEnded(){
  joystickTouch = false
}

window.onbeforeunload = function () {
  fetch('https://db.imagineengine.repl.co/room', {method: 'POST', body: JSON.stringify({'status': 'exit', 'player': player}), headers: { 'Content-Type': 'application/json' } })
  done = true
  return 'Do you want to quit'
}