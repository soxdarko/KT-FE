import { useState, useRef, useEffect } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../../helpers/universalFunctions';
import { newCompany } from '../../../API/userRegistration';
import initState from './initState';

import Select from '../../UI/Select';
import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const RegServProv = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [companyData, setCompanyData] = useState({});

	const [formInput, setFormInput] = useState({
		name: {
			value: '',
			touched: false,
			valid: true,
		},
		companyName: {
			value: '',
			touched: false,
			valid: true,
		},
		address: {
			value: '',
			touched: false,
			valid: true,
		},
		city: {
			value: '',
			touched: false,
			valid: true,
		},
		mobOperator: {
			value: '',
			touched: false,
			valid: true,
		},
		phone: {
			value: '',
			touched: false,
			valid: true,
		},
		email: {
			value: '',
			touched: false,
			valid: true,
		},
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
		passConfirm: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	const regHandler = () => {
		const api = newCompany(companyData)
			.then(response => {
				console.log(response),
					responseHandler(
						props.setResForm,
						'block',
						'Poslali smo Vam verifikacioni e-mail i sms. Klikom na link u e-mail-u i sms-u registracija će biti završena.',
						'green'
					);
				props.setIsLoading(false);
				props.setDisplayRegServProv('none');
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					error.response.data.map(err => {
						const Input = err.type[0].toLowerCase() + err.type.slice(1);
						responseHandler(props.setResForm, 'block', err.errorMessage, 'red');
						updateValidity(setFormInput, Input, formInput, '', false);
					});
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
		setFormInput(initState);
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		regHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			name: formInput.name.value.trim(),
			companyName: formInput.companyName.value.trim(),
			email: formInput.email.value.trim(),
			phone: formInput.mobOperator.value + formInput.phone.value.trim(),
			userName: formInput.userName.value.trim(),
			password: formInput.password.value.trim(),
			city: formInput.city.value.trim(),
		};

		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!formInput.name.value.trim()) {
			updateValidity(setFormInput, 'name', formInput, '', false);
			props.setResForm({
				display: 'block',
				message: 'Morate uneti Ime i prezime!',
				border: 'red',
			});
		} else if (!formInput.userName.value.trim()) {
			updateValidity(setFormInput, 'userName', formInput, '', false);
			props.setResForm({
				display: 'block',
				message: 'Morate uneti korisničko ime!',
				border: 'red',
			});
		} else if (!formInput.companyName.value.trim()) {
			updateValidity(setFormInput, 'companyName', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti naziv firme!', 'red');
		} else if (!formInput.city.value.trim()) {
			updateValidity(setFormInput, 'city', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti grad!', 'red');
		} else if (!formInput.mobOperator.value) {
			updateValidity(setFormInput, 'mobOperator', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate izabrati pozivni broj!', 'red');
		} else if (
			!formInput.phone.value.trim() ||
			!numericPattern.test(formInput.phone.value) ||
			formInput.phone.value.length < 6
		) {
			updateValidity(setFormInput, 'phone', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti validan broj telefona!', 'red');
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			updateValidity(setFormInput, 'email', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti validnu e-mail adresu!', 'red');
		} else if (!formInput.password.value.trim()) {
			updateValidity(setFormInput, 'password', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti lozinku!', 'red');
		} else if (!formInput.passConfirm.value.trim()) {
			updateValidity(setFormInput, 'passConfirm', formInput, '', false);
			responseHandler(props.setResForm, 'block', 'Morate uneti potvrdu izabrane lozinke!', 'red');
		} else if (formInput.password.value.trim() !== formInput.passConfirm.value.trim()) {
			setFormInput({
				...formInput,
				password: {
					value: '',
					valid: false,
				},
				passConfirm: {
					value: '',
					valid: false,
				},
			});
			responseHandler(props.setResForm, 'block', 'Lozinka i potvrda moraju biti jednake!', 'red');
		} else {
			setCompanyData(formData);
			props.setIsLoading(true);
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<form
			style={{ display: props.displayRegServProv }}
			className={classes.Form}
			onSubmit={onSubmit}>
			<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
				REGISTRACIJA PRUŽAOCA USLUGA
			</h2>
			<Input
				type="text"
				name="name"
				className={inputClassName}
				placeholder="Uneti ime i prezime"
				value={formInput.name.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
				invalid={!formInput.name.valid}
			/>
			<Input
				type="text"
				name="userName"
				className={inputClassName}
				placeholder="Uneti korisničko ime"
				value={formInput.userName.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'userName', formInput, setFormInput)}
				invalid={!formInput.userName.valid}
			/>
			<Input
				type="text"
				name="companyName"
				className={inputClassName}
				placeholder="Uneti naziv firme"
				value={formInput.companyName.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'companyName', formInput, setFormInput)}
				invalid={!formInput.companyName.valid}
			/>
			<Input
				type="text"
				name="address"
				className={inputClassName}
				placeholder="Uneti adresu firme"
				value={formInput.address.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'address', formInput, setFormInput)}
			/>
			<Input
				type="text"
				name="city"
				className={inputClassName}
				placeholder="Uneti grad"
				value={formInput.city.value}
				maxLength="40"
				onChange={e => inputChangedHandler(e, 'city', formInput, setFormInput)}
				invalid={!formInput.city.valid}
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value={formInput.mobOperator.value}
				onChange={e => inputChangedHandler(e, 'mobOperator', formInput, setFormInput)}
				invalid={!formInput.mobOperator.valid}>
				<option value="060">060</option>
				<option value="061">061</option>
				<option value="062">062</option>
				<option value="063">063</option>
				<option value="064">064</option>
				<option value="065">065</option>
				<option value="066">066</option>
				<option value="069">069</option>
			</Select>
			<Input
				type="number"
				name="phone"
				className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
				placeholder="Uneti telefon"
				value={formInput.phone.value}
				maxLength="7"
				onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="text"
				name="email"
				className={inputClassName}
				placeholder="Uneti e-mail"
				value={formInput.email.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
				invalid={!formInput.email.valid}
			/>
			<Input
				type="password"
				name="password"
				className={inputClassName}
				placeholder="Izabrati lozinku"
				value={formInput.password.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'password', formInput, setFormInput)}
				invalid={!formInput.password.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Ponovo uneti lozinku"
				value={formInput.passConfirm.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'passConfirm', formInput, setFormInput)}
				invalid={!formInput.passConfirm.valid}
			/>
			<Input
				type="submit"
				value="REGISTRUJ SE"
				display="block"
				width={isMobile ? '48%' : 'inherit'}
				float={isMobile ? 'left' : 'inherit'}
				margin={isMobile ? '20px auto 5px auto' : '40px auto 5px auto'}
				className={isMobile ? classes.SubmitButtonMob : classes.SubmitButton}
			/>
			<Input
				type="button"
				value="ODUSTANI"
				display="block"
				float={isMobile ? 'right' : 'inherit'}
				width={isMobile ? '48%' : 'inherit'}
				margin="20px auto 5px auto"
				color="orangered"
				className={isMobile ? classes.FormButtonCloseMob : classes.FormButton}
				onClick={() => {
					props.setDisplayRegServProv('none'), setFormInput(initState);
				}}
			/>
		</form>
	);
};

export default RegServProv;
