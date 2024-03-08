// id
// applicazione controllo
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

var str = "null";
var num_client = 0;

io.on('connection', (socket) => {
    console.log(socket.id.substr(0,2) + " connected");
    num_client++;

    io.emit('message', str);
    io.emit('num_client', num_client);

    socket.on('mod', (message) =>     {
        console.log(message);
        str = message;
        io.emit('message', `${message}` );   
    });

    socket.on('disconnect', () => {
        console.log(socket.id.substr(0,2) + " disconneted");
        num_client--;
        io.emit('num_client', num_client);
    })
});

http.listen(8080, () => console.log('listening on http://localhost:3000') ); 
