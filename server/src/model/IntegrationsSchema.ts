import { Schema , model } from 'mongoose'

const IntegrationSchema:Schema = new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    Fullname:{
        type:String,
        required:true
    },
    AccountNumber:{
        type:Number,
        required:true
    },
    IFSC :{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    TransactionId:{
        type:String,
    }

},{timestamps:true})

export default model('Integrations',IntegrationSchema)