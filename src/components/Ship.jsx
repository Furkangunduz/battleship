import { useDrag } from 'react-dnd';
import { useContext, useRef } from 'react';
import ShipContext from '../ShipContext';

function Ship({ children, shiptype }) {
	const { changeShipType, shipsInfo, isBattleStart } = useContext(ShipContext);
	const direction = shipsInfo[shiptype][2];

	const emptyRef = useRef(null);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ship',
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			onMouseDown={() => changeShipType(shiptype)}
			className={`${direction != 'vertical' ? 'ship' : ''} ${isDragging ? 'hidden' : ''} `}
			ref={isBattleStart ? emptyRef : drag}>
			{children}
		</div>
	);
}

export default Ship;
