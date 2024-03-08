import express , { Express } from "express";
import path from "path";
import  { createServer } from "http";
import  { Server }  from "socket.io";
import cors from "cors"


const app = express()
const server = createServer(app)

app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname+"/src")))


const io = new Server(server,{
    cors: {
      origin: '*',
    }
})



io.on('connection', (socket) => {
    socket.on("newuser",(username) => {
        console.log(username)
        socket.broadcast.emit("username",username + "joined the conversation")
    })

    socket.on("join-room",(data)=>{
       socket.join(data)
       console.log(data)
    })
    socket.on("leftuser",(username) => {
        console.log(username)
        socket.broadcast.emit("username",username + "left the conversation")
    })
    socket.on("send-msg",(message) => {
        console.log("send msg : " ,message)
        socket.to(message.room).emit("chat",message)
    })
  
    
  });


server.listen(5000,()=>{
    console.log("server running on port 5000")
})



export {}