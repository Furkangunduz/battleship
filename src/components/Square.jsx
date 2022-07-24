import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';
import { ReactComponent as Fire } from '../assets/hit.svg';
import { ReactComponent as Miss } from '../assets/miss.svg';

import { useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';

import ShipContext from '../ShipContext';
import SocketContext from '../SocketContext';
import Ship from './Ship';
import UserContext from '../UserContext';
function Square({ x, y, classname, shiptype, isShipHere, isEnemySquare, hitOrMiss }) {
	const { shipType, shipsInfo, updateShipsInfo, isBattleStart } = useContext(ShipContext);
	const { socket } = useContext(SocketContext);
	const { userData } = useContext(UserContext);

	const emptyRef = useRef(null);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'ship',
			drop: () => updateShipsInfo(shiptype, x, y),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[shipsInfo[shipType][0], shipsInfo[shipType][1], shipsInfo[shipType][2]]
	);

	const renderShip = () => {
		let isShipVertical = '';
		if (shipsInfo[shiptype][2] == 'vertical') {
			isShipVertical = true;
		}

		if (shiptype == 1) return <Ship1 className={isShipVertical && 'ship1_vertical'} />;
		if (shiptype == 2) return <Ship2 className={isShipVertical && 'ship2_vertical'} />;
		if (shiptype == 3) return <Ship3 className={isShipVertical && 'ship3_vertical'} />;
		if (shiptype == 4) return <Ship4 className={isShipVertical && 'ship4_vertical'} />;
		if (shiptype == 5) return <Ship5 className={isShipVertical && 'ship5_vertical'} />;
		if (shiptype == 0) return <></>;
	};

	const fire = (x, y) => {
		socket.emit('fire', { 'player': userData, 'pos': { x, y } });
		console.log('fire');
	};

	return !isEnemySquare ? (
		<div ref={isBattleStart ? emptyRef : drop} className={classname}>
			{isShipHere && (
				<>
					<Ship shiptype={shiptype}>{renderShip()}</Ship>
				</>
			)}
			{hitOrMiss && (
				<div
					style={{
						zIndex: '2',
						position: 'absolute',
						background: "url('../assets/hit.svg') no-repeat",
					}}>
					{hitOrMiss === 'hit' ? <Fire /> : hitOrMiss == 'miss' ? <Miss /> : <></>}
				</div>
			)}
		</div>
	) : (
		<div
			onClick={() => !hitOrMiss && fire(x, y)}
			className={`enemy-square ${hitOrMiss ? 'disable' : 'enable'}`}>
			{hitOrMiss === 'hit' ? <Fire /> : hitOrMiss == 'miss' ? <Miss /> : <></>}
		</div>
	);
}

export default Square;
