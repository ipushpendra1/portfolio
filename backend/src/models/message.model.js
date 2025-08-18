import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minlength:3,
    },
    Email:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },

    Message:{   
        type:String,
        required:true
    },

    Date:{
        type:Date,
        default:Date.now,
       
    }
})


const messageModel = mongoose.model('Message',messageSchema)
export default messageModel
