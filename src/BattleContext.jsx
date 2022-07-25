import { createContext, useState } from 'react';

const BattleContext = createContext();

export const BattleProvider = ({ children }) => {
	const [myBoard, setMyBoard] = useState(null);
	const [enemyBoard, setEnemyBoard] = useState(null);
	const [isMyTurn, setIsMyTurn] = useState(false);
	const [winner, setWinner] = useState(null);

	return (
		<BattleContext.Provider
			value={{
				myBoard,
				setMyBoard,
				enemyBoard,
				setEnemyBoard,
				isMyTurn,
				setIsMyTurn,
				winner,
				setWinner,
			}}>
			{children}
		</BattleContext.Provider>
	);
};

export default BattleContext;
