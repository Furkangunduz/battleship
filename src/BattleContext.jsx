import { createContext, useState } from 'react';

const BattleContext = createContext();

export const BattleProvider = ({ children }) => {
	const [myBoard, setMyBoard] = useState(null);
	const [enemyBoard, setEnemyBoard] = useState(null);
	const [isMyTurn, setIsMyTurn] = useState(false);

	return (
		<BattleContext.Provider
			value={{ myBoard, setMyBoard, enemyBoard, setEnemyBoard, isMyTurn, setIsMyTurn }}>
			{children}
		</BattleContext.Provider>
	);
};

export default BattleContext;
