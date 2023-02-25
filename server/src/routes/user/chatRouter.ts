import express, { Router } from "express";
import { createChat, findChat, userChats } from "../../controller/chatController";

const router:Router = express.Router();

router.post('/',createChat)
router.get('/:userId',userChats)
router.get('/find/:firstId/:secondId',findChat)

export default router;