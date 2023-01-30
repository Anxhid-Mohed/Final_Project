import express ,{Router} from 'express'
import { userSignup, verifyAuth,userSignin, accountVerification} from '../../controller/userController'
// import { verifyToken } from '../../middleware/userAuth'
const router : Router = express.Router()


router.post('/verify-auth',verifyAuth)
router.post('/signup',userSignup)
router.get('/verify',accountVerification)
router.post('/signin',userSignin)


// router.get('/verify-token',verifyToken)
export default router