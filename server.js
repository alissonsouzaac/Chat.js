const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//diz a pagina que o front esta e o tipo que vai passar.
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',(req, res) => {
	res.render('index.html');
});

var messages = [];

io.on('connection', socket => {
	console.log('conectado');

	socket.emit("previousMessages", messages);

	socket.on('SendMessage', data => {
		messages.push(data);
		socket.broadcast.emit("receivedMessage", data);
	});
});

server.listen(8080);