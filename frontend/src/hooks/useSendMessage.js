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

      const newMessage = await new Promise((resolve) => {
        const listener = (data) => {
          if (data.chatId === selectedChat._id) {
            resolve(data.message);
            socket.off('message', listener);
          }
        };
        socket.on('message', listener);
      });

      setMessages([...messages, newMessage]);
    } catch (error) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
