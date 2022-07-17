import ship from '../assets/HomepageShip.png';
import { useState } from 'react';
import navigate
import { Button, TextField } from '@mui/material';

function Home() {
	const [Join, setJoin] = useState(true); // 0 create ,1 join

	return (
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
				<Button variant='contained' color='secondary' onClick={navigae}>
					Create Room
				</Button>
				<Button variant='contained' onClick={() => setJoin((prev) => !prev)}>
					Join Room
				</Button>
			</div>
			<div className='room-input'>
				{Join && (
					<>
						<TextField
							id='standard-basic'
							label='Room Code'
							variant='filled'
							color='info'
						/>
						<Button variant='contained' color='warning'>
							Fight !
						</Button>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
