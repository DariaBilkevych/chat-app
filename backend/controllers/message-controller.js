import Message from '../models/message-model.js';
import Chat from '../models/chat-model.js';
import axios from 'axios';
import { io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { chatId } = req.params;
    const { content } = req.body;
    if (!chatId || !content) {
      return res.status(400).json({ e: 'Content are required!' });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ e: 'Chat not found!' });
    }

    const message = new Message({
      chat: chatId,
      senderId,
      content,
    });

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    io.emit('message', { chatId, message });

    setTimeout(async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data.content;

        const autoResponseMessage = new Message({
          chat: chatId,
          senderId: null,
          content: quote,
        });

        await autoResponseMessage.save();

        chat.messages.push(autoResponseMessage._id);
        await chat.save();

        io.emit('message', { chatId, message: autoResponseMessage });
      } catch (error) {
        console.error(
          'Error fetching quote or saving auto-response:',
          error.message
        );
      }
    }, 3000);

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ e: 'Internal server error' });
  }
};

export const editMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required!' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found!' });
    }

    message.content = content;
    await message.save();

    io.to(chatId).emit('message', { chatId, message });

    res.status(200).json(message);
  } catch (error) {
    console.error('Error editing message:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
