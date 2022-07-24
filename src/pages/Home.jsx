import ship from '../assets/HomepageShip.png';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import SocketContext from '../SocketContext';
import UserContext from '../UserContext';
import { useState, useContext, useEffect } from 'react';

function Home({ navigate }) {
	const [state, setState] = useState({ roomName: '', userName: '' });
	const [roomExist, setRoomExist] = useState(true);
	const [roomfull, setRoomfull] = useState(true);

	const { socket } = useContext(SocketContext);
	const { userData, setUserData } = useContext(UserContext);

	useEffect(() => {
		socket.on('room_already_exist', () => {
			setRoomExist(true);
			toast.error('Room already exist. Change your room name.');
		});
		socket.on('room_successfuly_created', () => {
			setRoomExist(false);
		});
		socket.on('room_is_full', () => {
			toast.error(`Room is full`);
			setRoomfull(true);
		});
		socket.on('succesfully_joined', () => {
			setRoomfull(false);
		});
		socket.on('room_not_exist', () => {
			toast.error(`Room is not exist`);
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
				<div className='room-input'>
					<Form.Control
						placeholder='Username'
						value={userData.userName}
						onChange={(e) =>
							setUserData((prev) => ({ ...prev, userName: e.target.value }))
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
			</div>
		</>
	);
}

export default Home;
