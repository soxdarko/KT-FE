import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../../api/userLogin';
import {
	useDeviceDetect,
	inputChangedHandler,
	responseHandler,
} from '../../../helpers/universalFunctions';
import { getCompanyGuideStatus } from '../../../api/getCompanyGuideStatus';
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

	const getGuideStatus = async () => {
		const api = await getCompanyGuideStatus()
			.then(response => {
				const getGuideStatusData = response.data;
				props.setUserStatus(getGuideStatusData);
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				}
			});
		return api;
	};

	const userData = {
		userName: loginUser.userName,
		password: loginUser.password,
	};

	const loginHandler = () => {
		const api = userLogin(userData)
			.then(response => {
				console.log(response);
				responseHandler(
					props.setShowResponseModal,
					modalAnimation,
					'Uspešno ste se prijavili',
					'green',
					'none'
				);
				props.setShowBackdrop(classes.backdropIn);
				getGuideStatus();
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					responseHandler(
						props.setShowResponseModal,
						modalAnimation,
						'Uneli ste pogrešno korisničko ime ili lozinku!',
						'red'
					);
					props.setShowBackdrop(classes.backdropIn);
				} else if (error.request) {
					console.log(error.request);
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
				display={props.clientAuth === 1 ? 'none !important' : 'block'}
				onClick={() => {
					props.setDisplayLogin('none'),
						props.setDisplayTabContainer('none'),
						setFormInput(initState),
						props.setShowBackdrop(classes.backdropOut);
				}}
			/>
		</>
	);

	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;

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
				modalAnimation,
				'Morate uneti korisničko ime!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.password.value.trim()) {
			setFormInput({
				...formInput,
				password: {
					value: '',
					valid: false,
				},
			});
			responseHandler(props.setShowResponseModal, modalAnimation, 'Morate uneti lozinku!', 'red');
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setLoginUser(formData);
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
