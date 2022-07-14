import { useDrag } from 'react-dnd';
import { useContext } from 'react';
import ShipContext from '../ShipContext';

function Ship({ children, shiptype }) {
	const { changeShipType, shipsInfo } = useContext(ShipContext);
	const direction = shipsInfo[shiptype][2];

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
			ref={drag}>
			{children}
		</div>
	);
}

export default Ship;
