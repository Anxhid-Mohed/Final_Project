// import {Request,Response,NextFunction} from 'express'
// import jwt from 'jsonwebtoken'


// export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         const headerToken:any = req.headers.usertoken;
//         console.log("Error",headerToken);
        
//         interface ITokenPayload {
//           iat: number;
//           exp: number;
//           id: string;
//         }
//         if (!headerToken) {
//           return res.status(401).send({
//             message: "auth failed",
//             Status: false,
//           });
//         }

//         const KEY:any = process.env.JWT_KEY
//         jwt.verify(headerToken,KEY,(err: Object | null, decoded: Object | undefined) => {
//             if (err) {    
//               console.log(err);
                    
//               return res.send({
//                 message: "auth failed",
//                 Status: false,
//               });
//             } else {
//               const { id } = decoded as ITokenPayload;
//               console.log("here",id);
              
//               req.body.userId = id;
//               next();
//             }
//           }
//         );
//     } catch (error) {
//         console.log(error);
        
//     }
// }