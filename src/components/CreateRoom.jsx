import React, { useEffect } from 'react'
import { v4 } from 'uuid'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateRoom = () => {
   const navigate  = useNavigate();
    const [userName, setUserName] = useState('');
    const [id, setId] = useState();
    useEffect(()=>{
      setId(v4());
    }, [])
    function joinRoom(e){
      if(!userName){
        e.preventDefault();
        toast.error("Username Missing");
        return ;
      }
      navigate(`/editor/${id}`, {state: {userName}})
    }
    function handleEnter(e){
        if(e.code ==='Enter'){
          joinRoom();
        }
    }
  return (
    <div className='Main-container'>
        <div className="main">
             <h2>Create A new Room</h2>
             <input className='joinInputs' type="text" value={id} />
             <br />
             <input className='joinInputs' type="text" placeholder='Enter Your UserName'  value={userName} onChange={(e)=> setUserName(e.target.value)} onKeyUp={handleEnter}/>
             <br />
             <button onClick={joinRoom}>Create</button>

        </div>

    </div>
  )
}

export default CreateRoom
