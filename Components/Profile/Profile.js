/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { faSave, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import useDeviceDetect from '../../utils/UseDeviceDetect';

import ListHeadButton from '../UI/List/ListHead/ListHeadButton';
import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/label';
import ListBody from '../UI/List/ListBody/ListBody';
import ListHead from '../UI/List/ListHead/ListHead';
import ChangePass from '../Auth/ChangePass';
import AddClientButton from '../UI/AddClientButton';

import classes from '../UI/UI.module.scss';

const Profile = props => {
	const { isMobile } = useDeviceDetect();
	const [autorefreshIcon, setAutorefreshIcon] = useState(true);
	const [displayChangePass, setDisplayChangePass] = useState('none');
	console.log(autorefreshIcon);
	if (isMobile) {
		return (
			<>
				<ChangePass
					displayChangePass={displayChangePass}
					setDisplayChangePass={setDisplayChangePass}
				/>
				<ListHead
					title="Podešavanje profila"
					displayCopy="none"
					displayPaste="none"
					displaySearch="none"
					displayAdd="none"
					displayLink="none"
					displaySelectWeek="none"
				/>
				<ListBody>
					<div className={classes.SettingProp}>
						<div>
							<div>Ime i prezime</div>
							<input type="text" value="Jovan Stefanovic" className={classes.InputMob} />
						</div>
						<div>
							<div>Naziv Firme</div>
							<input type="text" value="Frizerko" className={classes.InputMob} />
						</div>
						<div>
							<div>E-mail adresa</div>
							<input type="text" value="zbni.rs@gmail.com" className={classes.InputMob} />
						</div>
						<div>
							<div>Broj telefona</div>
							<input type="number" value="0691120296" className={classes.InputMob} />
						</div>
						<div>
							<div>Mesto</div>
							<input type="text" value="Subotica" className={classes.InputMob} />
						</div>
						<div>
							<div>Adresa</div>
							<input type="text" value="Kozaracka 31" className={classes.InputMob} />
						</div>
						<div>
							<div>Delatnost</div>
							<input type="text" value="Frizer" className={classes.InputMob} />
						</div>
						<div>
							<div>Dužina polja u kalendaru</div>
							<input type="number" value="15" className={classes.InputMob} />
						</div>
						<div>
							<div>Mesečni limit rezervacija po klijentu</div>
							<input type="number" value="3" className={classes.InputMob} />
						</div>
						<div className={classes.NoBorder}>
							<ListHeadButton
								type="button"
								value="Autoosvežavanje termina"
								className={[classes.ListButtonMob, classes.AutorefreshMob].join(' ')}
								faIcon={autorefreshIcon ? faCheckCircle : faTimesCircle}
								IconClassName={autorefreshIcon ? classes.Active : classes.Passive}
								onClick={() => setAutorefreshIcon(!autorefreshIcon)}
							/>
						</div>
						<div className={classes.NoBorder}>
							<input
								type="button"
								value="Promeni lozinku"
								onClick={() => setDisplayChangePass('block')}
								className={[classes.FormButtonMob, classes.ListButtonMob].join(' ')}
							/>
						</div>
						<div className={classes.NoBorder}>
							<input
								type="button"
								value="Deaktiviraj nalog"
								className={[classes.ButtonMob, classes.Danger, classes.Deactivate].join(' ')}
							/>
						</div>
					</div>
				</ListBody>
				<ListHeadButton
					className={classes.SaveMob}
					value="Sačuvaj izmene"
					faIcon={faSave}
					display={props.displaySave}
				/>
				<AddClientButton />
			</>
		);
	}
	return (
		<>
			<ChangePass
				displayChangePass={displayChangePass}
				setDisplayChangePass={setDisplayChangePass}
			/>
			<ListHead
				title="Podešavanje profila"
				displayCopy="none"
				displayPaste="none"
				displaySearch="none"
				displayAdd="none"
				displayLink="none"
				displaySelectWeek="none"
			/>
			<ListBody>
				<div className={classes.SettingName}>
					<div>Ime i Prezime</div>
					<div>Naziv firme</div>
					<div>E-mail</div>
					<div>Telefon</div>
					<div>Mesto</div>
					<div>Adresa</div>
					<div>Delatnost</div>
					<div>Lozinka</div>
					<div>Broj dana do koliko je moguće rezervisati</div>
					<div>Dužina trajanja jednog polja u kalendaru</div>
					<div>Broj dozvoljenih rezervacija za period od 30 dana</div>
					<div>Automatsko osvežavanje novih zakazanih termina?</div>
					<div>Link za kalendar i registraciju novih</div>
					<div>Deaktivacija naloga</div>
				</div>
				<div className={classes.SettingProp}>
					<div>
						<input type="text" value="Jovan Stefanovic" />
					</div>
					<div>
						<input type="text" value="Frizerko" />
					</div>
					<div>
						<input type="text" value="zbni.rs@gmail.com" />
					</div>
					<div>
						<input type="number" value="0691120296" />
					</div>
					<div>
						<input type="text" value="Subotica" />
					</div>
					<div>
						<input type="text" value="Kozaracka 31" />
					</div>
					<div>
						<input type="text" value="Frizer" />
					</div>
					<div>
						<input
							type="button"
							value="Promeni lozinku"
							onClick={() => setDisplayChangePass('block')}
						/>
					</div>
					<div>
						<input type="number" value="14" />
					</div>
					<div>
						<input type="number" value="15" />
					</div>
					<div>
						<input type="number" value="3" />
					</div>
					<div>
						<Input type="checkbox" id="autorefresh" />
						<Label htmlFor="autorefresh" />
					</div>
					<div>
						<input type="button" value="Kopiraj link" />
					</div>
					<div>
						<input type="button" value="Deaktiviraj" />
					</div>
				</div>
			</ListBody>
		</>
	);
};

export default Profile;
