import { createContext, useState, useEffect } from 'react';

const ShipContext = createContext();

export const ShipProvider = ({ children }) => {
	const [shipsInfo, setShipsInfo] = useState({
		'0': [-1, -1],
		'1': [-1, -1, 'horizontal', 2], //[x , y , direction , lengthofShip ]
		'2': [-1, -1, 'horizontal', 3],
		'3': [-1, -1, 'horizontal', 3],
		'4': [-1, -1, 'horizontal', 4],
		'5': [-1, -1, 'horizontal', 5],
	});
	useEffect(() => {
		if (sessionStorage.getItem('shipsInfo')) {
			console.log('session');
			setTimeout(() => {
				setShipsInfo(JSON.parse(sessionStorage.getItem('shipsInfo')));
			}, 100);
		}
	}, []);

	const [shipType, setShipType] = useState('0');
	const [isBattleStart, setIsBattleStart] = useState(false);

	const updateShipsInfo = (type, toX, toY) => {
		let direction = shipsInfo[`${type}`][2];
		let shipLength = shipsInfo[`${type}`][3];

		if (direction == 'horizontal') {
			if (toX - 1 + shipLength > 10) {
				toX = 10 - shipLength + 1;
			}
		}
		if (direction == 'vertical') {
			if (toY - 1 + shipLength > 10) {
				console.log('cannot go', toY);
				toY = 10 - shipLength + 1;
			}
		}

		setShipsInfo((prev) => ({ ...prev, [`${type}`]: [toX, toY, direction, shipLength] }));
	};

	const changeShipType = (type) => {
		setShipType(type);
	};

	const rotateShip = (type) => {
		let direction = shipsInfo[type][2];
		if (direction == 'vertical')
			setShipsInfo((prev) => ({
				...prev,
				[`${type}`]: [
					shipsInfo[type][0],
					shipsInfo[type][1],
					'horizontal',
					shipsInfo[type][3],
				],
			}));
		if (direction == 'horizontal')
			setShipsInfo((prev) => ({
				...prev,
				[`${type}`]: [
					shipsInfo[type][0],
					shipsInfo[type][1],
					'vertical',
					shipsInfo[type][3],
				],
			}));
	};

	return (
		<ShipContext.Provider
			value={{
				shipType,
				changeShipType,
				shipsInfo,
				updateShipsInfo,
				rotateShip,
				isBattleStart,
				setIsBattleStart,
			}}>
			{children}
		</ShipContext.Provider>
	);
};

export default ShipContext;
