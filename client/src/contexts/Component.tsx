import React, { PropsWithChildren, useReducer, useState ,useEffect} from "react";
import { SocketContextProvider, SocketReducer, defaultSocketContextState } from "./Context";
import { useSocket } from "../hooks/useSocket";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

   const socket = useSocket('ws://localhost:1337',{ 
    reconnectionAttempts:5,
    reconnectionDelay:1000,
    autoConnect:false
   })

   useEffect(() => {
     socket.connect();

     SocketDispatch({type:'update_socket',payload:socket})
   
     StartListeners();
     SendHandshake()

     // eslint-disable-next-line
   }, [])

   const StartListeners=()=>{
     /** Messages */
     socket.on('user_connected', (users: string[]) => {
        console.info('User connected message received');
        SocketDispatch({ type: 'update_users', payload: users });
    });

    /** Messages */
    socket.on('user_disconnected', (uid: string) => {
        console.info('User disconnected message received');
        SocketDispatch({ type: 'remove_users', payload: uid });
    });

     socket.io.on('reconnect',(attempt)=>{
        console.info("Reconnected on attempt "+ attempt)
     })

     socket.io.on('reconnect_attempt',(attempt)=>{
        console.info("Reconnection attempt "+ attempt)
     })

     socket.io.on('reconnect_error',(error)=>{
        console.info("Reconnection Error"+ error)
     })

     socket.io.on('reconnect_failed',()=>{
        console.info('Reconnection failed')
         alert('we are unable to connect to the websocket')
     })
   }
    const SendHandshake = async () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', async (uid: string, users: string[]) => {
            console.info('User handshake callback message received');
            SocketDispatch({ type: 'update_users', payload: users });
            SocketDispatch({ type: 'update_uid', payload: uid });
        });

        setLoading(false);
    };
   
    if (loading) return <p>Loading Socket IO.....</p>;

    return <SocketContextProvider value={{ SocketState, SocketDispatch }}>{children}</SocketContextProvider>;
};

export default SocketContextComponent;
