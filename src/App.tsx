import React from 'react'
import "./App.css"
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
     <div className="flex flex-col container justify-center items-center">
         
            <h1 className="text-[#555] mt-32 mb-9 font-[Inter] font-bold text-justify text-5xl">Welcome to ChatSphere</h1>
            <p className="m-auto my-9 text-justify w-1/2">Welcome to ChatSphere, your ultimate destination for hassle-free communication. With ChatSphere, staying connected with your friends, family, and colleagues has never been easier. Say goodbye to long email threads and missed calls – ChatSphere brings all your conversations under one roof, right at your fingertips.</p>
            <div className="bg-[#555] p-3 mt-6 text-white rounded-md">
            <Link to="/join">Join Chat</Link>
            </div>
          
     </div>
    </>
  )
}

export default App