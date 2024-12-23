import express from 'express';
const app = express();
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = createServer(app);
const io = new Server(server);
const userMapping = {};
app.use(express.json());

app.use(express.json());
app.use(express.static('dist'));
app.use((req, res)=>{
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})
function getConnections(Roomid){
    return Array.from(io.sockets.adapter.rooms.get(Roomid) || []).map((socketId)=>{
           return {
            socketId,
            username : userMapping[socketId]
           }
    })
}
io.on('connection', (socket)=>{
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
    });
  socket.on('connectVideo', (socketId)=>{
     socket.broadcast.emit('videoConnected', socketId);
     socket.emit('getAllUsers',  Array.from(io.sockets.sockets.keys()).map((s) => s !== socket.id ? s : null).filter(Boolean));
  })
  socket.on("signal", (data) => {
    io.to(data.to).emit("signal", { from: data.from, signal: data.signal });
  });
   socket.on("disconnect", () => {
    io.emit("user-left", socket.id);
  });
        
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



const port = 3000;
server.listen(port, ()=>{
})