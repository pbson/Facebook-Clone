import io from 'socket.io-client';

export const socket = io('http://192.168.31.17:3000',{forceNew:true, jsonp: false, transports: ['websocket'],});

socket.on('connection', () => {
    console.log('connection set' )
})