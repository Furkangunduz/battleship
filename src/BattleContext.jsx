import { createContext, useState } from 'react';

const BoardContext = createContext();

export const UserProvider = ({ children }) => {
	const [myBoard, setmyBoard] = useState(null);
	const [enemyBoard, setEnemyBoard] = useState(null);
	return (
		<BoardContext.Provider value={{ myBoard, setmyBoard, enemyBoard, setEnemyBoard }}>
			{children}
		</BoardContext.Provider>
	);
};

export default BoardContext;
