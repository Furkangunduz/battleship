import Board from '../components/Board';
import ShipList from '../components/ShipList';
import History from '../components/History';
import { toast } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Button from 'react-bootstrap/Button';

import { useContext, useState } from 'react';
import ShipContext from '../ShipContext';

import { battleShipMapValidator } from '../battleShip';
import Rules from '../components/Rules';

function CreateMap({ navigate }) {
	const ShipNameList = ['', 'Patrol Boat', 'Submarine', 'Destroyer', 'Battleship', 'Carrier'];
	const { rotateShip, shipType, shipsInfo } = useContext(ShipContext);
	const [closeInfo, setCloseInfo] = useState(false);
	var gameBoard;

	const onReady = () => {
		gameBoard = [...Array(10)].map((e) => Array(10).fill('0'));
		console.log('Preaparing for the battle');
		for (let key in shipsInfo) {
			if (key != '0') {
				if (shipsInfo[key][0] == -1 && shipsInfo[key][1] == -1) {
					toast.error('You should place all ships.');
					return;
				}
			}
		}
		for (let key in shipsInfo) {
			let x = shipsInfo[key][0] - 1;
			let y = shipsInfo[key][1] - 1;
			let direction = shipsInfo[key][2];
			let shipLen = shipsInfo[key][3];

			if (!direction || !shipLen) continue;
			if (x < 0 || x > 9) continue;
			if (y < 0 || y > 9) continue;

			if (direction == 'horizontal') {
				for (let i = 0; i < shipLen; i++) {
					gameBoard[y][x++] = '1';
				}
			} else if (direction == 'vertical') {
				for (let i = 0; i < shipLen; i++) {
					gameBoard[y++][x] = '1';
				}
			}
		}
		console.log('ship placement is okey');
		if (!battleShipMapValidator(gameBoard)) {
			toast.error(
				'The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.'
			);
			return;
		}
		toast.success('Waiting for opponent.');
	};

	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<h1 style={{ textAlign: 'center', marginBottom: '10px' }}>PLACE YOUR SHIPS</h1>
				<div className='game-container'>
					<div className='game-history'>
						<History />
					</div>
					<div className='board-container'>
						<div className='board-and-ships'>
							<Board />
							<div className='dropdown-and-action-buttons'>
								<ShipList />
								<div className='actions'>
									<p>Current placed Ship was :</p>
									<p style={{ color: 'red' }}>
										{ShipNameList[shipType]}
									</p>
									<Button
										onClick={() => {
											rotateShip(shipType);
										}}>
										Rotate the {ShipNameList[shipType]}
									</Button>
									<Button variant='warning' onClick={onReady}>
										Ready
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DndProvider>
			{!closeInfo && <Rules setCloseInfo={setCloseInfo} />}
		</>
	);
}

export default CreateMap;
