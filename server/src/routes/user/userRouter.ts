import express ,{Router} from 'express'
import {userSignup,verifyAuth,userSignin,accountVerification,getDetails,createrRequest, profileManagement, userPage, uploadCoverImage} from '../../controller/userController'
import { verifyToken } from '../..//middleware/verifyToken'
const router : Router = express.Router()


router.post('/verify-auth',verifyAuth)
router.post('/verify',accountVerification)
router.post('/signup',userSignup)

router.post('/signin',userSignin)

router.post('/verify-token',verifyToken,getDetails)
router.post('/request',verifyToken,createrRequest)
router.patch('/manage',profileManagement)
router.get('/page',userPage)
router.patch('/upload-cover',verifyToken,uploadCoverImage)

export default router

