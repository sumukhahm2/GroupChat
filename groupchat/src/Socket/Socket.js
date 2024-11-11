import { io } from 'socket.io-client';

const SOCKET_URL = 'http://16.171.19.58:3000'; // Replace with your backend server URL
const socket = io(SOCKET_URL);

socket.on('connect',()=>{
    console.log('connected id'+socket.id)
})

export default socket;
