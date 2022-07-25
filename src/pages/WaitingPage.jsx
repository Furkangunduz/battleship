//Thx to https://codepen.io/sfrisk/pen/pwWwYZ

import style from '../style/waiting_Page.module.css';
import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import BattleContext from '../BattleContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function WaitingPage({ navigate }) {
	const { socket } = useContext(SocketContext);
	const { userData, setEnemyName } = useContext(UserContext);
	const { setIsMyTurn } = useContext(BattleContext);

	const params = useParams();

	useEffect(() => {
		socket.on('start_battle', () => {
			console.log('Battle starting');
			navigate('/battle');
		});
		socket.on('players', ([player1, player2]) => {
			console.log(player1, player2);
			if (userData.userName == player1[0]) {
				setIsMyTurn(player1[1]);
				setEnemyName(player2[0]);
			} else {
				setIsMyTurn(player2[1]);
				setEnemyName(player1[0]);
			}
		});
		socket.on('opponent-left', () => {
			console.log('left');
			toast('Opponent is left...');
			setTimeout(() => {
				navigate(`/`);
			}, 5000);
		});
	}, [socket]);

	socket.emit('waiting_for_opponent', {
		'userName': params.userName,
		'roomName': params.roomName,
	});

	return (
		<>
			<div className={style.waiting_contianer}>
				<div className={style.animatedH1}>
					<h1>Waiting for your opponent.</h1>
				</div>
				<div className={style.waves_back}>
					<div className={style.wave_back}></div>
					<div className={style.wave_back}></div>
					<div className={style.wave_back}></div>
					<div className={style.wave_back}></div>
					<div className={style.wave_back}></div>
				</div>
				<div className={style.boat}>
					<div className={style.mast}>
						<div className={style.sail}></div>
						<div className={style.flag}>
							<div className={style.skull}>
								<div className={style.eyes}>
									<div className={style.eye}></div>
									<div className={style.eye}></div>
								</div>
								<div className={style.teeth}>
									<div className={style.tooth}></div>
									<div className={style.tooth}></div>
									<div className={style.tooth}></div>
								</div>
							</div>
						</div>
					</div>
					<div className={style.hull}></div>
				</div>
				<div className={style.waves}>
					<div className={style.wave}></div>
					<div className={style.wave}></div>
					<div className={style.wave}></div>
					<div className={style.wave}></div>
					<div className={style.wave}></div>
				</div>
			</div>
		</>
	);
}

export default WaitingPage;
