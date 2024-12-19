import React, { useEffect, useRef, useState } from 'react'
import '../CSS/Home.css'
import User from './User'
import Editor from './Editor'
import { initSocket } from '../socket'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {
   const [users, setUsers] = useState([])
   const socketRef = useRef(null);
   const location = useLocation();
   const {id}= useParams();
   const codeRef = useRef(null)
   let HomeNavigator = useNavigate();
   function handleError(e){
      console.log("error ", e);
      toast.error("connection failled please try again");
      HomeNavigator('/');
   }
   if( !location.state){
      return <Navigate to={'/'}/>
   }
   useEffect(()=>{
       const init = async ()=>{
         socketRef.current = await initSocket();
         socketRef.current.on('connect_error', handleError);
         socketRef.current.on('connect_failed', handleError);
         socketRef.current.emit('join',
           { id,
            username : location.state?.userName
           }
         );
         socketRef.current.on('joined', ({allConnections, username, socketId})=>{

               if(username != location.state.userName){
                  toast.success(`${username} joined the room`);
               }
              setUsers(allConnections);
              const code = codeRef.current;
              socketRef.current.emit('sync', {socketId,code})
         })
         socketRef.current.on('disconnected', ({socketId, username})=>{
              toast.success(`${username} left the room`);
              setUsers((prevUsers)=>{
                   return prevUsers.filter((user)=> user.socketId != socketId)
              })
         })
       };
       init();

       return () =>{
         socketRef.current.disconnect();
         socketRef.current.off('joined');
         socketRef.current.off('disconnected');
       }
   }, [])
  function handleCopy(){
        navigator.clipboard.writeText(id);
        toast.success("Room Id Copied To Clipboard");
  }
  function handleLeave(){
   HomeNavigator('/');
  }
  return (
    <div className='Home-Component'>
       <div className="left">
          <div className="left-content">
              <h1>CodeMon</h1>
              <hr />
                 <h2>People</h2>
                 <div className="connections">
                  {
                   users.map((singleUser)=>{
         
                    return <User key={singleUser.socketId} username = {singleUser.username}></User>
                   })

                  }
                 </div>
                 <div className="controls">
                  <button className='copyBtn' onClick={handleCopy}>copy Room ID</button>
                  <button className='leaveBtn' onClick={handleLeave}>Leave Room</button>
                 </div>
          </div>
       </div>
       <div className="right">
            <Editor socketRef = {socketRef} roomId = {id} onCodeChange= {(code)=>{codeRef.current = code}}/>
       </div>
    </div>
  )
}

export default Home
