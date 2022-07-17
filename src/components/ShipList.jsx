import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { ReactComponent as Ship2 } from '../assets/ship-2.svg';
import { ReactComponent as Ship3 } from '../assets/ship-3.svg';
import { ReactComponent as Ship4 } from '../assets/ship-4.svg';
import { ReactComponent as Ship5 } from '../assets/ship-5.svg';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Ship from './Ship';

function Items() {
	return (
		<Dropdown style={{ marginLeft: '30px' }}>
			<DropdownButton
				id={`dropdown-button-drop-end`}
				drop={'end'}
				variant='success'
				title={` Ships `}>
				<Dropdown.Item>
					<Ship shiptype={'1'}>
						<Ship1 />
					</Ship>
				</Dropdown.Item>
				<Dropdown.Item>
					<Ship shiptype={'2'}>
						<Ship2 />
					</Ship>
				</Dropdown.Item>
				<Dropdown.Item>
					<Ship shiptype={'3'}>
						<Ship3 />
					</Ship>
				</Dropdown.Item>
				<Dropdown.Item>
					<Ship shiptype={'4'}>
						<Ship4 />
					</Ship>
				</Dropdown.Item>
				<Dropdown.Item>
					<Ship shiptype={'5'}>
						<Ship5 />
					</Ship>
				</Dropdown.Item>
			</DropdownButton>
		</Dropdown>
	);
}

export default Items;
