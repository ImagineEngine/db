var player;
var ip;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ellipse(0, 0, 25, 25);
}


async function start() {
  await fetch('https://www.cloudflare.com/cdn-cgi/trace', {method: 'GET'}).then(response => response.text()).then(text => { ip = text.split('\n')[2].split('=')[1] })

  await fetch('https://db.imagineengine.repl.co/room', { method: 'POST', body: JSON.stringify({'ip': ip}), headers: { 'Content-Type': 'application/json' } }).then(response => response.text()).then(text => { player = text })
  console.log(ip)
  game(player)
}

function game(player) {
  data = { 'player': player, motion: 'none' }
  fetch('https://db.imagineengine.repl.co/game', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(response => response.text()).then(text => console.log(text))

}

function end() { }

start()