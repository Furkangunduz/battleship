//Thx to https://codepen.io/sfrisk/pen/pwWwYZ
import style from '../style/waitingpage.module.css';

function WaitingPage() {
	return (
		<>
			<div className={style.waiting_contianer}></div>
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
		</>
	);
}

export default WaitingPage;
