import { FaRegWindowClose } from 'react-icons/fa';

function Rules({ setCloseInfo }) {
	return (
		<div className='how-to-play'>
			<div className='info'>
				<FaRegWindowClose
					className='info-close-btn'
					onClick={() => setCloseInfo(true)}
				/>
				<h2> Rules</h2>
				<ul>
					<li>
						Under Ships button you have 5 ships. You should place all of them. By
						dragging them to the gameboard.
					</li>
					<li>
						Ships can't touch each other and they cant occupy the same grid space.
					</li>
					<li>You cannot change the position of the ships after the game begins</li>
				</ul>
			</div>
		</div>
	);
}

export default Rules;
