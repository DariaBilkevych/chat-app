import React from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';

const Messages = () => {
    const { messages, loading } = useGetMessages();
    
    return (
        <div className="messages-container">
            {loading ? <div className="loading-spinner"></div> : null}
            {!loading && messages.length > 0 && messages.map((message) => (
                <Message key={message._id} message={message}/>
            ))}
            {!loading && messages.length === 0 && (
                <p>Send a message to start a conversation.</p>
            )}
        </div>
    );
}

export default Messages;