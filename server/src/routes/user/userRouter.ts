import express ,{Router} from 'express'
import { userSignup, verifyAuth,userSignin } from '../../controller/userController'
// import { verifyToken } from '../../middleware/userAuth'
const router : Router = express.Router()

router.post('/signup',userSignup)
router.post('/verify-auth',verifyAuth)
router.post('/signin',userSignin)


// router.get('/verify-token',verifyToken)
export default router