import { createContext, useState } from 'react';

const ShipContext = createContext();

export const ShipProvider = ({ children }) => {
	const [shipsInfo, setShipsInfo] = useState({
		'0': [-10, -10],
		'1': [-1, -1],
		'2': [-1, -1],
		'3': [-1, -1],
		'4': [-1, -1],
		'5': [-1, -1],
	});

	const [shipType, setShipType] = useState('0');

	const updateShipsInfo = (type, toX, toY) => {
		setShipsInfo((prev) => ({ ...prev, [`${type}`]: [toX, toY] }));
	};

	const changeShipType = (type) => {
		setShipType(type);
		console.log('type changed : ' + type);
	};
	// const moveShip = (x, y) => {
	// 	setShipPosition([x, y]);
	// 	console.log(shipPosition, 'type: ' + shipType);
	// };

	return (
		<ShipContext.Provider
			value={{
				shipType,
				changeShipType,
				shipsInfo,
				updateShipsInfo,
			}}>
			{children}
		</ShipContext.Provider>
	);
};

export default ShipContext;
