import { createContext, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(io('http://localhost:3001'));
	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
