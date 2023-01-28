import { sendMail } from "./emailSend";

export const nodemailer =async (id:string,email:string) => {
    const url = `${process.env.CLIENT_BASE_URL}/verify?id=${id}`
    sendMail(email,'verify email' ,url)
}