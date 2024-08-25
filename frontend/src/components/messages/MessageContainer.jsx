import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import '../../styles/home/Messages.css';
import useChat from '../../zustand/useChat.js';
import useGetChats from '../../hooks/useGetChats';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedChat, setSelectedChat } = useChat();
  const { chats } = useGetChats();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedChat(null);
  }, [setSelectedChat]);

  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats, selectedChat, setSelectedChat]);

  useEffect(() => {
    if (selectedChat && chats.length > 0) {
      const updatedChat = chats.find(chat => chat._id === selectedChat._id);
      if (updatedChat) {
        setSelectedChat(updatedChat);
      }
    }
  }, [chats, selectedChat, setSelectedChat]);

  useEffect(() => {
    setSelectedChat(null);
  }, [authUser, setSelectedChat]);

  return (
    <div className="message-container">
      <div className="message-header">
        {selectedChat ? (
          <>
            <span className="label-text">To: </span>
            <span className="recipient-name">
              {selectedChat.receiver.firstname} {selectedChat.receiver.lastname}
            </span>
          </>
        ) : (
          <span className="no-chat-message">Select a chat</span>
        )}
      </div>
      {selectedChat && (
        <>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
