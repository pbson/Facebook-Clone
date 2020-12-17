import io from 'socket.io-client';

export const socket = io('https://project-facebook-clone.herokuapp.com',{forceNew:true, jsonp: false, transports: ['websocket'],});

socket.on('connection', () => {
    console.log('connection set' )
})