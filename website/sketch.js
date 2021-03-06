var player;
var ip;
var done = false;
var data;
var x = 0;
var y = 0;
var gameData = {};
var joystickTouch = false;
var joystickPosition = { 'x': 0, 'y': 0 }
var last_time;
var d;
var sRatio;
var name;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.getElementById("defaultCanvas0").style = 'display: none'
}

function preload() {
  img = loadImage('bg.jpg');
  document.getElementById("p5_loading").style = "display: none"
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function vScale(v1, c) {
  return { 'x': v1.x * c, 'y': v1.y * c }
}

function vAdd(v1, v2) {
  return { 'x': v1['x'] + v2['x'], 'y': v1['y'] + v2['y'] }
}

function saveData(JSON) {
  gameData = JSON;
  last_time = new Date().getTime()
}

async function getIp() {
  var ip;
  await fetch('https://www.cloudflare.com/cdn-cgi/trace', { method: 'GET' }).then(response => response.text()).then(text => { ip = text.split('\n')[2].split('=')[1] })
  return ip;
}

function draw() {
  background(0);
  rect(-1000 - x + width / 2 - 20, -1000 - y + height / 2 - 20, 2040, 2040)
  image(img, -1000 - x + width / 2, -1000 - y + height / 2);
  fill(255)
  textSize(15);
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text('You', width / 2, height / 2 - 30);
  ellipse(width / 2, height / 2, 25, 25);
  ellipse(windowWidth / 7, windowHeight - windowWidth / 7, windowWidth / 4, windowWidth / 4)

  if (joystickTouch) {
    if (Math.sqrt(Math.pow(mouseX - windowWidth / 7, 2) + Math.pow(mouseY + windowWidth / 7 - windowHeight, 2)) < windowWidth / 8) {
      ellipse(mouseX, mouseY, windowWidth / 12, windowWidth / 12)
      joystickPosition = { 'x': mouseX - windowWidth / 7, 'y': mouseY + windowWidth / 7 - windowHeight }
    }
    else {
      ratio = (windowWidth / 8) / Math.sqrt(Math.pow(mouseX - windowWidth / 7, 2) + Math.pow(mouseY + windowWidth / 7 - windowHeight, 2))

      ellipse((mouseX - windowWidth / 7) * ratio + windowWidth / 7, (mouseY + windowWidth / 7 - windowHeight) * ratio + windowHeight - windowWidth / 7, windowWidth / 12, windowWidth / 12)

      joystickPosition = { 'x': (mouseX - windowWidth / 7) * ratio, 'y': (mouseY + windowWidth / 7 - windowHeight) * ratio }
    }
  }

  for (var i = 0; i < Object.keys(gameData).length; i++) {

    if (String(Object.keys(gameData)[i]) == String(player)) { }
    //if(0 == 1){}
    else {
      //d = Math.sqrt(Math.pow(gameData[Object.keys(gameData)[i]].position.x-gameData[Object.keys(gameData)[i]].prev_pos.x, 2)+Math.pow(gameData[Object.keys(gameData)[i]].position.y-gameData[Object.keys(gameData)[i]].prev_pos.y, 2))

      //var sRatio = ((new Date().getTime()-last_time)/1000)/(d/400)
      //var position = vAdd(vScale(gameData[Object.keys(gameData)[i]].position, sRatio), vScale(gameData[Object.keys(gameData)[i]].prev_pos, (1-sRatio)))
      ellipse(gameData[Object.keys(gameData)[i]].position.x - x + windowWidth / 2, gameData[Object.keys(gameData)[i]].position.y - y + windowHeight / 2, 25, 25)
      text(gameData[Object.keys(gameData)[i]].name, gameData[Object.keys(gameData)[i]].position.x - x + windowWidth / 2, gameData[Object.keys(gameData)[i]].position.y - y + windowHeight / 2 - 30);
      //console.log(gameData[Object.keys(gameData)[i]].name)
      //ellipse(gameData[Object.keys(gameData)[i]].prev_pos.x-x+windowWidth/2, gameData[Object.keys(gameData)[i]].prev_pos.y-y+windowHeight/2, 25, 25)
      //ellipse(position.x-x+windowWidth/2, position.y-y+windowHeight/2, 25, 25)
      //ellipse(gameData[Object.keys(gameData)[i]].position.x-x+windowWidth/2, gameData[Object.keys(gameData)[i]].position.y-y+windowHeight/2, 25, 25)
    }
  }

}


async function start() {
  if (document.getElementById('input').value == "") { }
  else {
    name = document.getElementById('input').value
    document.getElementById('defaultCanvas0').style = 'display: block'
    document.getElementById('name').style = 'display: none'

    await fetch('https://db.imagineengine.repl.co/room', { method: 'POST', body: JSON.stringify({ 'status': 'register', 'name': document.getElementById('input').value }), headers: { 'Content-Type': 'application/json' } }).then(response => response.text()).then(text => { player = text })

    data = { 'player': player, 'position': { 'x': x, 'y': y } }

    await fetch('https://db.imagineengine.repl.co/game', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(response => response.json()).then(JSON => saveData(JSON))
    console.log(getIp())
    getData()
    game()
  }
}

function hyp(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

async function game() {
  while (!done) {
    if (joystickTouch) {
      x += Number(joystickPosition.x / (windowWidth) * 32)
      y += Number(joystickPosition.y / (windowWidth) * 32)
    }
    if (x > 1000) { x = 1000 }
    if (x < -1000) { x = -1000 }
    if (y > 1000) { y = 1000 }
    if (y < -1000) { y = -1000 }
    //console.log(Object.keys(gameData))
    //console.log(hyp(Number(joystickPosition.y/(windowWidth)*32), Number(joystickPosition.x/(windowWidth)*32))/2)
    await sleep(17)
  }
}

async function getData() {
  while (!done) {
    if (joystickTouch) {
      data = { 'player': player, 'position': { 'x': x, 'y': y } }

      fetch('https://db.imagineengine.repl.co/game', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(response => response.json()).then()
    }
    fetch('https://db.imagineengine.repl.co/game', { method: 'GET' }).then(response => response.json()).then(JSON => saveData(JSON))
    await sleep(5);
  }
}

function touchStarted() {
  if (Math.sqrt(Math.pow(mouseX - windowWidth / 7, 2) + Math.pow(mouseY + windowWidth / 7 - windowHeight, 2)) < windowWidth / 8) {
    joystickTouch = true
  }
}

function touchEnded() {
  joystickTouch = false
}

window.onbeforeunload = async function() {
  await sleep(50);
  fetch('https://db.imagineengine.repl.co/room', { method: 'POST', body: JSON.stringify({ 'status': 'exit', 'player': player }), headers: { 'Content-Type': 'application/json' } })
  done = true
  await sleep(50);
  //return 'Do you want to quit'
}