import { Schema , model} from 'mongoose';

const messageSchema :Schema = new Schema({
    chatId:{
        type:String,
    },

    senderId:{
        type:String,
    },

    text:{
        type:String,
    },

    read:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

export default model('message',messageSchema)