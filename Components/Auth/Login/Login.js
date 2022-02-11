import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../../api/userLogin';
import {
	UseDeviceDetect,
	inputChangedHandler,
	responseHandler,
} from '../../../helpers/universalFunctions';
import { getCompanyGuideStatus } from '../../../api/getCompanyGuideStatus';
import initState from './initState';

import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const Login = props => {
	const { isMobile } = UseDeviceDetect();
	const isComponentLoad = useRef(true);
	const [loginUser, setLoginUser] = useState([]);
	const [formInput, setFormInput] = useState(initState);

	function closeForm() {
		props.setDisplayLogin('none');
		props.setDisplayTabContainer('none');
		setFormInput(initState);
		props.setShowBackdrop(classes.backdropOut);
	}

	function passRecoveryFormHandler() {
		props.setDisplayLogin('none');
		props.setDisplayPassRecovery('block');
		setFormInput(initState);
	}

	const apiErrorHandler = (err, message = 'Došlo je do greške, kontaktirajte nas putem kontakt forme') => {
		console.log(err);
		responseHandler(props.setShowResponseModal, message, 'red', !props.triger);
		props.setShowBackdrop(classes.backdropIn);
		props.setIsLoading(false);
	};

	const getGuideStatus = async () => {
		const api = await getCompanyGuideStatus()
			.then(response => {
				console.log(response.data)
				const getGuideStatusData = response.data;
				props.setUserStatus(getGuideStatusData);
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response);
					const errMessage = err.response.data.map(d => d.errorMessage).join('...');
					apiErrorHandler(err.response, errMessage)
				} else if (err.request) {
					apiErrorHandler(err.request);
				} else {
					apiErrorHandler(err);
				}
			});
		return api;
	};

	const userData = {
		userName: loginUser.userName,
		password: loginUser.password,
	};

	const loginHandler = () => {
		props.setIsLoading(false);
		const api = userLogin(userData)
			.then(response => {
				console.log(response);
				props.infoMessageHandler(
					props.setShowInfoModal,
					'Uspešno ste se prijavili!',
					!props.triger
				);
				getGuideStatus();
				setFormInput(initState);
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response);
					const errMessage = err.response.data.map(d => d.errorMessage).join('...');
					apiErrorHandler(err.response, errMessage)
				} else if (err.request) {
					apiErrorHandler(err.request);
				} else {
					apiErrorHandler(err);
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		loginHandler();
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
				onClick={() => props.setIsLoading(true)}
			/>
			<Input
				type="button"
				name="passRecovery"
				value="ZABORAVLJENA LOZINKA"
				placeholder="Uneti lozinku"
				className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
				onClick={() => passRecoveryFormHandler()}
			/>
			<Input
				type="button"
				name="formClose"
				value="ODUSTANI"
				placeholder="Uneti lozinku"
				className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
				color="orangered"
				display={props.clientAuth === 1 ? 'none !important' : 'block'}
				onClick={() => closeForm()}
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
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti korisničko ime!',
				'red',
				!props.triger
			);
		} else if (!formInput.password.value.trim()) {
			setFormInput({
				...formInput,
				password: {
					value: '',
					valid: false,
				},
			});
			responseHandler(props.setShowResponseModal, 'Morate uneti lozinku!', 'red', !props.triger);
		} else {
			setLoginUser(formData);
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<form style={{ display: props.displayLogin }} className={classes.Form} onSubmit={onSubmit}>
			<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>PRIJAVA KORISNIKA</h2>
			<Input
				type="text"
				name="username"
				id={props.inputId}
				value={formInput.userName.value}
				placeholder="UNESITE KORISNIČKO IME"
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
