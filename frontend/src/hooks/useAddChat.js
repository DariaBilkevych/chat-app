import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useChat from '../zustand/useChat.js';

const useAddChat = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats } = useChat();

  const addChat = async (firstname, lastname) => {
    setLoading(true);

    try {
      const res = await axios.post('/api/chats/create', {
        firstname,
        lastname,
      });
      const newChat = res.data;

      setChats([...chats, newChat]);
      toast.success('Chat added successfully!');
    } catch (e) {
      toast.error(e.res?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { addChat, loading };
};

export default useAddChat;
