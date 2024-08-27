import React, { useState } from 'react';
import useChat from '../zustand/useChat.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, setChats, selectedChat } = useChat();

  const sendMessage = async (messageContent) => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/messages/send/${selectedChat._id}`, {
        content: messageContent,
      });

      const newMessage = res.data;

      if (!messages.some((msg) => msg._id === newMessage._id)) {
        setMessages([...messages, newMessage]);
      }

      const updatedChats = await axios.get('/api/chats');
      setChats(updatedChats.data);
    } catch (error) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
