import { Request,Response } from 'express';
import {genSalt,hash,compare} from 'bcrypt';
import { nodemailer } from '../utils/nodeMailer';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'
import verificationModel from '../model/verificationToken';
import postsModel from '../model/postsSchema';
import requestModel from '../model/requestSchema';


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


//---> Creator Request <---//
export const createrRequest = async(req:Request, res: Response) => {
    console.log('userrrr',req.userId);
    try {
        const userId = req.userId;
        const {categories}= req.body
        const existReq = await requestModel.findById(userId);
        if(!existReq){
            let obj = {
                userId,
                categories
            }
            await requestModel.create(obj).then((response)=>{
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



//---> User Profile Management <---//
export const profileManagement = async (req:Request,res:Response) => {
    try {
        const userData  = {...req.body}
        console.log(userData);
        await userModel.findByIdAndUpdate(userData.userId,{
            name:userData.name,
            about:userData.about,
            category:userData.category,
            socialLink:userData.social,
            profile:userData.profile
        })
        res.status(200).json({status:true,message:'profile updated successfully'})
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> User Page Management <---//
export const userPage = async (req:Request,res:Response) => {
    try {
        const username = req.query.username;
        const user = await userModel.findOne({username:username})
        console.log('--------------------------------',user);
        if(user){
            res.status(200).json({status:true,data:user,message:'success'})
        }else{
            res.json({status:false,message:'something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}


export const uploadCoverImage = async (req:Request,res:Response) => {
    try {
        const userId = req.userId
        const image  = req.body.image
        if(image && userId){
            await userModel.findByIdAndUpdate({_id:userId},{coverImage:image})
            res.status(200).json({status:true,message:'cover image successfully uploaded'})
        }else{
            res.json({status:false,message:'image not found'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}


//---> Account Disable <---//
export const accountDisable = async (req:Request,res:Response) => {
    try {
        console.log(req.userId)
        const userId = req.userId
        await userModel.findByIdAndUpdate({_id:userId},{disabled:true})
        const user = await userModel.findById(userId)
        if(user?.disabled){
            res.status(200).json({status:true,message:'account disabled'})
        }else{
            res.json({status:false,message:'account not disabled'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const accountEnable = async (req:Request, res:Response) => {
    try {
        console.log(req.userId)
        const userId = req.userId
        await userModel.findByIdAndUpdate({_id:userId},{disabled:false})
        const user = await userModel.findById(userId)
        console.log(typeof user?.disabled);
        
        if(user?.disabled === false){
            res.status(200).json({status:true,message:'account enabled'})
        }else{
            res.json({status:false,message:'account not enabled'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const accountDelete = async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        const password = req.body.password
        if(!userId || !password){
            res.json({status:false,message:'All feilds are required'})
        }
        const user = await userModel.findOne({_id:userId})
        console.log(user);
        if(user){
            const currentPassword = user.password;
            const isMatched = await compare(password, currentPassword as string)
            if(isMatched){
                await userModel.findByIdAndDelete({_id:userId})
                res.status(200).json({status:true,message:'account deleted successfully'})
            }else{
                res.json({status:false,message:'Please enter a valid password'})
            }
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const uploadPosts = async (req:Request , res:Response) => {
    try {
        const userId = req.userId;
        const {postImg , caption} = req.body;
        if(postImg || caption){
            const doc = new postsModel({
                userId : userId,
                post : postImg || null,
                caption : caption || null,
            })
            await doc.save();
            res.status(200).json({status:true,message:'post uploaded successfully'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> Get User Feeds <---//
export const getUsersFeeds = async (req:Request, res:Response) => {
    try {
        const userId = req.userId
        if(userId){
            const feeds = await postsModel.find({userId:userId}).sort({createdAt: -1}).populate('userId');
            res.status(200).json({status:true,data:feeds,message:'success'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> Get User Datas <---//
export const getDetails = async (req:Request,res:Response) => {
    try {
        const userId = req.userId
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
                'profile':userData.profile,
                'coverImage':userData.coverImage,
                'category':userData.category,
                'isVerified':userData.isVerified,
                'isBanned':userData.isBanned,
                'creator':userData.creator,
                'disabled':userData.disabled,
                'isAuthenticated':true
            }) 
        }else{
            res.json({data:undefined,message: 'User not found'});
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error."
        res.json({status:false, message:message})
    }
}
