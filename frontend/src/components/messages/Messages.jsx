import React from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    
    return (
        <div className="messages-container">
            {loading ? <div className="loading-spinner"></div> : null}
            {!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message) => (
                <Message key={message._id} message={message}/>
            ))}
            {!loading && Array.isArray(messages) && messages.length === 0 && (
                <p>Send a message to start a conversation.</p>
            )}
        </div>
    );
}

export default Messages;