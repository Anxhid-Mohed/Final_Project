import { Schema , model, SchemaType } from 'mongoose';

const payoutsSchema:Schema = new Schema({
    
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },

    amount:{
        type:Number,
        required:true
    },

},{timestamps:true})

export default model('payouts',payoutsSchema)