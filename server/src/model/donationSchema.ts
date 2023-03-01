import {Schema , model } from 'mongoose'

const donationSchema:Schema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },

    amount:{
        type:Number,
        required:true
    },

    donators :[{
        donorId:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        amount:{
            type:Number,
        },
        note:{
            type:String,
        },
        createdAt:{
            type: Date
        }
    }]
},{timestamps:true})

export default model('donations',donationSchema);