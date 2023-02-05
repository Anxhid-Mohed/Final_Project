import express ,{Router} from 'express'
import {adminSignin, usersList} from '../../controller/adminController'
const router : Router = express.Router()

router.post('/signin',adminSignin)
router.get('/users',usersList)


export default router