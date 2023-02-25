import express,{ Router } from "express";
import { addMessage, getMessages } from "../../controller/messageController";
const router:Router = express.Router();

router.post('/',addMessage);
router.get('/:chatId',getMessages)

export default router