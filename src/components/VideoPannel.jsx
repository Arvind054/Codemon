import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
const VideoPannel = ({socket}) => {
    const [userStream, setuserStream] = useState(null);
    const peersRef = useRef({});
    const [users, setUsers] = useState([]);
    const addVideoStream = (socketId, stream) => {
        setUsers((prevUsers) => [
          ...prevUsers.filter((u) => u.id !== socketId),
          { id: socketId, stream },
        ]);
      };
    function createPeerConnection(socketId, stream, initiator = true){
        const SimplePeer = require("simple-peer");
        const peer = new SimplePeer({ initiator, trickle: false, stream });
        peer.on("signal", (signal) => {
            socket.emit("signal", { to: socketId, signal });
          });
      
          peer.on("stream", (stream) => {
            addVideoStream(socketId, stream);
          });
      
          return peer;
    };
    function joinUser(socketId, stream){
        const peer = createPeerConnection(userId, stream);
         peersRef.current[socketId] = peer;
    }
    useEffect( ()=>{
        async function init(){
        const stream =await  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setuserStream(stream);
        const socketId = socket.id
        socket.emit('connectVideo', socketId);
        socket.on('videoConnected', (socketId)=>{
            joinUser(socketId, stream);
        })
        socket.on('getAllUsers', (users)=>{
            users.forEach((user)=>{
                joinUser(user, stream);
            })
        });
        socket.on("signal", (data) => {
            const peer = peersRef.current[data.from];
            if (peer) {
              peer.signal(data.signal);
            }
          });
          socket.on("user-left", (remoteUserId) => {
            if (peersRef.current[remoteUserId]) {
              peersRef.current[remoteUserId].destroy();
              delete peersRef.current[remoteUserId];
            }
          });
        }
        init();
    }, [])
  return (
    <div>
        videoPannel here;
        <ReactPlayer playing muted width='200px' height='200px' url={userStream}></ReactPlayer>
        hello 
        <div>
        {users.map((user) => (
          <ReactPlayer key={socket.id} autoplay muted url = {user.stream} />
          
        ))}
        </div>
    </div>
  )
}

export default VideoPannel;
