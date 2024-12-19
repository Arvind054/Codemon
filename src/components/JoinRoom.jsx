
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  function joinRoom(e){
    e.preventDefault();
    if(!roomId || !userName){
      toast.error("Room ID or Username Missing");
      return ;
    }
    navigate(`/editor/${roomId}`, {state: {userName}})
  }
  function handleEnter(e){
       if(e.code ==='Enter'){
         joinRoom();
       }
  }
  return (
    <div>
      
      <div className="JoinRoomMain">
           <h2>Join A Room</h2>
           <form action="">
            <input type="text"  placeholder='Enter Room Id'  value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyUp={handleEnter}/>
            <br />
            <input type="text" placeholder='Enter Username' value={userName} onChange={(e)=> setUserName(e.target.value)} onKeyUp={handleEnter}/>
            <br />
          <button onClick={joinRoom}>Join</button>
           </form>
      </div>
    </div>
  )
}

export default JoinRoom
