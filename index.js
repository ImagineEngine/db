console.log('server is starting')
var express = require('express')
const fs = require('fs')

var raw_data = fs.readFileSync('data.json')

var file = JSON.parse(raw_data);

var app = express()

var server = app.listen(3000, listening)

function listening(){
  console.log('listening')
}

app.use(express.static('website'));

app.get('/room/:data', update)

app.use(express.static('website'));


function update(request, response){
  var data = request.params
  response.send('hey')
  file[data['data']] = 1
  fs.writeFile("data.json", JSON.stringify(file), a)
  console.log(data['data'])
}


function a(){}