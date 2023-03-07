import {Schema,model} from "mongoose";

const adminSchema:Schema = new Schema({
    email :{
        type : String,
        require : true,
        trim : true,
    },
    password :{
        type :String,
        require : true,
        trim : true,
    },
})

export default model("Admins",adminSchema)