import { Request,Response } from 'express';
import {genSalt,hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'


//---> Authentication-validation <---//
export const verifyAuth = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body.userData
        if(email && password){

            let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

            if(regEmail.test(email)){
                if(password.length >= 8){
                    const userExit = await userModel.findOne({email:email})
                    if(!userExit){
                        res.json({ "status": "success", "message": "approved" })
                    }else{
                        res.json({"status":"failed","message":"Your email already exist"})
                    }
                }else{
                res.json({"status":"failed","message":"Password must be at least 8 characters"})
                }
            }else{
                res.json({"status":"failed","message":"Enter a valid email"})
            }
            
        }else{
           res.json({"status":"failed","message":"All feilds are required"})
        }
    } catch (error) {
        console.log(error);    
    }
}

//---> User-Signup <---//
export const userSignup = async(req:Request,res:Response) => {
    try {

        const userData = { ...req.body.obj }
        const userNameExist = await userModel.findOne({username:userData.username})

        if(!userNameExist){
            const salt = await genSalt(10)
            const hashedPassword = await hash(userData.password,salt)
            const doc = new userModel({
    
                email:userData.email,
                password:hashedPassword,
                name:userData.name,
                username:userData.username,
                about:userData.about,
                socialLink:userData.social,

            })
            await doc.save()

            let userInfos:any = await userModel.findOne({ email:userData.email})
            let userId = userInfos._id;
            let KEY:string = process.env.JWT_KEY as string;
            const token = jwt.sign({userId},KEY, { expiresIn: '3d' })
            res.json({auth:true,token:token,status:"success"})


        }else{
            res.json({"status":"exist"})
        }

    } catch (error) {
        console.log(error)
    }
}

export const userSignin = async (req:Request,res:Response) => {
    console.log(req.body);
    const userData = { ...req.body.signinData }
    console.log(userData);
    
}