import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5'; 
import useAddChat from '../../hooks/useAddChat';

const AddChatButton = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { loading, addChat } = useAddChat();

  const handleSubmit = () => {
    addChat(firstname, lastname);
    setFirstname('');
    setLastname('');
    setIsDialogOpen(false);
  };

  return (
    <div className="add-chat-container">
      <button className="add-chat-button" onClick={() => setIsDialogOpen(true)}>
        <IoAdd className="add-chat-icon" />
      </button>
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>Add New Chat</h3>
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
            <button onClick={handleSubmit} disabled={false}>
              Add Chat
            </button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddChatButton;
