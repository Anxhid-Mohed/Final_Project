import { Schema , model } from "mongoose";

const postSchema:Schema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },

    post:{
        type:String,
    },

    caption:{
        type:String,
    },

    like:[{
        like:{
            type:Schema.Types.ObjectId,
            ref:'users',
        }
    }],
},{timestamps:true})

export default model('posts',postSchema);