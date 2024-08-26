import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { messageDateTime } from '../../utils/messageTime';
import useEditMessage from '../../hooks/useEditMessage';
import { FiEdit2 } from 'react-icons/fi';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const { editMessage, loading } = useEditMessage();

  const fromMe = message.senderId === authUser._id;
  const formattedDateTime = messageDateTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "my-color" : "another-color";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editContent.trim() === '') {
      return;
    }

    await editMessage(message.chat, message._id, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <div className={`chat-one ${chatClassName}`}>
      <div className="message-and-edit">
        {fromMe && (
          <button onClick={handleEdit} className="edit-button-chat">
            <FiEdit2 />
          </button>
        )}
        <div className={`chat-bubble ${bubbleBgColor}`}>
          {isEditing ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="edit-textarea"
              />
              <div className="edit-buttons">
                <button onClick={handleSave} disabled={loading} className="save-button">
                  {loading ? <div className="loading-spinner"></div> : 'Save'}
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <span>{message.content}</span>
          )}
        </div>
      </div>
      <div className="chat-message-time">{formattedDateTime}</div>
    </div>
  );
};

export default Message;