import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import {messageTime} from '../../utils/messageTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = messageTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "my-color" : "another-color";
  
    const shakeClass = message.shouldShake ? "shake" : "";
  
    return (
      <div className={`chat-one ${chatClassName}`}>
        <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
          {message.content}
        </div>
        <div className="chat-message-time">{formattedTime}</div>
      </div>
    );
};

export default Message;