import mongoose from 'mongoose';
import Chat from '../models/chat-model.js';
import Message from '../models/message-model.js';

export const getAllChats = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const chats = await Chat.find({ creatorId });

    if (!chats.length) {
      return res.status(404).json({ error: 'No chats found!' });
    }

    res.status(200).json(chats);
  } catch (e) {
    console.error('Error retrieving chats:', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOneChat = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'Invalid chat ID format!' });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      creatorId,
    }).populate('messages');

    res.status(200).send(chat);
  } catch (e) {
    console.error('Error retrieving chat:', error.message);
    res.status(500).json({ e: 'Internal server error' });
  }
};

export const createChat = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname) {
      return res
        .status(400)
        .json({ error: 'Firstname and lastname are required!' });
    }

    const existingChat = await Chat.findOne({
      'receiver.firstname': firstname,
      'receiver.lastname': lastname,
    });

    if (existingChat) {
      return res
        .status(400)
        .json({ error: 'A chat with the given name already exists!' });
    }

    const newChat = new Chat({
      creatorId,
      receiver: {
        firstname,
        lastname,
      },
    });

    await newChat.save();
    res.status(201).send(newChat);
  } catch (e) {
    console.error('Error creating chat:', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { firstname, lastname } = req.body;

    if (!firstname && !lastname) {
      return res
        .status(400)
        .json({ error: 'At least one of firstname or lastname is required!' });
    }

    const updateData = {};
    if (firstname) {
      updateData['receiver.firstname'] = firstname;
    }
    if (lastname) {
      updateData['receiver.lastname'] = lastname;
    }

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found!' });
    }

    res.status(200).send(chat);
  } catch (e) {
    console.error('Error creating chat:', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found!' });
    }

    await Message.deleteMany({ chat: chatId });
    await Chat.findByIdAndDelete(chatId);

    res.status(204).send();
  } catch (e) {
    console.error('Error deleting chat:', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
