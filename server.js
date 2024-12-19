import express from 'express';
const app = express();
import { createServer } from 'http';
import { Server } from 'socket.io';
const server = createServer(app);

const io = new Server(server);
const userMapping = {};
function getConnections(Roomid){
    return Array.from(io.sockets.adapter.rooms.get(Roomid) || []).map((socketId)=>{
           return {
            socketId,
            username : userMapping[socketId]
           }
    })
}
io.on('connection', (socket)=>{
    console.log("connected successfully", socket.id);
    socket.on('join', (params)=>{
          userMapping[socket.id] = params.username;
          socket.join(params.id);
          const allConnections = getConnections(params.id);
          allConnections.forEach(({socketId})=>{
              io.to(socketId).emit('joined',  {
                allConnections,
                username: userMapping[socket.id],
                socketId: socket.id
              })
          })
    })
    socket.on('code-change', ({roomId, code})=>{
         io.to(roomId).emit('code-change', {code})
    })
    socket.on('sync', ({socketId, code})=>{
       io.to(socketId).emit('code-change', {code});
    })
    socket.on('disconnecting', ()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit('disconnected',{
                socketId: socket.id,
                username: userMapping[socket.id]
            })
        });
        delete userMapping[socket.id];
        socket.leave();
    })
    
})



const port = process.env.port || 3000;
server.listen(port, ()=>{
    console.log(`listening on parot ${port}`);
})