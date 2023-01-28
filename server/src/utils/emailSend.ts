import nodemailer from 'nodemailer';

export const sendMail = async(email:string,subject:string,text:string)=>{
    try {
        const smtpTransport = nodemailer.createTransport({
            host: process.env.HOST,
            service:process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
              user:process.env.USER_NAME,
              pass:process.env.PASS ,
            },
        });

        await smtpTransport.sendMail({
            from: process.env.USER_NAME,
            to: email,
            subject:subject,
            text:text,
        })

        console.log("email sent successfully");
        
    } catch (error) {
        console.log("email not sented");
        console.log(error);
    }
}