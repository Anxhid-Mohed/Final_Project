import express,{ Router } from "express";
import { addMessage, getMessages, readMessages } from "../../controller/messageController";
const router:Router = express.Router();

router.post('/',addMessage);
router.get('/:chatId',getMessages)
router.patch('/:chatId/:userId',readMessages)

export default router