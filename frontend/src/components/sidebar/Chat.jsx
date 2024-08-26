import React, { useState } from 'react';
import { IoPencilSharp, IoTrashSharp } from 'react-icons/io5';
import useChat from '../../zustand/useChat.js';
import useEditChat from '../../hooks/useEditChat'; 
import useDeleteChat from '../../hooks/useDeleteChat'; 

const Chat = ({ chat }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [firstname, setFirstname] = useState(chat.receiver.firstname);
  const [lastname, setLastname] = useState(chat.receiver.lastname);
  const { loading: editLoading, editChat } = useEditChat();
  const { loading: deleteLoading, deleteChat } = useDeleteChat();

  const { selectedChat, setSelectedChat } = useChat();
  const isSelected = selectedChat?._id === chat._id;

  const handleEdit = () => {
    editChat(chat._id, firstname, lastname);
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteChat(chat._id);
    setIsConfirmDialogOpen(false);
  };

  return (
    <div
      className={`chat ${isSelected ? 'selected' : ''}`}
      onClick={() => setSelectedChat(chat)}
    >
      <div className="chat-header">
        <div className="chat-info">
          {chat.receiver.firstname} {chat.receiver.lastname}
        </div>
      </div>
      {isSelected && (
        <div className="chat-actions">
          <button className="edit-button" onClick={() => setIsEditDialogOpen(true)}>
            <IoPencilSharp className="edit-icon" />
          </button>
          <button className="delete-button" onClick={() => setIsConfirmDialogOpen(true)}>
            <IoTrashSharp className="delete-icon" />
          </button>
        </div>
      )}

      {isEditDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>Edit Chat</h3>
            <input
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <button onClick={handleEdit} disabled={editLoading}>
              {editLoading ? <div className="loading-spinner"></div> : 'Update Chat'}
            </button>
            <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isConfirmDialogOpen && (
        <div className="confirmation-dialog">
          <div className="confirmation-dialog-content">
            <p>Are you sure you want to delete this chat?</p>
            <button onClick={handleDelete} disabled={deleteLoading}>
              {deleteLoading ? <div className="loading-spinner"></div> : 'Yes, delete'}
            </button>
            <button onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
