import { useState, useCallback } from 'react';
import axios from 'axios';
import useChat from '../zustand/useChat';
import toast from 'react-hot-toast';

const useSearchChats = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats } = useChat();

  const searchChats = useCallback(
    async (search) => {
      setLoading(true);

      try {
        const res = await axios.get('/api/chats/search', {
          params: { search },
        });
        setChats(res.data);
      } catch (e) {
        const errorMessage = e.response?.data?.error || e.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setChats]
  );

  return { searchChats, loading };
};

export default useSearchChats;
