import { Schema,model } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    about:{
        type:String,
        required:true,
    },
    socialLink:{
        type:String,
        required:true
    }
},{timestamps:true})

export default model('users',userSchema)