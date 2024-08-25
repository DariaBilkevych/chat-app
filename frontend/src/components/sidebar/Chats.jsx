import React from 'react';
import useGetChats from '../../hooks/useGetChats';
import Chat from './Chat';

const Chats = () => {
  const { loading, chats } = useGetChats();

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

      {loading ? <div className="loading-spinner"></div> : null}
    </div>
  );
};

export default Chats;
