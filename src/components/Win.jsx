import pirate from '../assets/chief.png';
import { useContext } from 'react';
import UserContext from '../UserContext';
import BattleContext from '../BattleContext';
function Win() {
	const { enemyName } = useContext(UserContext);
	const { winner } = useContext(BattleContext);
	return (
		<div className='win'>
			<div className='win-container'>
				<div>
					<img src={pirate} width='100%' height={'100%'} alt='asd' />
				</div>
				<div>
					<div className='win-text'>
						<p style={{ color: 'red', fontSize: '2rem' }}>
							{winner == enemyName ? 'You Lose' : 'You win'}
						</p>
						<button disabled>Rematch</button>
					</div>
					<p>You win.</p>
				</div>
			</div>
		</div>
	);
}

export default Win;
