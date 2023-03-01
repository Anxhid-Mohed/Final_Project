import { Schema , model } from 'mongoose';

const notificationSchema:Schema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },

    receiverId:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },

    content:{
        type:String,
    },

    type:{
        type:String,
        default:'normal'
    },

},{
    timestamps:true,
    capped:{
        size:1024,
        max:1000,
        autoIndexId:true,
    }
})

export default model('notifications',notificationSchema)