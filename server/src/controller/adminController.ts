import { Request,Response } from 'express';
import {genSalt,hash,compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../model/AdminSchema';
import userModel from '../model/userSchema';
import requestsModel from '../model/requestSchema';


//---> Admin Sign in <---// 
export const adminSignin = async (req:Request,res:Response) => {
    console.log("heuyy");    
    console.log(req.body)
    try {
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({status:false,message:'All feilds are required'})
        }
        const admin = await adminModel.findOne({email:email})
        console.log(admin);
        
        if(!admin){
            res.status(400).json({status:false,message:'Admin not found'})
        }
        const adminPass = admin?.password as string;
        const isMatched = await compare(password,adminPass);
        if(!isMatched){
            res.status(400).json({status:false,message:'Your email or password is incorrect'})
        }
        const adminEmail = admin?.email as string;
        if(!adminEmail === email || !isMatched){
            res.status(400).json({status:false,message:'Your email or password is incorrect'})
        }
        const token = jwt.sign({adminId:admin?._id},process.env.JWTS_KEY as string,{expiresIn:'3d'});
        res.status(200).json({auth:true,token:token,message:'Login successful'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
}


//---> Users Listing <---// 
export const usersList = async (req:Request,res:Response) => {
    try {     
        const users = await userModel.find()
        console.log(users);
        res.status(200).json({status:true,data:users,message:'get users successfully'}); 
    } catch (error) {
        console.log(error);
    }
}


//---> Users Blocking <---// 
export const usersBlockings = async (req:Request,Res:Response) => {
    try {
        const userId = req.query.id
        console.log(userId)
        await userModel.findOneAndUpdate({_id:userId},{isBanned:true})
        Res.status(200).json({status:true,message:'user blocked successfully'}); 
    } catch (error) {
        console.log(error);
    }
}

//---> Users UnBlocking <---// 
export const usersUnBlockings = async (req:Request,Res:Response) => {
    try {
        const userId = req.query.id
        console.log(userId)
        await userModel.findOneAndUpdate({_id:userId},{isBanned:false})
        Res.status(200).json({status:true,message:'user unblocked successfully'}); 
    } catch (error) {
        console.log(error);
    }
}


//---> Requests Listing  <---//
export const requestsList = async (req:Request,res:Response) => {
    try {
        const requests = await requestsModel.find().populate('userId')
        console.log(requests);
        res.status(200).json({status:true,data:requests,message:'get requests successfully'}); 
    } catch (error) {
        console.log(error);
    }
}