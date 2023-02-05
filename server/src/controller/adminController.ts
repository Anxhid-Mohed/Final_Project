import { Request,Response } from 'express';
import {genSalt,hash,compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema';


//---> Admin Sign in <---// 
export const adminSignin = (req:Request,res:Response) => {
    console.log(req.body)
}

//---> Users Listing <---// 
export const usersList = async (req:Request,res:Response) => {
    try {
        console.log("aaaaaaaaa");
        
        const users = await userModel.find()
        console.log(users);
        res.status(200).json({status:true,data:users,message:'get users successfully'}); 
    } catch (error) {
        console.log(error);
    }
}