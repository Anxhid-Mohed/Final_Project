import express ,{Router} from 'express'
import { userSignup, verifyAuth } from '../../controller/userController'
const router : Router = express.Router()

router.post('/signup',userSignup)
router.post('/verify-auth',verifyAuth)

export default router