import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';
import { useContext, useState } from 'react';
import { useDrop } from 'react-dnd';

import ShipContext from '../ShipContext';
import Ship from './Ship';

function Square({ x, y, classname, children, isShipHere }) {
	const { shipPosition, moveShip, shipType } = useContext(ShipContext);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'ship',
			drop: () => moveShip(x, y, shipType),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[shipPosition[0], shipPosition[1]]
	);

	const renderShip = () => {
		if (shipType == 1) return <Ship1 />;
		if (shipType == 2) return <Ship2 />;
		if (shipType == 3) return <Ship3 />;
		if (shipType == 4) return <Ship4 />;
		if (shipType == 5) return <Ship5 />;
		if (shipType == 0) return <></>;
	};
	return (
		<div
			ref={drop}
			style={{
				position: 'relative',
			}}
			className={classname}>
			{isShipHere && <Ship>{renderShip()}</Ship>}
		</div>
	);
}

export default Square;
