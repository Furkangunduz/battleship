import { useDrag } from 'react-dnd';
<<<<<<< HEAD

function Ship({ children }) {
=======
import { useContext } from 'react';
import ShipContext from '../ShipContext';

function Ship({ children, shiptype }) {
	const { changeShipType } = useContext(ShipContext);

>>>>>>> dev
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ship',
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
<<<<<<< HEAD
	return (
		<div className='ship' ref={drag}>
=======

	return (
		<div
			onMouseDown={() => changeShipType(shiptype)}
			className={`ship ${isDragging && 'hidden'}`}
			ref={drag}>
>>>>>>> dev
			{children}
		</div>
	);
}

export default Ship;
