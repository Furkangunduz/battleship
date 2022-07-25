import React from 'react';

function RemainingShips() {
	return (
		<div style={{ paddingRight: '20px' }}>
			<h5 style={{ borderBottom: '5px solid gray' }}>Ship Count</h5>
			<ul>
				<li>Patrol Boat</li>
				<li>Submarine</li>
				<li>Destroyer</li>
				<li>Battleship</li>
				<li>Carrier</li>
			</ul>
		</div>
	);
}

export default RemainingShips;
