import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    let userId = '605163e321b3e141b8234ffbfriend'
    const socket = socketIOClient(ENDPOINT);
    socket.on(userId, data => {
        console.log(data)
        let d = JSON.stringify(data)
        let d2 = JSON.parse(d)
        setResponse(d2.friendInfo.firstName);
    });
  }, []);

  return (
      <>
      <h1>Hello</h1>
          <p>{response}</p>
      </>
    
  );
}

export default App;