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
    category:{
        type:String,
        default:null,
    },
    profile:{
        type:String,
        default:null
    },
    coverImage:{
        type:String,
        default:null
    },

    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:'users'
        }
    ],

    followings:[{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users'
        }
    }],

    isVerified:{
        type:Boolean,
        default:false,
    },
    isBanned:{
        type:Boolean,
        default:false,
    },
    creator:{
        type:Boolean,
        default:false,
    },
    disabled:{
        type:Boolean,
        default:false,
    },

},{timestamps:true})

export default model('users',userSchema)