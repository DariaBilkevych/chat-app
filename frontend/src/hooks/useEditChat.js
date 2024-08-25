import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useChat from '../zustand/useChat.js';

const useEditChat = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats, setSelectedChat } = useChat();

  const editChat = async (chatId, firstname, lastname) => {
    setLoading(true);

    try {
      const res = await axios.patch(`/api/chats/update/${chatId}`, {
        firstname,
        lastname,
      });

      const updatedChats = chats.map((chat) =>
        chat._id === chatId ? res.data : chat
      );
      setChats(updatedChats);

      if (setSelectedChat && chatId === (setSelectedChat?._id || null)) {
        setSelectedChat(res.data);
      }

      toast.success('Chat updated successfully!');
    } catch (e) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, editChat };
};

export default useEditChat;
