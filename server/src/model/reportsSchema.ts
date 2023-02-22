import {Schema , model} from 'mongoose'


const reportSchema:Schema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'posts'
    },
    reason:{
        type:String,
    }

},{timestamps:true})

export default model('reports',reportSchema)