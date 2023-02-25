import { Request,Response } from 'express';
import {genSalt,hash,compare} from 'bcrypt';
import { nodemailer } from '../utils/nodeMailer';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema'
import verificationModel from '../model/verificationToken';
import postsModel from '../model/postsSchema';
import requestModel from '../model/requestSchema';
import commentsModel from '../model/commentsSchema';
import IntegrationsModel from '../model/BankSchema';
import donationModel from '../model/donationSchema';
import reportsModel from '../model/reportsSchema';

//---> Authentication-validation <---//
export const verifyAuth = async(req:Request,res:Response) => {
    try {        
        const {email,password} = req.body
        if(email && password){

            let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

            if(regEmail.test(email)){
                if(password.length >= 8){
                    const userExit = await userModel.findOne({email:email})

                    if(!userExit){
                        const salt = await genSalt(10)
                        const hashedPassword = await hash(password,salt)
                        const doc = new userModel({
                            email:email,
                            password:hashedPassword,
                            name:null,
                            username:null,
                            about:null,
                            socialLink:null,
                            profile:null,
                            coverImage:null,
                            isVerified:false,
                            isBanned:false,
                        })
                        await doc.save()
                        const user = await userModel.findOne({email:email})
                        const userId = user?._id
                        res.json({userId:userId ,"status": "success", "message": "approved" })
                    }else{
                        res.json({"status":"failed","message":"Your email already exist"})
                    }
                }else{
                res.json({"status":"failed","message":"Password must be at least 8 characters"})
                }
            }else{
                res.json({"status":"failed","message":"Enter a valid email"})
            }
            
        }else{
           res.json({"status":"failed","message":"All feilds are required"})
        }
    } catch (error) {
        console.log(error);    
    }
}

//---> User-Signup <---//
export const userSignup = async(req:Request,res:Response) => {
    try {
        const userData = { ...req.body }
        const userNameExist = await userModel.findOne({username:userData.username})

        if(!userNameExist){
            const userId = userData.userId
            
            await userModel.findByIdAndUpdate(userId,{

                name:userData.name,
                username:userData.username,
                about:userData.about,
                socialLink:userData.social,

            }) 
            const user = await userModel.findById(userId)
            const email = user?.email as string
            const username = user?.username as string
            await nodemailer(userId,email)
             res.status(200).json({status:true,data:username,message:'success'})
        }else{
            res.json({status:false,'message':'username already exists'})
        }

    } catch (error) {
        res.status(500).send({message:'Internal Server Error'})
    }
}

//---> Resend Email <---//
export const resendEmail = async (req:Request, res:Response) => {
    try {
        const userId = req.body.userId
        const user = await userModel.findById(userId)
        const email = user?.email as string
        const isVerified = user?.isVerified
        if(isVerified === false){
            await verificationModel.findOneAndDelete(userId,{})
            await nodemailer(userId,email)
            res.status(200).send({status:true,message:'check your email for verification'})
        }else{
            res.json({status:false,message:'your already verified your account'})
        }
    } catch (error) {
        res.status(500).send({message:'Internal Server Error'})
    }
}

