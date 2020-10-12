var player;
var ip;
var done = false;
var data;
var x = 0;
var y = 0;
var gameData;
var joystickTouch = false;
var joystickPosition = {'x': 0, 'y': 0}

function setup() {
  createCanvas(windowWidth, windowHeight);
  start()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function draw() {
  background(220);
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
}


async function start() {
  await fetch('https://db.imagineengine.repl.co/room', {method: 'POST'}).then(response => response.text()).then(text => { player = text })
  game()
}

async function game() {

  while (!done){
    if (joystickTouch){
      x += Number(joystickPosition.x/(windowWidth/32))
      y += Number(joystickPosition.y/(windowWidth/32))
    }
    data = { 'player': player, 'position': {'x': x, 'y': y} }
    await fetch('https://db.imagineengine.repl.co/game', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(response => response.json()).then(JSON => {gameData = text})
    console.log(gameData['1'])
    await sleep(10)
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

function end() { }
