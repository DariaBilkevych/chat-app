import express from 'express';
import { sendMessage, editMessage } from '../controllers/message-controller.js';
import protectRoute from '../middelware/protect-route.js';

const router = express.Router();

router.post('/send/:chatId', protectRoute, sendMessage);
router.put('/:chatId/:messageId', protectRoute, editMessage);

export default router;
