/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import axios from '../../utils/Axios/axios-appointments';
import { faSave, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import useDeviceDetect from '../../utils/UseDeviceDetect';
import { inputChangedHandler } from '../shared/utility';

import ListHeadButton from '../UI/List/ListHead/ListHeadButton';
import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';
import ListBody from '../UI/List/ListBody/ListBody';
import ListHead from '../UI/List/ListHead/ListHead';
import ChangePass from '../Auth/ChangePass';
import AddClientButton from '../UI/AddClientButton';
import Confirmation from '../UI/Forms/Confirmation';
import Backdrop from '../UI/Backdrop';
import InviteClient from '../AddToList/InviteClient';
import classes from '../UI/UI.module.scss';

const Profile = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [autorefreshIcon, setAutorefreshIcon] = useState(true);
	const [displayConfirmation, setDisplayConfirmation] = useState('none');
	const [displayChangePass, setDisplayChangePass] = useState('none');
	const [displayInviteClient, setDisplayInviteClient] = useState('none');
	const [backdrop, setBackdrop] = useState('none');
	const [userData, setUserData] = useState([]);
	const [formInput, setFormInput] = useState({
		name: {
			value: 'Jovan Stefanovic',
			touched: false,
			valid: true,
		},
		userName: {
			value: 'JovanS',
			touched: false,
			valid: true,
		},
		company: {
			value: 'JovanFrizeraj',
			touched: false,
			valid: true,
		},
		email: {
			value: 'zbni.rs@gmail.com',
			touched: false,
			valid: true,
		},
		phone: {
			value: '0691120296',
			touched: false,
			valid: true,
		},
		city: {
			value: 'Subotica',
			touched: false,
			valid: true,
		},
		address: {
			value: 'Kozaracka 31',
			touched: false,
			valid: true,
		},
		city: {
			value: 'Subotica',
			touched: false,
			valid: true,
		},
		activity: {
			value: 'Frizer',
			touched: false,
			valid: true,
		},
		timePerField: {
			value: '15',
			touched: false,
			valid: true,
		},
		resLimit: {
			value: '3',
			touched: false,
			valid: true,
		},
		password: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	const pushHandler = () => {
		const api = axios
			.post('/', userData)
			.then(response => {
				console.log(response), alert('Uspešno ste se prijavili');
			})
			.catch(error => console.log(error));
		api;
		/* setFormInput(initState); */
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		pushHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			userName: formInput.name.value.trim(),
			password: formInput.userName.value.trim(),
			password: formInput.company.value.trim(),
			password: formInput.email.value.trim(),
			password: formInput.phone.value.trim(),
			password: formInput.city.value.trim(),
			password: formInput.address.value.trim(),
			password: formInput.activity.value.trim(),
			password: formInput.timePerField.value.trim(),
			password: formInput.resLimit.value.trim(),
		};
		if (!formInput.name.value.trim()) {
			setFormInput({
				...formInput,
				name: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti ime i prezime');
		} else if (!formInput.userName.value.trim()) {
			setFormInput({
				...formInput,
				userName: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti korisničko ime');
		} else if (!formInput.company.value.trim()) {
			setFormInput({
				...formInput,
				company: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti naziv firme');
		} else if (!formInput.email.value.trim()) {
			setFormInput({
				...formInput,
				email: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti E-mail asresu');
		} else if (!formInput.phone.value.trim()) {
			setFormInput({
				...formInput,
				phone: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti broj telefona');
		} else if (!formInput.activity.value.trim()) {
			setFormInput({
				...formInput,
				activity: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti delatnost');
		} else if (!formInput.timePerField.value.trim()) {
			setFormInput({
				...formInput,
				timePerField: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti dužinu trajanja polja u kalendaru');
		} else if (!formInput.resLimit.value.trim()) {
			setFormInput({
				...formInput,
				resLimit: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti broj dozvoljenih rezervacija za period od 30 dana');
		} else {
			setUserData([...userData, formData]);
		}
	};

	if (isMobile) {
		return (
			<>
				<Backdrop display={backdrop} onClick={() => {setDisplayConfirmation('none'), setDisplayInviteClient('none') , setBackdrop('none')}} />
				<InviteClient display={displayInviteClient} />
				<Confirmation
					display={displayConfirmation}
					info="Da li sigurno želite deaktivirati profil? Deaktivacija profila onemogućuje Vas i klijente da Vam rezervišu termine !!!"
					submitValue="DEAKTIVIRAJ"
					onDecline={() => {setDisplayConfirmation('none'), setBackdrop('none')}}
					onSubmit={() => {setDisplayConfirmation('none'), setBackdrop('none')}}
				/>
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
							<input
								type="text"
								value={formInput.name.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Korisničko ime</div>
							<input
								type="text"
								value={formInput.userName.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'userName', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Naziv Firme</div>
							<input
								type="text"
								value={formInput.company.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'company', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>E-mail adresa</div>
							<input
								type="text"
								value={formInput.email.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Broj telefona</div>
							<input
								type="number"
								value={formInput.phone.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Mesto</div>
							<input
								type="text"
								value={formInput.city.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'city', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Adresa</div>
							<input
								type="text"
								value={formInput.address.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'address', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Delatnost</div>
							<input
								type="text"
								value={formInput.activity.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'activity', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Dužina polja u kalendaru</div>
							<input
								type="number"
								value={formInput.timePerField.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'timePerField', formInput, setFormInput)}
							/>
						</div>
						<div>
							<div>Mesečni limit rezervacija po klijentu</div>
							<input
								type="number"
								value={formInput.resLimit.value}
								className={classes.InputMob}
								onChange={e => inputChangedHandler(e, 'resLimit', formInput, setFormInput)}
							/>
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
								onClick={() => {setDisplayConfirmation('block'), setBackdrop('block')}}
							/>
						</div>
					</div>
				</ListBody>
				<ListHeadButton
					value="Sačuvaj izmene"
					display={props.displaySave}
					faIcon={faSave}
					className={classes.SaveMob}
					onClick={onSubmit}
				/>
				<AddClientButton onClick={() => {setDisplayInviteClient('block'), setBackdrop('block')}} />
			</>
		);
	}
	return (
		<>
			<Backdrop display={displayConfirmation} onClick={() => setDisplayConfirmation('none')} />
			<Confirmation
				display={displayConfirmation}
				bottom="0"
				info="Da li sigurno želite deaktivirati profil? Deaktivacija profila onemogućuje Vas i klijente da Vam rezervišu termine !!!"
				submitValue="DEAKTIVIRAJ"
				onDecline={() => setDisplayConfirmation('none')}
				onSubmit={() => setDisplayConfirmation('none')}
			/>
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
				onSave={onSubmit}
			/>
			<ListBody>
				<div className={classes.SettingName}>
					<div>Ime i Prezime</div>
					<div>Korisničko ime</div>
					<div>Naziv firme</div>
					<div>E-mail</div>
					<div>Telefon</div>
					<div>Mesto</div>
					<div>Adresa</div>
					<div>Delatnost</div>
					<div>Lozinka</div>
					<div>Dužina trajanja jednog polja u kalendaru</div>
					<div>Broj dozvoljenih rezervacija za period od 30 dana</div>
					<div>Automatsko osvežavanje novih zakazanih termina?</div>
					<div>Link za kalendar i registraciju novih</div>
					<div>Deaktivacija naloga</div>
				</div>
				<div className={classes.SettingProp}>
					<div>
						<input
							type="text"
							value={formInput.name.value}
							onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.userName.value}
							onChange={e => inputChangedHandler(e, 'userName', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.company.value}
							onChange={e => inputChangedHandler(e, 'company', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.email.value}
							onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="number"
							value={formInput.phone.value}
							onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.city.value}
							onChange={e => inputChangedHandler(e, 'city', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.address.value}
							onChange={e => inputChangedHandler(e, 'address', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="text"
							value={formInput.activity.value}
							onChange={e => inputChangedHandler(e, 'activity', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="button"
							value="Promeni lozinku"
							onClick={() => setDisplayChangePass('block')}
						/>
					</div>
					<div>
						<input
							type="number"
							value={formInput.timePerField.value}
							onChange={e => inputChangedHandler(e, 'timePerField', formInput, setFormInput)}
						/>
					</div>
					<div>
						<input
							type="number"
							value={formInput.resLimit.value}
							onChange={e => inputChangedHandler(e, 'resLimit', formInput, setFormInput)}
						/>
					</div>
					<div>
						<Input type="checkbox" id="autorefresh" />
						<Label htmlFor="autorefresh" />
					</div>
					<div>
						<input type="button" value="Kopiraj link" />
					</div>
					<div>
						<input
							type="button"
							value="Deaktiviraj"
							onClick={() => setDisplayConfirmation('block')}
						/>
					</div>
				</div>
			</ListBody>
		</>
	);
};

export default Profile;
