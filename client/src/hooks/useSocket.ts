import {useRef, useEffect} from 'react'
import io,{ManagerOptions,Socket,SocketOptions} from "socket.io-client"

 export const useSocket=(
    uri:string,
    options?:Partial<ManagerOptions & SocketOptions> | undefined): Socket=>{
        const {current:socket}= useRef(io(uri,options))
         
        useEffect(()=>{
            return ()=>{
                if(socket)
                    socket.close()
            }
        },[socket])

        return socket
    }
 