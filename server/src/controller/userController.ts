import { Request,Response } from 'express';
import {genSalt,hash,compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'
import verificationModel from '../model/verificationToken';
import { nodemailer } from '../utils/nodeMailer';
import requestSchema from '../model/requestSchema';


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
                            profile:null,
                            coverImage:null,
                            isVerified:false,
                            isBanned:false,
                        })
                        await doc.save()
                        const user = await userModel.findOne({email:email})
                        const userId = user?._id
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
        const userData = { ...req.body }
        const userNameExist = await userModel.findOne({username:userData.username})

        if(!userNameExist){
            const userId = userData.userId
            
            await userModel.findByIdAndUpdate(userId,{

                name:userData.name,
                username:userData.username,
                about:userData.about,
                socialLink:userData.social,

            }) 
            const user = await userModel.findById(userId)
            const email = user?.email as string
            await nodemailer(userId,email)
             res.status(200).json({status:true,'message':'success'})
        }else{
            res.json({status:false,'message':'username already exists'})
        }

    } catch (error) {
        res.status(500).send({message:'Internal Server Error'})
    }
}

//---> Email Account Activation <---//
export const accountVerification = async (req:Request,res:Response) => {
    try {
        const {id,token} = req.body
        const user = await userModel.findOne({_id:id})

        if(!user)return res.json({message:'invalid link'});
        const userToken = await verificationModel.findOne({
            userId:user._id,
            token:token
        })

        if(userToken){
            await userModel.findByIdAndUpdate(user._id,{
                isVerified:true
            })
            await userToken.remove();
            let userId = user._id;
            let KEY:string = process.env.JWT_KEY as string;
            const token = jwt.sign({userId},KEY, { expiresIn: '3d' })
            res.status(200).json({auth:true,token:token,message:'Account verified,redirecting..'})
        }

    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
    
}
//---> User Signin <---//
export const userSignin = async (req:Request,res:Response) => {

    try {
        const {email,password} = req.body;
        console.log(email,password);
        if(email && password){
            const user = await userModel.findOne({email:email})
            // if(!user.isBanned){}
                if(user){
                    const userPass = user.password as string
                    const isMatched = await compare(password, userPass)
                    if( isMatched){
                        const userEmail = user.email as string
                        if(userEmail === email && isMatched){
                            const token = jwt.sign({ userId: user._id}, process.env.JWT_KEY as string, { expiresIn: '3d' })
                            res.status(200).json({auth:true,token:token,message:'Login successful'})
                        }else{
                            res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                        }
                    }else{
                        res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                    }
                }else{
                    res.status(400).json({auth:false,message:'User not exist'})
                }
        }else{
            res.status(400).json({auth:false,message:'All feilds are required'})
        }
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
    
}

export const createrRequest = async(req:Request, res: Response) => {
    console.log('userrrr',req.userId);
    try {
        const userId = req.userId;
        const {categories}= req.body
        const existReq = await requestSchema.findById(userId);
        if(!existReq){
            let obj = {
                userId,
                categories
            }
            await requestSchema.create(obj).then((response)=>{
                console.log(response);
                res.status(200).json({status:true,message:'request sended successfully'})
            })
        }else{
            res.json({status:false,message:'You already sended'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> Get user Datas <---//
export const getDetails = async (req:Request,res:Response) => {
    try {
        const userId = req.userId
        console.log("GET",userId);
        const userData = await userModel.findById(userId)
        console.log(userData);
        
        if (userData){
          
            res.json({
                'userId': userData._id,
                'email':userData.email,
                'name':userData.name,
                'username':userData.username,
                'about':userData.about,
                'socialLink':userData.socialLink,
                'isVerified':userData.isVerified,
                'isAuthenticated':true
            }) 
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error."
        res.json({status:false, message:message})
    }
}
