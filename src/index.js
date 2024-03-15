const express = require('express');
const app = express();
const http = require('http').Server(app); // Utilizza express per creare il server HTTP

const io = require('socket.io')(http);

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
http.listen(port, () => console.log(`listening on ${port}`));