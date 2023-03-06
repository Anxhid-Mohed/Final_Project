import { Schema , model } from 'mongoose';

const chatSchema :Schema = new Schema({
    members :{
        type:Array,
    },

    update:{
        type:Number,
        default:null
    }
    
},{timestamps:true})

export default model('chat', chatSchema)