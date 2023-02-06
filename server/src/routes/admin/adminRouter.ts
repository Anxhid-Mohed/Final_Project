import express ,{Router} from 'express'
import {adminSignin, requestsList, usersBlockings, usersList, usersUnBlockings} from '../../controller/adminController'
const router : Router = express.Router()

router.post('/signin',adminSignin)
router.get('/users',usersList)
router.patch('/block',usersBlockings)
router.patch('/unblock',usersUnBlockings)
router.get('/requests',requestsList)

export default router