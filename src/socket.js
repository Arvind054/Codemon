import {io} from 'socket.io-client' ;
export const initSocket =async ()=>{
    const options = {
        'force-new-connection' : true,
        reconnectionAttemp: 'infinity',
        timeout: 10000,
        transports :['websocket'],
        cors: {
            origin: "*"
          },
    }
    const path = process.env.NODE_ENV === 'production' ? 'https://codemon-phi.vercel.app/': 'http://localhost:3000';
    return io(path,options);
}