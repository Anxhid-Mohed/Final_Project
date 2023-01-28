import { Request,Response } from 'express';
import {genSalt,hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'
import { nodemailer } from '../utils/nodeMailer';


//---> Authentication-validation <---//
export const verifyAuth = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body
        if(email && password){

            let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

            if(regEmail.test(email)){
                if(password.length >= 8){
                    const userExit = await userModel.findOne({email:email})

                    if(!userExit){
                        const salt = await genSalt(10)
                        const hashedPassword = await hash(password,salt)
                        const doc = new userModel({
                            email:email,
                            password:hashedPassword,
                            name:null,
                            username:null,
                            about:null,
                            socialLink:null,
                            isAuth:false
                        })
                        await doc.save()
                        const user = await userModel.findOne({email:email})
                        const userId = user?._id
                        console.log(userId);
                        res.json({userId:userId ,"status": "success", "message": "approved" })
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
        console.log(req.body)
        const userData = { ...req.body }
        const userNameExist = await userModel.findOne({username:userData.username})

        if(!userNameExist){
            const userId = userData.userId
            console.log(userId);
            
            await userModel.findByIdAndUpdate(userId,{

                name:userData.name,
                username:userData.username,
                about:userData.about,
                socialLink:userData.social,

            }) 
            const user = await userModel.findById(userId)
            const email = user?.email as string
            await nodemailer(userId,email)


            // let userInfos:any = await userModel.findOne({ email:userData.email})
            // let userId = userInfos._id;
            // let KEY:string = process.env.JWT_KEY as string;
            // const token = jwt.sign({userId},KEY, { expiresIn: '3d' })
            // res.json({auth:true,token:token,status:"success"})


        }else{
            res.json({"status":"exist"})
        }

    } catch (error) {
        console.log(error)
    }
}

export const userSignupData = async (req:Request,res:Response) => {
    console.log("helloo");
    
    console.log(req.body)
}

export const userSignin = async (req:Request,res:Response) => {
    console.log(req.body);
    const userData = { ...req.body.signinData }
    console.log(userData);
    
}