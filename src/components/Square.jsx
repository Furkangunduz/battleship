import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import ShipContext from '../ShipContext';
import Ship from './Ship';

function Square({ x, y, classname, shiptype, isShipHere }) {
	const { shipType, shipsInfo, updateShipsInfo } = useContext(ShipContext);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'ship',
			drop: () => updateShipsInfo(shiptype, x, y),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[shipsInfo[shipType][0], shipsInfo[shipType][1]]
	);

	const renderShip = () => {
		if (shiptype == 1) return <Ship1 />;
		if (shiptype == 2) return <Ship2 />;
		if (shiptype == 3) return <Ship3 />;
		if (shiptype == 4) return <Ship4 />;
		if (shiptype == 5) return <Ship5 />;
		if (shiptype == 0) return <></>;
	};

	return (
		<div ref={drop} className={classname}>
			{isShipHere && <Ship shiptype={shiptype}>{renderShip()}</Ship>}
		</div>
	);
}

export default Square;
