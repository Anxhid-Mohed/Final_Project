import { Request,Response } from 'express';
import chatModel from '../model/chatSchema';
import userModel from '../model/userSchema';

export const createChat = async (req: Request, res: Response) => {
    try {
        console.log(req.body.senderId, req.body.receiverId)
        const newChat = new chatModel({
            members:[req.body.senderId, req.body.receiverId]
        })
        const result = await newChat.save();
        res.status(200).json({status:true, data:result,message:'success'})
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}


export const userChats = async (req: Request, res: Response) => {
    try {
        const chats = await chatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json({status:true, data:chats,message:'success'})
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const findChat = async (req: Request, res: Response) => {
    try {
        const chat = await chatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json({status:true, data:chat,message:'success'})
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

