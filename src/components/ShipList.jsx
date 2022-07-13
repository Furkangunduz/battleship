import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';

import Ship from './Ship';

function Items() {
	return (
		<div className='shiplist'>
			<Ship shiptype={'1'}>
				<Ship1 />
			</Ship>
			<Ship shiptype={'2'}>
				<Ship2 />
			</Ship>
			<Ship shiptype={'3'}>
				<Ship3 />
			</Ship>
			<Ship shiptype={'4'}>
				<Ship4 />
			</Ship>
			<Ship shiptype={'5'}>
				<Ship5 />
			</Ship>
		</div>
	);
}

export default Items;
