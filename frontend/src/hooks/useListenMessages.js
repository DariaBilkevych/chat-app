import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useChat from '../zustand/useChat';
import toast from 'react-hot-toast';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChat();

  useEffect(() => {
    socket?.on('message', (newMessage) => {
      setMessages([...messages, newMessage.message]);

      if (newMessage.message.senderId === null) {
        toast.success('New auto-response message received!');
      } else {
        toast('Whait 3 second, please.', {
          duration: 2500,
        });
      }
    });

    return () => socket?.off('message');
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
