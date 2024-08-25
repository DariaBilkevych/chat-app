import React from 'react';
import useGetChats from '../../hooks/useGetChats';
import Chat from './Chat';

const Chats = () => {
  const { loading, chats } = useGetChats();

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (!loading && chats.length === 0) {
    return <div className="no-chats">No chats available. You can create them!</div>;
  }

  return (
    <div className="chats">
      {chats.map((chat) => {
        const { firstname, lastname } = chat.receiver;
        return (
          <Chat key={chat._id} chat={chat}>
            {firstname} {lastname}
          </Chat>
        );
      })}
    </div>
  );
};

export default Chats;