//---> Email Account Activation <---//
export const accountVerification = async (req:Request,res:Response) => {
    try {
        const {id,token} = req.body
        const user = await userModel.findOne({_id:id})

        if(!user)return res.json({message:'invalid link'});
        const userToken = await verificationModel.findOne({
            userId:user._id,
            token:token
        })

        if(userToken){
            await userModel.findByIdAndUpdate(user._id,{
                isVerified:true
            })
            await userToken.remove();
            let userId = user._id;
            let KEY:string = process.env.JWT_KEY as string;
            const token = jwt.sign({userId},KEY, { expiresIn: '3d' })
            res.status(200).json({auth:true,token:token,message:'Account verified,redirecting..'})
        }

    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
    
}


//---> User Signin <---//
export const userSignin = async (req:Request,res:Response) => {

    try {
        const {email,password} = req.body;
        console.log(email,password);
        if(email && password){
            const user = await userModel.findOne({email:email})
            // if(!user.isBanned){}
                if(user){
                    const userPass = user.password as string
                    const isMatched = await compare(password, userPass)
                    if( isMatched){
                        const userEmail = user.email as string
                        if(userEmail === email && isMatched){
                            const token = jwt.sign({ userId: user._id}, process.env.JWT_KEY as string, { expiresIn: '3d' })
                            res.status(200).json({auth:true,token:token,message:'Login successful'})
                        }else{
                            res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                        }
                    }else{
                        res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                    }
                }else{
                    res.status(400).json({auth:false,message:'User not exist'})
                }
        }else{
            res.status(400).json({auth:false,message:'All feilds are required'})
        }
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
    
}


//---> Creator Request <---//
export const createrRequest = async(req:Request, res: Response) => {
    console.log('userrrr',req.userId);
    try {
        const userId = req.userId;
        const {categories}= req.body
        const existReq = await requestModel.findById(userId);
        if(!existReq){
            let obj = {
                userId,
                categories
            }
            await requestModel.create(obj).then((response)=>{
                console.log(response);
                res.status(200).json({status:true,message:'request sended successfully'})
            })
        }else{
            res.json({status:false,message:'You already sended'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}



//---> User Profile Management <---//
export const profileManagement = async (req:Request,res:Response) => {
    try {
        const userData  = {...req.body}
        console.log(userData);
        await userModel.findByIdAndUpdate(userData.userId,{
            name:userData.name,
            about:userData.about,
            category:userData.category,
            socialLink:userData.social,
            profile:userData.profile
        })
        res.status(200).json({status:true,message:'profile updated successfully'})
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> User Page Management <---//
export const userPage = async (req:Request,res:Response) => {
    try {
        const username = req.query.username;
        console.log(username);
        const user = await userModel.findOne({username:username})
        if(user){
            res.status(200).json({status:true,data:user,message:'success'})
        }else{
            res.json({status:false,message:'something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}


export const uploadCoverImage = async (req:Request,res:Response) => {
    try {
        const userId = req.userId
        const image  = req.body.image
        if(image && userId){
            await userModel.findByIdAndUpdate({_id:userId},{coverImage:image})
            res.status(200).json({status:true,message:'cover image successfully uploaded'})
        }else{
            res.json({status:false,message:'image not found'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}


//---> Account Disable <---//
export const accountDisable = async (req:Request,res:Response) => {
    try {
        console.log(req.userId)
        const userId = req.userId
        await userModel.findByIdAndUpdate({_id:userId},{disabled:true})
        const user = await userModel.findById(userId)
        if(user?.disabled){
            res.status(200).json({status:true,message:'account disabled'})
        }else{
            res.json({status:false,message:'account not disabled'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const accountEnable = async (req:Request, res:Response) => {
    try {
        console.log(req.userId)
        const userId = req.userId
        await userModel.findByIdAndUpdate({_id:userId},{disabled:false})
        const user = await userModel.findById(userId)
        console.log(typeof user?.disabled);
        
        if(user?.disabled === false){
            res.status(200).json({status:true,message:'account enabled'})
        }else{
            res.json({status:false,message:'account not enabled'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const accountDelete = async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        const password = req.body.password
        if(!userId || !password){
            res.json({status:false,message:'All feilds are required'})
        }
        const user = await userModel.findOne({_id:userId})
        console.log(user);
        if(user){
            const currentPassword = user.password;
            const isMatched = await compare(password, currentPassword as string)
            if(isMatched){
                await userModel.findByIdAndDelete({_id:userId})
                res.status(200).json({status:true,message:'account deleted successfully'})
            }else{
                res.json({status:false,message:'Please enter a valid password'})
            }
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const userFollowAndUnFollow = async (req:Request, res:Response) => {
    try {
        const userId = Object(req.userId);
        const createrId = req.body.createrId;
        const user = await userModel.findById(userId);
        const exists = user?.followings.some((el:any) => el._id == createrId);
        if(createrId && userId){
            if(!exists){
                //Add to users followings list
                const user = await userModel.findById(userId);
                user?.followings.push(createrId);
                user?.save();
                //Add to creater followers list
                const creater = await userModel.findById(createrId);
                creater?.followers.push(userId);
                creater?.save();
                console.log('followed');
                res.status(200).json({status: 'success',action:'followed',message:'followed successfully'});
            }else{
                //remove from user following list
                const user = await userModel.findOne({_id:userId});
                const followingIndex  = user?.followings.findIndex((element:any)=>element == createrId) as number;
                user?.followings.splice(followingIndex,1);
                await user?.save();
                //remove from creater followers list
                const creater = await userModel.findOne({_id:createrId});
                const followersIndex  = creater?.followers.findIndex((element:any)=>element == userId) as number;
                creater?.followers.splice(followersIndex,1);
                await creater?.save();
                console.log('unfollowed');
                res.status(200).json({status: 'success',action:'UnFollowed',message:'UnFollowed successfully'});
            }
        }else{
            res.json({status:false,message:'oops! Something went wrong'})
        }

    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}



export const uploadPosts = async (req:Request , res:Response) => {
    try {
        const userId = req.userId;
        const {postImg , caption} = req.body;
        if(postImg || caption){
            const doc = new postsModel({
                userId : userId,
                post : postImg || null,
                caption : caption || null,
            })
            await doc.save();
            res.status(200).json({status:true,message:'post uploaded successfully'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

//---> Get User Feeds <---//
export const getUserFeeds = async (req:Request, res:Response) => {
    try {
        const username = req.query.username
        if(username){
            const user = await userModel.findOne({username})
            const userId = user?._id
            
            const feeds = await postsModel.find({userId}).sort({createdAt: -1}).populate('userId');
            res.status(200).json({status:true,data:feeds,message:'success'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const getAllFeeds = async (req: Request, res: Response) => {
    try {
        const feeds = await postsModel.find().sort({createdAt: -1}).populate('userId')
        if(feeds){
            res.status(200).json({status:true,data:feeds,message:'success'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const removePost = async (req:Request , res:Response) => {
    try {
        const postId = req.query.id
        console.log(postId);
        if(postId){
            await postsModel.findByIdAndRemove({_id:postId})
            res.status(200).json({status:true,message:'post deleted successfully'})
        }else{
            res.json({status:false,message:'deletion failed! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const editPost = async (req:Request, res:Response) =>{
    try {
        const {id,changes} = req.body
        if(id && changes){
            await postsModel.findByIdAndUpdate({_id:id},{caption:changes})
            res.status(200).json({status:true,message:'Edit post successfull'})
        }else{
            res.json({status:false,message:'Oops! Something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const likePost = async (req:Request, res:Response) => {
    try {
        const postId = req.body.postId
        const userId = req.userId
        const post = await postsModel.findById(postId)
        let likeObj = {
            userId: userId,
        }
        let likeExist = post?.like.some((data:{userId:string}) => data.userId == userId)
        if(!likeExist){
            const post = await postsModel.findOne({_id:postId})
            post?.like.push(likeObj)
            post?.save().then((response)=> {
                res.status(200).json({status:true,action:'liked',message:'like added successfully'})
            })
        }else{
            const existLike = await postsModel.findOne({_id:postId})
            const index = existLike?.like.findIndex((element:any) => element.userId == userId)
            console.log(index);
            existLike?.like.splice(index,1);
            await existLike?.save()
            res.status(200).json({status:true,action:'unliked',message:'unliked successfully'})
        }
        
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const reportPost = async (req:Request, res:Response) => {
    try {
        const userId = req.userId
        console.log(req.body,'------------')
        const { postId,suggestion } = req.body
        if(postId && suggestion){
            const existReport = await reportsModel.findOne({userId:userId},{postId:postId})
            console.log(existReport,'------')
            if(!existReport){
                const doc = new reportsModel({
                    userId,
                    postId,
                    reason:suggestion
                })
                await doc.save().then((response:any)=>{
                    res.status(200).json({status:true,message:'Your report has been submitted'})
                })
            }else{
                res.json({status:false,message:'You already have a report'})
            }
        }else{
            res.json({status:false,message:'failed'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const getPostComments = async (req:Request, res:Response) => {
    try {
        const postId = req.query.id
        if(postId){
            const comments = await commentsModel.find({postId}).populate('userId')
            res.status(200).json({status:true,data:comments, message:'success'})
        }else{
            res.json({status:false,message:'failed to find comments'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const commentPost = async (req:Request, res:Response) => {
    try {
        const postId = req.body.postId
        const userId = req.userId
        const comment = req.body.comment
        if(postId && userId && comment){
            const doc = new commentsModel({
                userId: userId,
                postId: postId,
                comment: comment
            })
            await doc.save()
            res.status(200).json({status:true,message:'comment added'})
        }else{
            res.json({status:false,message:'something went wrong'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const commentsLikes = async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        const commentId = req.body.commentId;
        const comment = await commentsModel.findById(commentId)
        let likeObj = {
            userId: userId,
        }
        let likeExist = comment?.likes.some((data:any) => data.userId == userId)
        console.log(likeExist);
        
        if(!likeExist){
            const comment = await commentsModel.findOne({_id:commentId})
            comment?.likes.push(likeObj)
            comment?.save().then((response)=> {
                res.status(200).json({status:true,action:'liked',message:'like added successfully'})
            })
        }else{
            const existLike = await commentsModel.findOne({_id:commentId})
            const index = existLike?.likes.findIndex((element:any)=> element.userId == userId)
            existLike?.likes.splice(index,1);
            await existLike?.save().then((response)=>{
                console.log(response,'unlike')
                res.status(200).json({status:true,action:'unliked',message:'unliked successfully'})
            })
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}


export const deleteComments = async (req:Request, res:Response) => {
    try {
        const commentId = req.query.commentId;
        if(commentId){
            await commentsModel.findByIdAndRemove({_id:commentId})
            res.status(200).json({status:true,message:'comment deleted successfully'})
        }else{
            res.json({status:false,message:'comment not found'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const getAllCreaters = async (req:Request, res:Response) => {
    try {
        const creaters = await userModel.find({creator:true})
        if(creaters){
            res.status(200).json({status:true,data:creaters,message:'success'})
        }else{
            res.json({status:false,message:'creaters not found'}) 
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const searchCreaters = async (req:Request, res:Response) => {
    try {
        const search = req.query.explore
        console.log(search);
        const data = await userModel.find({username : {$regex: search },creator:true})
        if(data){
            res.status(200).json({status:true,data:data,message:'success'})
        }else{
            res.json({status:false,message:'creaters not found'}) 
        }
    } catch (error) {
        res.status(500).json({status:false,message:'Internal Server'})
    }
}

export const integrateBankAcc = async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const { name,accountNo,Ifsc,branch,transactionId } = req.body;
        if(name && accountNo && Ifsc && branch){
            const doc = new IntegrationsModel({
                userId: userId,
                Fullname:name,
                AccountNumber:accountNo,
                IFSC:Ifsc,
                Branch:branch,
                TransactionId:transactionId || null
            })
            doc.save();
            res.status(200).json({status:true,message:'integration success'})
        }else{
            res.json({status:false,message:'integration error'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const editUserBankInfo = async (req:Request, res:Response) => {
    try {
        const userId = req.userId

        const { name,accountNo,Ifsc,branch,transactionId } = req.body;
        console.log(name,accountNo,Ifsc,branch,transactionId);
        
        if(name && accountNo && Ifsc && branch){
            await IntegrationsModel.findOneAndUpdate({userId},{
                Fullname:name,
                AccountNumber:accountNo,
                IFSC:Ifsc,
                Branch:branch,
                TransactionId:transactionId || null
            })
            res.status(200).json({status:true,message:'edit successfull'})
        }else{
            res.json({status:false,message:'process failed'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const getUserBankInfo = async (req:Request, res:Response) => {
    try {
        const userId = req.userId
        if(userId){
            const data = await IntegrationsModel.findOne({userId})
            console.log(data,'------------------');
            if(data){
                res.status(200).json({status:true,data:data,message:'success'})
            }else{
                res.json({status:false,data:null,message:'failed to find '})
            }
        }else{
            res.json({status:false,message:'failed to find '})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const ApproveDonation = async (req:Request , res:Response) => {
    try {
        const data = req.body.info
        const creatorId = req.body.creatorId
        const donorId = req.userId
        console.log(data,'------------------',creatorId,'===============',donorId);
        const creatorExist = await donationModel.findOne({userId:creatorId})
        console.log(creatorExist,'---------')
        let object = {
            donorId:donorId,
            amount:data.amount,
            note:data.note
        }
        if(creatorExist){
            const creator = await donationModel.findOne({userId:creatorId})
            const amount = (parseInt(creator?.amount) + parseInt(data.amount))
            const donation = await donationModel.findOneAndUpdate({userId:creatorId},{amount:amount})
            donation?.donators.push(object)
            await donation?.save().then((response)=>{
                res.status(200).json({status:true, message:'Your donation is successfull'})
            })
        }else{
            let doc = {
                userId:creatorId,
                amount:data.amount, 
                donators:[object]
            }
            await donationModel.create(doc).then((response)=>{
                res.status(200).json({status:true, message:'Your donation is successfull'})
            })
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const getUserWallet = async (req:Request , res:Response) => {
    try {
        const userId = req.userId
        const userWallet = await donationModel.findOne({userId:userId}).populate('donators.donorId')
        if(!userWallet){
            res.json({status:false,message:'user dont have wallet'})
        }
        res.status(200).json({status:true,data:userWallet,message:'success'})
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

export const getUserDatas = async (req: Request, res: Response) => {
    try {
        console.log('0000000000000000000000')
        const userId = req.query.id
        console.log(userId)
        const user = await userModel.findById(userId)
        console.log(user,"?>>>>>>")
        res.status(200).json({status:true, data:user,message:'okkkkkk'})
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}

//---> Get User Datas <---//
export const getDetails = async (req:Request,res:Response) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).populate(['followers','followings'])
        console.log(userData);
        
        if (userData){
          
            res.json({
                'userId': userData._id,
                'email':userData.email,
                'name':userData.name,
                'username':userData.username,
                'about':userData.about,
                'socialLink':userData.socialLink,
                'profile':userData.profile,
                'coverImage':userData.coverImage,
                'category':userData.category,
                'followers':userData.followers,
                'followings':userData.followings,
                'isVerified':userData.isVerified,
                'isBanned':userData.isBanned,
                'creator':userData.creator,
                'disabled':userData.disabled,
                'isAuthenticated':true
            }) 
        }else{
            res.json({status:false,data:undefined,message: 'User not found'});
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error."
        res.json({status:false, message:message})
    }
}
