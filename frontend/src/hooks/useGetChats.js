import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useChat from '../zustand/useChat';

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats } = useChat();

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/chats/');
        const data = res.data;

        setChats(data);
      } catch (e) {
        toast.error(e.res?.data?.error || e.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, [setChats]);

  return { loading, chats };
};

export default useGetChats;
