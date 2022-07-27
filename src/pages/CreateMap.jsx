import Board from '../components/Board';
import ShipList from '../components/ShipList';
import History from '../components/History';
import { toast } from 'react-toastify';

import { useContext, useState, useEffect } from 'react';
import ShipContext from '../ShipContext';
import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import Rules from '../components/Rules';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

const ShipNameList = ['', 'Patrol Boat', 'Submarine', 'Destroyer', 'Battleship', 'Carrier'];

function CreateMap({ navigate }) {
	const { rotateShip, shipType, shipsInfo } = useContext(ShipContext);
	const { socket } = useContext(SocketContext);

	const [gameBoard, setGameBoard] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [closeInfo, setCloseInfo] = useState(false);
	const [isMyBoardValid, setIsMyBoardValid] = useState(false);
	const params = useParams();

	const popup = (message) => {
		if (!showPopup) {
			setShowPopup(true);
			setPopupMessage(message);
			setTimeout(() => {
				setShowPopup(false);
				setPopupMessage('');
			}, 100);
		}
	};

	useEffect(() => {
		socket.on('board_validation', ({ result }) => {
			console.log('Boar is valid ? : ', result);
			if (result) {
				popup('Great! Waiting for your opponent.');
				socket.emit('save_map', {
					'gameBoard': gameBoard,
					'roomName': params.roomName,
				});

				setTimeout(() => {
					sessionStorage.setItem('shipsInfo', JSON.stringify(shipsInfo));
					navigate(`/waiting/${params.userName}/${params.roomName}`);
				}, 6000);
			} else {
				popup(
					'The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.'
				);
			}

			setIsMyBoardValid(result);
		});
		socket.on('opponent-left', () => {
			console.log('left');
			toast('Opponent is left...');
			setTimeout(() => {
				navigate(`/`);
			}, 5000);
		});
		socket.on('user_joined', ({ roomName, userName }) => {
			popup(`${userName} joined to ${roomName}`);
			console.log(`${userName} joined to ${roomName}`);
		});
	}, [socket, gameBoard]);

	const checkAllShipsPlacedToScreen = (shipsInfo) => {
		for (let key in shipsInfo) {
			if (key != '0') {
				if (shipsInfo[key][0] == -1 && shipsInfo[key][1] == -1) {
					return false;
				}
			}
		}
		return true;
	};

	const createGameBoard = (shipsInfo) => {
		var gameBoard = [...Array(10)].map((e) => Array(10).fill('0'));
		for (let key in shipsInfo) {
			let x = shipsInfo[key][0] - 1;
			let y = shipsInfo[key][1] - 1;
			let direction = shipsInfo[key][2];
			let shipLen = shipsInfo[key][3];

			if (!direction || !shipLen) continue;
			if (x < 0 || x > 9) continue;
			if (y < 0 || y > 9) continue;

			if (direction == 'horizontal') {
				for (let i = 0; i < shipLen; i++) {
					gameBoard[y][x++] = '1';
				}
			} else if (direction == 'vertical') {
				for (let i = 0; i < shipLen; i++) {
					gameBoard[y++][x] = '1';
				}
			}
		}
		console.log('GameBoard is ready.');
		return gameBoard;
	};

	const onReady = () => {
		console.log('Preaparing for the battle');

		if (!checkAllShipsPlacedToScreen(shipsInfo)) {
			toast.error('You should place all ships.');
			return;
		}
		let board = createGameBoard(shipsInfo);
		setGameBoard(board);
		setTimeout(() => {
			socket.emit('board_validation', board);
		}, 1000);
	};

	if (showPopup) {
		toast(popupMessage);
	}

	return (
		<>
			<div className='game-container'>
				<h1 style={{ textAlign: 'center', marginBottom: '10px' }}>PLACE YOUR SHIPS</h1>
				<div className='board-container'>
					<div className='board-and-ships'>
						<Board />
						<div className='dropdown-and-action-buttons'>
							<ShipList />
							<div className='actions'>
								<p>Current placed Ship was :</p>
								<p style={{ color: 'red' }}>{ShipNameList[shipType]}</p>
								<Button
									onClick={() => {
										rotateShip(shipType);
									}}
									disabled={isMyBoardValid}>
									Rotate the {ShipNameList[shipType]}
								</Button>
								<Button
									variant='warning'
									onClick={onReady}
									disabled={isMyBoardValid}>
									Ready
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{!closeInfo && <Rules setCloseInfo={setCloseInfo} />}
		</>
	);
}

export default CreateMap;
