import React, { useState } from 'react';
import useChat from '../zustand/useChat.js';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChat } = useChat();

  const sendMessage = async (messageContent) => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/messages/send/${selectedChat._id}`, {
        content: messageContent,
      });

      const newMessage = res.data;
      setMessages([...messages, newMessage]);
    } catch (error) {
      toast.error(e.res?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
