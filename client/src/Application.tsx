import React, { useContext } from "react";

import SocketContext from "../src/contexts/Context";

export interface IApplicationProps{}

const Application:React.FunctionComponent<IApplicationProps>=(props)=>{
  const { socket, uid, users } = useContext(SocketContext).SocketState;
  return (
    <div className="App">
      <h2>Socket IO </h2>
      <p>User ID : {uid}</p>
      <p>User Online : {users}</p>
      <p>Socket ID :{socket?.id}</p>
    </div>
  );
}
 


export default Application;
