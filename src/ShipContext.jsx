import { createContext, useState } from 'react';

const ShipContext = createContext();

export const ShipProvider = ({ children }) => {
	const [shipPosition, setShipPosition] = useState([-1, -1]);
	const [shipType, setShipType] = useState('0');

	const [shipsInfo, setShipsInfo] = useState([]);

	const updateShipsInfo = (type, toX, toY) => {
		setShipsInfo((prev) => ({ ...prev, [type]: [toX, toY] }));
	};

	const moveShip = (x, y) => {
		setShipPosition([x, y]);
		console.log(shipPosition, 'type: ' + shipType);
	};

	const changeShipType = (type) => {
		setShipType(type);
		console.log('type changed : ' + type);
	};

	return (
		<ShipContext.Provider
			value={{
				shipPosition,
				moveShip,
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
