import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { messageDateTime } from '../../utils/messageTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const fromMe = message.senderId === authUser._id;
    const formattedDateTime = messageDateTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "my-color" : "another-color";
  
    return (
      <div className={`chat-one ${chatClassName}`}>
        <div className={`chat-bubble ${bubbleBgColor}`}>
          {message.content}
        </div>
        <div className="chat-message-time">{formattedDateTime}</div>
      </div>
    );
};

export default Message;
