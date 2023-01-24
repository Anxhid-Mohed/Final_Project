import express ,{Router} from 'express'
import { userSignup } from '../../controller/userController'
const router : Router = express.Router()

router.post('/signup',userSignup)

export default router