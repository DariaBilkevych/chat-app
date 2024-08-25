import { useEffect, useState } from 'react';
import useChat from '../zustand/useChat';
import axios from 'axios';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChat } = useChat();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/chats/${selectedChat._id}`);
        const data = await res.data;

        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data.messages);
      } catch (e) {
        toast.error(e.response?.data?.error || e.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChat?._id) {
      getMessages();
    }
  }, [selectedChat?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
