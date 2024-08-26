import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useChat from '../zustand/useChat';

const useEditMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useChat();

  const editMessage = async (chatId, messageId, content) => {
    setLoading(true);

    try {
      const res = await axios.put(`/api/messages/${chatId}/${messageId}`, {
        content,
      });
      toast.success('Message updated successfully!');

      setMessages(
        messages.map((message) =>
          message._id === messageId ? { ...message, content } : message
        )
      );

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update message.');
    } finally {
      setLoading(false);
    }
  };

  return { editMessage, loading };
};

export default useEditMessage;
