import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useChat from '../zustand/useChat.js';

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats, setSelectedChat } = useChat();

  const deleteChat = async (chatId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/chats/delete/${chatId}`);

      const updatedChats = chats.filter((chat) => chat._id !== chatId);
      setChats(updatedChats);

      if (setSelectedChat) {
        if (updatedChats.length > 0) {
          setSelectedChat(updatedChats[0]);
        } else {
          setSelectedChat(null);
        }
      }

      toast.success('Chat deleted successfully!');
    } catch (e) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteChat };
};

export default useDeleteChat;
