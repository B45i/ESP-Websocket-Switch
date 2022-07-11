import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4001;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static('src/ui'));

let buttonState = false;

io.on('connection', socket => {
    console.log('New Connection');

    io.to(socket.id).emit('buttonState', buttonState);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('buttonState', value => {
        console.log('buttonState:', value);
        buttonState = value;
        socket.broadcast.emit('buttonState', value);
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
