import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({ roomName: '', userName: '' });
	const [enemyName, setEnemyName] = useState('');
	return (
		<UserContext.Provider value={{ userData, setUserData, enemyName, setEnemyName }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
