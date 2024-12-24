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
    return io('http://localhost:3000',options);
}