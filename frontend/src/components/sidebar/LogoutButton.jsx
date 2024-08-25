import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const {loading, logout} = useLogout();

  return (
    <div className='logout-button'>
        {!loading ? (
          <BiLogOut className="logout-icon" onClick={logout}/>
        ) : (
          <div className="loading-spinner"></div>
        )}
    </div>
  )
}

export default LogoutButton;