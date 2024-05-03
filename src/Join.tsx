import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io('https://chatsphere-60b8.onrender.com');



const Join = () => {
    const [username,setUsername] = useState("")
    const room = 1
    const [showChat, setShowChat] = useState(false);
    //  const navigate = useNavigate()

    const sendUserToRoom = () => {
        socket.emit('newuser', username);
        setUsername(username)
        socket.emit('join-room',room)
        setShowChat(true);
        // navigate('/chat')
      };
  return (
    <div className=" w-full h-full  max-h-[600px] bg-white border-x border-solid border-[#eee]">
      {!showChat ? (
    <div className=" w-full h-full" >
      <div className=" absolute top-[50%] left-[50%] w-[80%] max-w-[ -translate-x-2/4 -translate-y-1/2">
        <h2 className="mb-[20px] text-3xl text-[#111] px-0 py-1 inline-block border-b-4 border-solid border-[#111]">Join chatroom</h2>
          <div className="w-full mx-0 my-[20px]">
            <label className="block mb-1" htmlFor="username">Username</label>
            <input className="w-full p-2 border border-solid border-[#555] text-xl" type="text" value={username} onChange={(e)=> setUsername(e.target.value)} onKeyDown={(event) => { event.key === "Enter" && sendUserToRoom();  }} id="username" name="username"/>
          </div>
          <div>
            <button onClick={sendUserToRoom}  className="px-5 py-2 bg-[#555] cursor-pointer text-xl outline-none- border-none text-white">Join</button>
          </div>
            
      </div> 
      
    </div>
    ) : (
      <Chat socket={socket} room={1} username={username}/>
      )}
 </div>
  )
}

export default Join