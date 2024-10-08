import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [ socket, setSocket ] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser && !socket) {
            const socket = io("https://chat-app-5w1i.onrender.com", {
                transports: ['websocket'],
                withCredentials: true,
            });
    
            socket.on('message', (message) => {
                console.log('New message received:', message);
            });
    
            setSocket(socket);
            return () => {
                socket.close();
                setSocket(null);
            };
        }
    }, [authUser]);
    

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};