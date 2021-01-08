const socket = io('http://localhost:8000');

const form = document.getElementById('send');
const messageInput = document.getElementById('messageImp');
const messageContainer =document.querySelector(".container");

const audio = new Audio('ting.mp3');

// this append function is used to show that  new user joined the chat
const append =(message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(`message`);
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left' || position == 'center'){
    audio.play();
    }
}

const fname = prompt("Enter your name to join");

socket.emit('new-user-joined', fname)


socket.on('user-joined',fname =>{
    append(`${fname} joined the chat`,'center')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageImp.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageImp.value = ''
})

socket.on('receive',data =>{
    append(`${data.fname}:${data.message}`,'left')
})

socket.on('left',name =>{
    append(`${name}:left the chat`,'center')
})