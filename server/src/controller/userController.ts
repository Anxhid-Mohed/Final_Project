import { Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'


export const userSignup = async(req:Request,res:Response) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
}