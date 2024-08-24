import express from 'express';
import {
  getAllChats,
  getOneChat,
  createChat,
  updateChat,
  deleteChat,
} from '../controllers/chat-controller.js';
import protectRoute from '../middelware/protect-route.js';

const router = express.Router();

router.get('/', protectRoute, getAllChats);
router.get('/:chatId', protectRoute, getOneChat);
router.post('/create', protectRoute, createChat);
router.patch('/update/:chatId', protectRoute, updateChat);
router.delete('/delete/:chatId', protectRoute, deleteChat);

export default router;
