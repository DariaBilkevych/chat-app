import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import MessageContainer from '../components/messages/MessageContainer';
import '../styles/home/Home.css';

const Home = () => {
  return (
    <div className="home-container">
        <Sidebar />
        <MessageContainer />
    </div>
  )
}

export default Home;