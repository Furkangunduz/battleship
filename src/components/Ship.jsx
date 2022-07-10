import { useDrag } from 'react-dnd';

function Ship({ children }) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ship',
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	return (
		<div className='ship' ref={drag}>
			{children}
		</div>
	);
}

export default Ship;
