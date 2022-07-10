import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';
import { useContext } from 'react';
import ShipContext from '../ShipContext';

import Ship from './Ship';

function Items() {
	const { changeShipType } = useContext(ShipContext);
	return (
		<div className='shiplist'>
			<Ship>
				<div onMouseDown={() => changeShipType('1')}>
					<Ship1 />
				</div>
			</Ship>
			<Ship>
				<div onMouseDown={() => changeShipType('2')}>
					<Ship2 />
				</div>
			</Ship>
			<Ship>
				<div onMouseDown={() => changeShipType('3')}>
					<Ship3 />
				</div>
			</Ship>
			<Ship>
				<div onMouseDown={() => changeShipType('4')}>
					<Ship4 />
				</div>
			</Ship>
			<Ship>
				<div onMouseDown={() => changeShipType('5')}>
					<Ship5 />
				</div>
			</Ship>
		</div>
	);
}

export default Items;
