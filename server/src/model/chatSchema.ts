import { Schema , model } from 'mongoose';

const chatSchema :Schema = new Schema({
    members :{
        type:Array,
    },
    
},{timestamps:true})

export default model('chat', chatSchema)