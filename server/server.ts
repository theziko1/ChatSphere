import express , { Express, Request, Response } from "express";
import path from "path";
import  { createServer } from "http";
import  { Server }  from "socket.io";
import cors from "cors"
import { config } from "dotenv";
import mongoose from "mongoose";
import Message from "./models/chat";
// import User from "./models/user";

config()

   

mongoose.connect(process.env.MONGO_URL!)
.then(()=>{
    console.log("connected to the database")
}) 
.catch ((error)=> {
    console.log("connexion failed",error) 
})  

const app = express()
const server = createServer(app)

app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname+"/src")))


app.get('/api/v1/messages', async (req : Request, res : Response) => {
    const messages = await Message.find().populate('user');
    res.send(messages)
})

// app.get('/api/v1/user', async (req : Request, res : Response) => {
//     const user = await User.find();
//     res.send(user)  
// })

const io = new Server(server,{
    cors: {
      origin: '*',
    }
})



io.on('connection', (socket) => {
    socket.on("newuser",(username) => {
        // const user = new User({
        //     user: data.username
        // })
        // user.save()
        // console.log(username)
        socket.broadcast.emit("new-user",username + " is joined the conversation")
    })

    socket.on("join-room",(data)=>{
       socket.join(data)
       
    })
    socket.on("leftuser",(username) => {
        // console.log(username ," is left")
        socket.broadcast.emit("left-user",username + " is left the conversation")
    })
    socket.on("send-msg",(data) => {
        // console.log("send msg : " ,message)
        
        const message = new Message({
            message: data.message,
            room: data.room,
            user : data.user  
        })
        

        message.save()
        // console.log("user : " , data.user)
        // console.log("room : " , data.room)
        // console.log("message : " , data.message)
        socket.to(data.room).emit("chat",data)
    })
  
    
  });  


server.listen(5000,()=>{
    console.log("server running on port 5000")
})



export {}