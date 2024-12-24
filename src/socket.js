import {io} from 'socket.io-client' ;
export const initSocket =async ()=>{
    const options = {
        'force-new-connection' : true,
        reconnectionAttempts: 'infinity',
        timeout: 10000,
        transports :['websocket'],
       
    }
    return io('https://codemon-phi.vercel.app',options);
}