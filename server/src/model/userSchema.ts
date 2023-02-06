import { Schema,model } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    name:{
        type:String,
       
    },
    username:{
        type:String,
        trim:true
    },
    about:{
        type:String,
    },
    socialLink:{
        type:String,
    },
    profile:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isBanned:{
        type:Boolean,
        default:false,
    },

},{timestamps:true})

export default model('users',userSchema)