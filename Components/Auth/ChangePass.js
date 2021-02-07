/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import axios from '../../helpers/Axios';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';

import Input from '../UI/Forms/Input';

import classes from '../UI/UI.module.scss';

const ChangePass = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [changePass, setChangePass] = useState({});
	const [formInput, setFormInput] = useState({
		oldPass: {
			value: '',
			touched: false,
			valid: true,
		},
		newPass: {
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

	const initState = {
		oldPass: {
			value: '',
			touched: false,
			valid: true,
		},
		newPass: {
			value: '',
			touched: false,
			valid: true,
		},
		passConfirm: {
			value: '',
			touched: false,
			valid: true,
		},
	};

	const regHandler = () => {
		const api = axios
			.post('/users/companyRegistration', changePass)
			.then(response => {
				console.log(response), alert('Uspešno ste premenili lozinku');
			})
			.catch(error => console.log(error));
		api;
		setFormInput(initState);
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		regHandler();
	}, [changePass]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			oldPass: formInput.oldPass.value.trim(),
			newPass: formInput.newPass.value.trim(),
		};

		if (!formInput.oldPass.value.trim()) {
			updateValidity(setFormInput, 'oldPass', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti trenutnu lozinku!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.newPass.value.trim()) {
			updateValidity(setFormInput, 'newPass', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti novu lozinku!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.passConfirm.value.trim()) {
			updateValidity(setFormInput, 'passConfirm', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate potvditi nouv lozinku!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (formInput.newPass.value.trim() !== formInput.passConfirm.value.trim()) {
			setFormInput({
				...formInput,
				newPass: {
					value: '',
					valid: false,
				},
				passConfirm: {
					value: '',
					valid: false,
				},
			});
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Nova lozinka i potvrda moraju biti jednake!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setChangePass(formData);
			props.setDisplayChangePass('none');
		}
	};

	const buttonGroup = (
		<>
			<Input
				type="submit"
				name="submit"
				value="POTVRDI"
				className={classes.SubmitButton}
				display="block"
				width="70%"
				height="40px"
				margin="40px auto 5px auto"
			/>
			<Input
				type="button"
				name="passRecovery"
				value="ZABORAVLJENA LOZINKA"
				className={isMobile ? classes.FormButtonMob : classes.FormButton}
				display="block"
				width="70%"
				height="40px"
				margin="40px auto 5px auto"
				onClick={() => {
					props.setDisplayChangePass('none'),
						props.setDisplayPassRecovery('block'),
						setFormInput(initState);
				}}
			/>
			<Input
				type="button"
				name="formClose"
				value="ODUSTANI"
				className={isMobile ? classes.FormButtonMob : classes.FormButton}
				display="block"
				width="70%"
				height="40px"
				margin="40px auto 5px auto"
				color="orangered"
				onClick={() => {
					props.setDisplayChangePass('none'), setFormInput(initState);
				}}
			/>
		</>
	);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

	return (
		<form
			style={{ display: props.displayChangePass, position: 'absolute' }}
			className={classes.Form}
			onSubmit={onSubmit}>
			<h2 className={classes.FormTitle}>PROMENA LOZINKE</h2>
			<Input
				type="password"
				name="oldPass"
				className={inputClassName}
				placeholder="Uneti trenutnu lozinku"
				value={formInput.oldPass.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'oldPass', formInput, setFormInput)}
				invalid={!formInput.oldPass.valid}
			/>
			<Input
				type="password"
				name="newPass"
				className={inputClassName}
				placeholder="Izabrati novu lozinku"
				value={formInput.newPass.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'newPass', formInput, setFormInput)}
				invalid={!formInput.newPass.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Potvrditi novu lozinku"
				value={formInput.passConfirm.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'passConfirm', formInput, setFormInput)}
				invalid={!formInput.passConfirm.valid}
			/>
			{buttonGroup}
		</form>
	);
};

export default ChangePass;
