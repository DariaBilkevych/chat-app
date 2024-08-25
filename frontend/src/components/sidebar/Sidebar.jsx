import React from 'react';
import AddChatButton from './AddChatButton';
import SearchInput from './SearchInput';
import Chats from './Chats';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/home/Sidebar.css';

const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="user-info">
        <span className="user-name">{authUser.firstname} {authUser.lastname}</span>
      </div>
      <div className="top-section">
        <SearchInput />
        <AddChatButton />
      </div>
      <div className="divider"></div>
      <Chats />
      <LogoutButton />
    </div>
  )
}

export default Sidebar;
