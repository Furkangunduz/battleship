import { ReactComponent as Ship1 } from '../assets/ship-1.svg';
import { useContext } from 'react';
import ShipContext from '../ShipContext';

import Square from './Square';
import Ship from './Ship';
import Guide from './Guide';

const BOARDSIZE = 11 * 11;
const TopGuide = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SideGuide = [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function Board({ enemyBoard }) {
	const { shipPosition, shipsInfo, shipType } = useContext(ShipContext);

	const renderSquare = (i) => {
		const x = i % 11;
		const y = Math.floor(i / 11);
		const key = enemyBoard ? `e-${i}` : i;

		let isThereShip = false;
		let shiptype = shipType;
		for (let key in shipsInfo) {
			if (shipsInfo[key][0] == x && shipsInfo[key][1] == y) {
				isThereShip = true;
				shiptype = key;
			}
		}

		if (x === 0 && y === 0) return <div key={key}></div>;
		if (y === 0)
			return (
				<Guide key={key} classname='guide'>
					<div>{TopGuide[x]}</div>
				</Guide>
			);
		if (x === 0)
			return (
				<Guide key={key} classname='guide'>
					<div>{SideGuide[y]}</div>
				</Guide>
			);
		return (
			<Square
				x={x}
				y={y}
				key={key}
				isShipHere={isThereShip}
				shiptype={shiptype}
				classname={'square'}></Square>
		);
	};

	const squares = [];
	for (let i = 0; i < BOARDSIZE; i++) {
		squares.push(renderSquare(i, shipPosition));
	}

	return <div className='board'>{squares}</div>;
}

export default Board;
