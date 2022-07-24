import Board from '../components/Board';
import { useEffect, useContext, useState } from 'react';
import ShipContext from '../ShipContext';
import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import { toast } from 'react-toastify';

function Battle() {
	const { setIsBattleStart } = useContext(ShipContext);
	const { socket } = useContext(SocketContext);
	const { userData, enemyName } = useContext(UserContext);
	const [myBoard, setmyBoard] = useState(null);
	const [enemyBoard, setenemyBoard] = useState(null);

	useEffect(() => {
		setIsBattleStart(true);

		socket.on('not_your_turn', () => {
			toast('Not your turn.');
		});

		socket.on('new_map', (new_map) => {
			console.log(
				'state map before set : \n' + 'my map ',
				myBoard,
				'\n',
				'enemy map',
				enemyBoard
			);
			console.log('map from server : ', new_map);
			new_map.forEach((player) => {
				if (player[0] == enemyName) {
					setenemyBoard(player[1]);
				} else {
					setmyBoard(player[1]);
				}
			});
		});
	}, [socket]);
	return (
		<div className='battle-container'>
			<div className='players-name'>
				<p>{userData.userName}</p>
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
