const express = require('express'); 
const app = express(); 
const { Server } = require('socket.io'); 
const http = require('http'); 
const path = require('path');
const server = http.createServer(app); 
const io = new Server(server); 
const port = 8000;

app.get('/index.html', (req, res) => { 
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
})

server.listen(port, () => { 
    console.log('http://127.0.0.1:8000/index.html'); 
});