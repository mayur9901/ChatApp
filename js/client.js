let socket = io();

const form = document.getElementById('mess');
const messImp = document.getElementById('Send');
const messContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messContainer.append(messageElement);
}

const name = prompt("Enter name : ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined chat`, 'right');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messImp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messImp.value = "";
})