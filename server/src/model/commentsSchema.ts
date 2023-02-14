import { Schema,model } from "mongoose";


const commentSchema:Schema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },

    postId:{
        type:Schema.Types.ObjectId,
        ref:'posts',
    },

    comment:{
        type:String,
    },

    likes:[{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users',
        }
    }]

},{timestamps:true})

export default model('comments',commentSchema)