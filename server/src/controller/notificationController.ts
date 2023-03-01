import { Request , Response } from "express";
import notificationModel from "../model/notificationSchema";


export const userNotification = async ( req:Request, res:Response) => {
    try {
        const {senderId , receiverId , content } = req.body
        if(senderId && receiverId && content) {
            const doc = new notificationModel({
                senderId,
                receiverId,
                content, 
            })
            await doc.save();
            res.status(200).json({status:true, message:'success'})
        }else{
            res.json({status:false, message:'failed'})
        }
    } catch (error) {
        res.status(500).json({status:false, message:"Internal Server Error"})
    }
}