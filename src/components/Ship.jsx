import { useDrag } from 'react-dnd';
import { useContext } from 'react';
import ShipContext from '../ShipContext';

function Ship({ children, shiptype }) {
	const { changeShipType } = useContext(ShipContext);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ship',
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			onMouseDown={() => changeShipType(shiptype)}
			className={`ship ${isDragging && 'hidden'}`}
			ref={drag}>
			{children}
		</div>
	);
}

export default Ship;
