import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000'; // Replace with your backend server URL
const socket = io(SOCKET_URL);

socket.on('connect',()=>{
    console.log('connected id'+socket.id)
})

export default socket;
