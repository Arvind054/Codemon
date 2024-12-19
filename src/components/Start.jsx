
import '../CSS/start.css'
import toast from 'react-hot-toast';
const Start = () => {
 

  return (
    <div className='Main-container'>
        <div className="main">
             <h2>Welcome To CodeMon</h2>
               <p>Code in Sync</p>
             <a href="/joinRoom"><button>JoinRoom</button></a>
             &nbsp;
             <span>Or</span>
             &nbsp;
             <a href="/createRoom" ><button >Create Room</button></a>
         </div>
    </div>
  )
}

export default Start
