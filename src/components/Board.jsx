import { useContext } from 'react';
import ShipContext from '../ShipContext';

import Square from './Square';
import Guide from './Guide';

const BOARDSIZE = 11 * 11;
const TopGuide = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SideGuide = [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function Board({ isEnemyBoard, board }) {
	const { shipPosition, shipsInfo, shipType } = useContext(ShipContext);

	const renderSquare = (i) => {
		const x = i % 11;
		const y = Math.floor(i / 11);
		const key = isEnemyBoard ? `enemy-${i}` : i;

		let isThereShip = false;
		let shiptype = shipType;

		let hitOrMiss = false;
		let canFire = true;

		for (let element in shipsInfo) {
			if (shipsInfo[element][0] == x && shipsInfo[element][1] == y) {
				isThereShip = true;
				shiptype = element;
			}
		}

		if (x === 0 && y === 0) return <div key={key}></div>;
		if (y === 0)
			return (
				<Guide key={key} classname='guide'>
					<div>{TopGuide[x]}</div>
				</Guide>
			);
		if (x === 0) {
			if (isEnemyBoard) return <div key={key}></div>;
			return (
				<Guide key={key} classname='guide'>
					<div>{SideGuide[y]}</div>
				</Guide>
			);
		}
		if (board) {
			let newX = x - 1;
			let newy = y - 1;
			hitOrMiss = board[newy][newX] == 3 ? 'hit' : board[newy][newX] == 4 ? 'miss' : '';
		}

		return (
			<Square
				x={x}
				y={y}
				key={key}
				isShipHere={isThereShip}
				shiptype={shiptype}
				isEnemySquare={isEnemyBoard}
				hitOrMiss={hitOrMiss}
				canFire={canFire}
				classname={'square'}></Square>
		);
	};

	const squares = [];
	for (let i = 0; i < BOARDSIZE; i++) {
		squares.push(renderSquare(i, shipPosition));
	}

	return (
		<div key={isEnemyBoard ? 'enemy' : 'my'} className='board'>
			{squares}
		</div>
	);
}

export default Board;
