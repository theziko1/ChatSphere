import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    user : String,
    
}

const userSchema = new mongoose.Schema<IUser>({
    
    user: {
        type: String,
        required: true,
        unique: true,
    },
    
})


const User = mongoose.model<IUser>('User', userSchema);

export default User;