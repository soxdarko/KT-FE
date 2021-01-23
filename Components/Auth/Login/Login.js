import { useState, useRef, useEffect } from 'react';
/* import axios from '../../../utils/Axios/axios-appointments'; */
import useDeviceDetect from '../../../utils/UseDeviceDetect';
import { inputChangedHandler } from '../../shared/utility';
import initState from './initState';

import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const Login = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [loginUser, setLoginUser] = useState([]);
	const [formInput, setFormInput] = useState({
		userName: {
			value: '',
			touched: false,
			valid: true,
		},
		password: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	/* const loginHandler = () => {
		const api = axios
			.post('/', loginUser)
			.then(response => {
				console.log(response), alert('Uspešno ste se prijavili');
			})
			.catch(error => console.log(error));
		api;
		setFormInput(initState);
	}; */

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		/* loginHandler(); */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loginUser]);

	const buttonClassName = (mob, pc) => {
		return isMobile ? mob : [pc, classes.Block].join(' ');
	};
	const buttonGroup = (
		<>
			<Input
				type="submit"
				name="submit"
				value="PRIJAVI SE"
				placeholder="Uneti lozinku"
				margin={isMobile ? '30px auto 5px auto' : null}
				className={buttonClassName(classes.SubmitButtonMob, classes.SubmitButton)}
			/>
			<Input
				type="button"
				name="register"
				value="REGISTRUJ SE"
				placeholder="Uneti lozinku"
				className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
				onClick={() => {
					props.setDisplayLogin('none'),
						props.setDisplayRegServProv('block'),
						setFormInput(initState);
				}}
			/>
			<Input
				type="button"
				name="passRecovery"
				value="ZABORAVLJENA LOZINKA"
				placeholder="Uneti lozinku"
				className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
				onClick={() => {
					props.setDisplayLogin('none'),
						props.setDisplayPassRecovery('block'),
						setFormInput(initState);
				}}
			/>
			<Input
				type="button"
				name="formClose"
				value="ODUSTANI"
				placeholder="Uneti lozinku"
				className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
				color="orangered"
				onClick={() => {
					props.setDisplayLogin('none'), setFormInput(initState);
				}}
			/>
		</>
	);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			userName: formInput.userName.value.trim(),
			password: formInput.password.value.trim(),
		};
		if (!formInput.userName.value.trim()) {
			setFormInput({
				...formInput,
				userName: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti korisničko ime');
		} else if (!formInput.password.value.trim()) {
			setFormInput({
				...formInput,
				password: {
					value: '',
					valid: false,
				},
			});
			alert('Morate uneti lozinku');
		} else {
			setLoginUser([...loginUser, formData]);
			props.setDisplayLogin('none');
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<form style={{ display: props.displayLogin }} className={classes.Form} onSubmit={onSubmit}>
			<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>PRIJAVA KORISNIKA</h2>
			<Input
				type="text"
				name="username"
				value={formInput.userName.value}
				placeholder="UNESITE EMAIL ili TELEFON"
				className={inputClassName}
				onChange={e => inputChangedHandler(e, 'userName', formInput, setFormInput)}
				invalid={!formInput.userName.valid}
			/>
			<Input
				type="password"
				name="password"
				value={formInput.password.value}
				placeholder="UNESITE LOZINKU"
				className={inputClassName}
				onChange={e => inputChangedHandler(e, 'password', formInput, setFormInput)}
				invalid={!formInput.password.valid}
			/>
			{buttonGroup}
		</form>
	);
};

export default Login;
