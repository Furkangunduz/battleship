import ship from '../assets/HomepageShip.png';
import { useState } from 'react';

function Home({ navigate }) {
	const [roomCode, setroomCode] = useState(''); // 0 create ,1 join

	const navigateWaitingPage = () => {
		setTimeout(() => {
			navigate('/create-map');
		}, 500);
	};
	return (
		<>
			<div className='home-container'>
				<div className='home-header'>
					<div className='line1'></div>
					<h4>ready to fight</h4>
					<h1>B A T T L E S H I P</h1>
					<div className='line2'></div>
				</div>
				<div className='home-ship'>
					<img src={ship} width={'300px'} alt='BattleShip' />
				</div>
				<div className='buttons'>
					<button
						variant='contained'
						color='secondary'
						onClick={navigateWaitingPage}>
						Create Room
					</button>
				</div>
				<div className='room-input'>
					<input
						id='standard-basic'
						label='Room Code'
						variant='filled'
						color='info'
						value={roomCode}
						onChange={(e) => setroomCode(e.target.value)}
					/>
					<button variant='contained' disabled={!roomCode}>
						Join Room
					</button>
				</div>
			</div>
		</>
	);
}

export default Home;
