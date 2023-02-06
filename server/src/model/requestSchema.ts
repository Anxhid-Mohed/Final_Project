import {Schema,model} from 'mongoose';

const requestSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    categories:{
        type:String,
        required:true
    }

},{timestamps:true})

export default model('requests',requestSchema);