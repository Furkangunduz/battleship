import Board from '../components/Board';
import { useEffect, useContext, useState } from 'react';
import ShipContext from '../ShipContext';
import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import BattleContext from '../BattleContext';
import { toast } from 'react-toastify';

function Battle({ navigate }) {
	const { setIsBattleStart } = useContext(ShipContext);
	const { socket } = useContext(SocketContext);
	const { userData, enemyName } = useContext(UserContext);
	const { myBoard, setMyBoard, enemyBoard, setEnemyBoard, isMyTurn, setIsMyTurn } =
		useContext(BattleContext);

	useEffect(() => {
		setIsBattleStart(true);
		socket.on('not_your_turn', () => {
			toast('Not your turn.');
		});
		socket.on('new_map', (new_map) => {
			new_map.forEach((player) => {
				if (player[0] == enemyName) {
					setEnemyBoard(player[1]);
				} else {
					setIsMyTurn(player[2]);
					setMyBoard(player[1]);
				}
			});
		});
		socket.on('opponent-left', () => {
			console.log('left');
			toast('Opponent is left...');
			setTimeout(() => {
				navigate(`/`);
			}, 5000);
		});
	}, [socket]);
	return (
		<div className='battle-container'>
			<div className='players-name'>
				<p>{userData.userName}</p>
				<p>
					{isMyTurn
						? `Waiting for ${userData.userName}'s move ...`
						: `Waiting for ${enemyName}'s move ...`}
				</p>
				<p>{enemyName}</p>
			</div>
			<div className='boards-container'>
				<Board key={1} isEnemyBoard={false} board={myBoard} />
				<Board key={2} isEnemyBoard={true} board={enemyBoard} />
			</div>
		</div>
	);
}

export default Battle;
