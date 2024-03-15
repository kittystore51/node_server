var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server, {log:false, origins:'*:*'}); // Modifica qui

app.use(express.static('public'));

var str = "null";
var num_client = 0;

io.on('connection', (socket) => {
    console.log(socket.id + " connected");
    num_client++;

    io.emit('message', str);
    io.emit('num_client', num_client);

    socket.on('mod', (message) => {
        console.log(message);
        str = message;
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
        num_client--;
        io.emit('num_client', num_client);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`listening on ${port}`));
