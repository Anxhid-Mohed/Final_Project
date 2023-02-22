
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import tokenModel from '../model/verificationToken'
import crypto from 'crypto'
import { sendMail } from "./emailSend";


export const nodemailer = async (id:string,email:string) => {

    const userToken = await new tokenModel({
    userId:id,
    token:crypto.randomBytes(32).toString('hex')
    }).save();

    const url = `${process.env.CLIENT_BASE_URL}/verify?id=${id}&token=${userToken.token}`
    sendMail(email,'verify email' ,url)
}