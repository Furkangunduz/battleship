import ship from '../assets/HomepageShip.png';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import { useState, useContext, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

function Home({ navigate }) {
	const [roomExist, setRoomExist] = useState(true);
	const [roomfull, setRoomfull] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const { socket } = useContext(SocketContext);
	const { userData, setUserData } = useContext(UserContext);

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
		socket.on('room_already_exist', () => {
			setRoomExist(true);
			popup('Room already exist. Change your room name.');
		});
		socket.on('room_successfuly_created', () => {
			setRoomExist(false);
		});
		socket.on('room_is_full', () => {
			setRoomfull(true);
			popup(`Room is full`);
		});
		socket.on('succesfully_joined', () => {
			setRoomfull(false);
		});
		socket.on('room_not_exist', () => {
			popup(`Room is not exist`);
		});
	}, [socket]);

	const createRoom = () => {
		socket.emit('create_room', userData);
	};
	const joinRoom = () => {
		socket.emit('join_room', userData);
	};

	if (!roomExist || !roomfull) {
		setTimeout(() => {
			navigate(`/create-map/${userData.userName}/${userData.roomName}`);
		}, 2000);
	}

	if (showPopup) {
		toast(popupMessage);
	}

	return (
		<>
			<div className='home-container'>
				<BrowserView>
					<div className='home-header'>
						<div className='line1'></div>
						<h4>ready to fight</h4>
						<h1>B A T T L E S H I P</h1>
						<div className='line2'></div>
					</div>
					<div className='home-ship'>
						<img src={ship} width={'300px'} alt='BattleShip' />
					</div>
					<div className='room-input'>
						<Form.Control
							placeholder='Username'
							value={userData.userName}
							onChange={(e) =>
								setUserData((prev) => ({
									...prev,
									userName: e.target.value,
								}))
							}
						/>
						<InputGroup>
							<Form.Control
								placeholder='Room name'
								value={userData.roomName}
								onChange={(e) =>
									setUserData((prev) => ({
										...prev,
										roomName: e.target.value,
									}))
								}
							/>
							<Button
								variant='success'
								onClick={createRoom}
								disabled={!userData.roomName || !userData.userName}>
								Create
							</Button>
							<Button
								variant='warning'
								onClick={joinRoom}
								disabled={!userData.roomName || !userData.userName}>
								Join
							</Button>
						</InputGroup>
					</div>
				</BrowserView>
				<MobileView>
					<p>This page not avaliable on mobile.</p>
				</MobileView>
			</div>
		</>
	);
}

export default Home;
