import { useState, useEffect, useRef } from 'react';
/* import axios from '../../../utils/Axios/axios-appointments'; */
import useDeviceDetect from '../../../utils/UseDeviceDetect';
import { inputChangedHandler } from '../../shared/utility';
import initState from './initState';

import DescriptionLabel from '../../UI/DescriptionLabel';
import Input from '../../UI/Forms/Input';
import Select from '../../UI/Select';

import classes from '../../UI/UI.module.scss';

const PassRecovery = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [userData, setUserData] = useState([]);

	const [formInput, setFormInput] = useState({
		mobOperator: {
			value: '',
			valid: true,
			touched: false,
		},
		phone: {
			value: '',
			valid: true,
			touched: false,
		},
		email: {
			value: '',
			valid: true,
			touched: false,
		},
	});

	/* const passRecoveryHandler = () => {
		const api = axios
			.post('/logins.json', userData)
			.then(response => {
				console.log(response),
					alert('Poslali smo Vam podatke za prijavu. Proverite sms odnosno e-mail');
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
		/* passRecoveryHandler(); */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			mobOperator: formInput.mobOperator.value,
			phone: formInput.phone.value.trim(),
			email: formInput.email.value.trim(),
		};
		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		if (
			(formInput.mobOperator.value !== '' && formInput.phone.value.trim() !== '') ||
			(formInput.email.value.trim() !== '' && emailPattern.test(formInput.email.value))
		) {
			setUserData([...userData, formData]);
			props.setDisplayPassRecovery('none');
		} else {
			setFormInput({
				...formInput,
				mobOperator: {
					value: '',
					valid: false,
				},
				phone: {
					value: '',
					valid: false,
				},
				email: {
					value: '',
					valid: false,
				},
			});
			alert('Unesite broj telefona ili validnu e-mail adresu');
		}
	};
	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const formMarginTop = isMobile ? '60px' : '0';
	return (
		<form
			style={{ display: props.displayPassRecovery, marginTop: formMarginTop }}
			className={classes.Form}
			onSubmit={onSubmit}>
			<DescriptionLabel
				className={classes.DesciptionLabel}
				color="orange"
				text="Unesite svoj broj telefona ili Email adresu kako bismo Vam poslali podatke za prijavu"
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				margin="50px auto 5px auto"
				placeholder="064"
				value={formInput.mobOperator.value}
				onChange={e => inputChangedHandler(e, 'mobOperator', formInput, setFormInput)}
				invalid={!formInput.mobOperator.valid}>
				<option>060</option>
				<option>061</option>
				<option>062</option>
				<option>063</option>
				<option>064</option>
				<option>065</option>
				<option>066</option>
				<option>069</option>
			</Select>
			<Input
				type="number"
				name="phone"
				className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
				display="inline-block"
				margin="50px auto 5px auto"
				placeholder="Uneti telefon"
				maxLength="7"
				value={formInput.phone.value}
				onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="text"
				name="email"
				className={inputClassName}
				display="block"
				margin="15px auto 5px auto"
				placeholder="Uneti e-mail"
				value={formInput.email.value}
				onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
				invalid={!formInput.email.valid}
			/>
			<Input
				type="submit"
				value="POTVRDI"
				display="block"
				margin="40px auto 5px auto"
				className={isMobile ? classes.SubmitButtonMob : classes.SubmitButton}
			/>
			<Input
				type="button"
				value="ODUSTANI"
				display="block"
				margin="20px auto 5px auto"
				color="orangered"
				className={isMobile ? classes.FormButtonCloseMob : classes.FormButton}
				onClick={() => {
					props.setDisplayPassRecovery('none'), setFormInput(initState);
				}}
			/>
		</form>
	);
};

export default PassRecovery;
