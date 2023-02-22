import express ,{Router} from 'express'
import {adminSignin, reportsList, requestsApproval, requestsList, requestsRejection, usersBlockings, usersList, usersUnBlockings} from '../../controller/adminController'
const router : Router = express.Router()

router.post('/signin',adminSignin)
router.get('/users',usersList)
router.patch('/block',usersBlockings)
router.patch('/unblock',usersUnBlockings)
router.get('/requests',requestsList)
router.patch('/approve',requestsApproval)
router.delete('/reject',requestsRejection)
router.get('/report',reportsList);

export default router