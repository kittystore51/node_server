
const socket = io('ws://node-server-18oh.onrender.com:8080');

socket.on('message', text => {
    document.querySelector('#command').innerHTML = '"' + text + '"';
});

socket.on('num_client', text => {
    document.querySelector('#num_client').innerHTML = 'client connessi: ' + text;
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input');
    socket.emit('mod', text.value);
    text.value = "";
}
