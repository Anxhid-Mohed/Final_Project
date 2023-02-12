import  { Schema,Date, model } from "mongoose";

const verificationTokenSchema:Schema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true,
        unique:true,
    },

    token:{
        type:String,
        required:true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
})

export default model('token', verificationTokenSchema)