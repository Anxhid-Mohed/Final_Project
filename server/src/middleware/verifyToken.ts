import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

export const verifyToken = async(req:Request, res:Response,next:NextFunction) => {
    try {

        interface ITokenPayload {
            iat: number;
            exp: number;
            userId: string;
        }

        const token = req.headers['accesstoken'] as string;
        console.log(req.headers);
        
        if(!token){
            console.log('no token');
            res.json({status:false,message:'You need to provide a token'})
        }else{
            console.log('token');
            jwt.verify(token,process.env.JWT_KEY as string ,(error,decoded)=>{
                if(error){
                    console.log('token error');
                    console.log(error);
                    res.json({status:false,auth:false,message:'authentication failed'})
                }else{
                    console.log('worked');
                    console.log(decoded);
                    const {userId} = decoded as ITokenPayload;
                    console.log('userId kitty midw',userId);
                    req.userId = userId;
                    next();
                }
            })
        }
    } catch (error) {
        res.json({status:false,auth:false,message:'authentication error'});
    }
}