var express = require('express')
var app = express()

var http = require('http').Server(app);

var fs = require('fs');
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
	res.sendFile(__dirname + '/admin.html');
});

var history = [];

var input = [];

io.on('connection', function(socket){
	console.log('a user connected');

	socket.emit('history', history);

	socket.emit('input', input);

	socket.emit()

	socket.on('message', function (body){
		history.push(body);
		socket.broadcast.emit('message', body);
	});

	socket.on('position', function (pos){
		input.push(pos);
		socket.broadcast.emit('position', pos);
	});
});

http.listen(8080);