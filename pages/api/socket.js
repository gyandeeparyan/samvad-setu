import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    if(res.socket.server.io){
        console.log('Socket is already running')
    }
    else{
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {
            console.log('New client connected')
            socket.on('join-room', (roomId,userId) => {
                console.log(`A NEW USER WITH ${userId} JOINED ROOM ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-connected', userId);
            })
        })

    }
    res.end();
}

export default SocketHandler;