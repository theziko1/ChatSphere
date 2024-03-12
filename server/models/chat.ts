import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    message : String,
    room : Number,
    user : String
    
}  

const messageSchema = new mongoose.Schema<IMessage>({
    message: {
        type: String,
        required: true
    },
    
    room: {
        type: Number,
        required: true,
        default : 1
    },
    user: {
        type : String,
        required : true,
    },
})


const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;