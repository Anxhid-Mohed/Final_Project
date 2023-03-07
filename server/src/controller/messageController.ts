import { Request,Response } from "express";
import chatModel from "../model/chatSchema";
import messageModel from "../model/messageSchema";

export const addMessage = async (req: Request, res: Response) =>{
    try {
        const {chatId, senderId , text } = req.body;
        const message = new messageModel({
            chatId,
            senderId,
            text
        })
        const data =  await message.save();
        await chatModel.findOneAndUpdate({_id:chatId},{
            update:Math.random()
        })
        res.status(200).json({status:true, data:data,message:'success'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
}


export const getMessages = async (req: Request, res: Response) => {
    try {
        const {chatId} = req.params;
        console.log(chatId)
        const result = await messageModel.find({chatId})
        res.status(200).json({status:true, data:result,message:'success'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const readMessages = async (req: Request, res: Response) => {
    try {
        console.log(req.params)
        const {chatId,userId} = req.params
        await messageModel.updateMany({chatId:chatId, senderId:userId},{
            read:true
        })
        res.status(200).json({status:true,message:'success'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
}