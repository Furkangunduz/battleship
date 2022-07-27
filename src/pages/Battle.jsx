import Board from '../components/Board';
import { useEffect, useContext, useState } from 'react';
import ShipContext from '../ShipContext';
import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import BattleContext from '../BattleContext';
import { toast } from 'react-toastify';
import RemainingShips from '../components/RemainingShips';
import Win from '../components/Win';

function Battle({ navigate }) {
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');

	const { setIsBattleStart } = useContext(ShipContext);
	const { socket } = useContext(SocketContext);
	const { userData, enemyName } = useContext(UserContext);
	const {
		myBoard,
		setMyBoard,
		enemyBoard,
		setEnemyBoard,
		isMyTurn,
		setIsMyTurn,
		winner,
		setWinner,
	} = useContext(BattleContext);

	const popup = (message) => {
		if (!showPopup) {
			setShowPopup(true);
			setPopupMessage(message);
			setTimeout(() => {
				setShowPopup(false);
				setPopupMessage('');
			}, 100);
		}
	};

	useEffect(() => {
		setIsBattleStart(true);
		socket.on('not_your_turn', () => {
			popup('Not your turn.');
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
			popup('Opponent is left...');
			setTimeout(() => {
				window.location.href = '/';
			}, 5000);
		});
		socket.on('game-finish', (winner) => {
			console.log('winner', winner);
			setWinner(winner);
		});
		socket.on('socket');
	}, [socket]);

	if (showPopup) {
		toast(popupMessage);
	}

	return (
		<>
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
					<RemainingShips />

					<Board key={1} isEnemyBoard={false} board={myBoard} />
					<Board key={2} isEnemyBoard={true} board={enemyBoard} />

					<RemainingShips />
				</div>
			</div>
			{winner && <Win />}
		</>
	);
}

export default Battle;
