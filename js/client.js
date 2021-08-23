const socket= io('http://localhost:8000');

const form= document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer= document.querySelector(".container")

const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    // message.fontcolor('red')
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
const name=prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    // name.fontcolor("blue");
    append(`${name} joined the chat`,'left')
})

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})