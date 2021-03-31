import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { addNewEmployee } from '../../api/addNewEmployee';
import initEmployeeForm from './initEmployeeForm';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';
import Select from '../UI/Select';
import Radio from '../UI/Select';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const addEmployeeForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [employeeData, setEmployeeData] = useState({});
	const [employeesList, setEmployeesList] = useState([]);
	const [serviceProviderId, setServiceProviderId] = useState('');

	const [formInput, setFormInput] = useState({
		serviceProvider: {
			value: '',
			touched: false,
			valid: true,
		},
		name: {
			value: '',
			touched: false,
			valid: true,
		},
		email: {
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

	const serviceProvidersPreview = serviceProviders => {
		const listItems = serviceProviders.map(serviceProvider => {
			return (
				<option key={serviceProvider.id} value={serviceProvider.id}>
					{serviceProvider.name}
				</option>
			);
		});
		return listItems;
	};

	console.log(serviceProviderId);

	const addServiceProviderHandler = () => {
		const api = addNewEmployee(props.token, employeeData, serviceProviderId)
			.then(response => {
				console.log(response), props.setIsLoading(false);
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		/* .catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					error.response.data.map(err => {
						const Input = err.type[0].toLowerCase() + err.type.slice(1);
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						updateValidity(setFormInput, Input, formInput, '', false);
						props.setShowBackdrop(classes.backdropIn);
					});
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			}); */
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			Name: formInput.name.value.trim(),
			Email: formInput.email.value.trim(),
			Phone: formInput.mobOperator.value + formInput.phone.value.trim(),
			UserName: formInput.userName.value.trim(),
			Password: formInput.password.value.trim(),
		};

		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!formInput.name.value.trim()) {
			updateValidity(setFormInput, 'name', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti ime radnika!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			updateValidity(setFormInput, 'email', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti validnu e-mail adresu!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.mobOperator.value) {
			updateValidity(setFormInput, 'mobOperator', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati pozivni broj!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			!formInput.phone.value.trim() ||
			!numericPattern.test(formInput.phone.value) ||
			formInput.phone.value.length < 6
		) {
			updateValidity(setFormInput, 'phone', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti validan broj telefona!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.userName.value.trim()) {
			updateValidity(setFormInput, 'userName', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti korisničko ime!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.password.value.trim()) {
			updateValidity(setFormInput, 'password', formInput, '', false);
			responseHandler(props.setShowResponseModal, modalAnimation, 'Morate uneti lozinku!', 'red');
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.passConfirm.value.trim()) {
			updateValidity(setFormInput, 'passConfirm', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti potvrdu izabrane lozinke!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (serviceProviderId == '') {
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati salon za koji želite dodati radnika!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setEmployeeData(formData);
			setEmployeesList([...employeesList, formData.name]);
			setFormInput(initEmployeeForm);
			/* props.setIsLoading(true); */
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const selectClassName = isMobile ? classes.InputTextMob : classes.SelectInputText;
	return (
		<div style={{ display: props.displayAddEmployeeForm }}>
			<Select
				name="serviceProvider"
				className={selectClassName}
				value={formInput.serviceProvider.value}
				onChange={e => {
					setServiceProviderId(e.target.value),
						inputChangedHandler(e, 'serviceProvider', formInput, setFormInput);
				}}
				invalid={!formInput.mobOperator.valid}>
				<option value="" disabled>
					Izaberite salon
				</option>
				{serviceProvidersPreview(props.serviceProviders)}
			</Select>
			<Input
				type="text"
				name="name"
				placeholder="Unesite ime i prezime"
				className={inputClassName}
				value={formInput.name.value}
				onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
				invalid={!formInput.name.valid}
			/>
			<Input
				type="text"
				name="userName"
				className={inputClassName}
				placeholder="Unesite korisničko ime"
				value={formInput.userName.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'userName', formInput, setFormInput)}
				invalid={!formInput.userName.valid}
			/>
			<Input
				type="text"
				name="email"
				placeholder="Unesite  e-mail adresu"
				className={inputClassName}
				value={formInput.email.value}
				onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
				invalid={!formInput.email.valid}
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
				placeholder="Unesite broj telefona"
				maxLength="7"
				value={formInput.phone.value}
				onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="password"
				name="password"
				className={inputClassName}
				placeholder="Izaberite lozinku"
				value={formInput.password.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'password', formInput, setFormInput)}
				invalid={!formInput.password.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Ponovo unseite lozinku"
				value={formInput.passConfirm.value}
				maxLength="50"
				onChange={e => inputChangedHandler(e, 'passConfirm', formInput, setFormInput)}
				invalid={!formInput.passConfirm.valid}
			/>
			<Input
				type="button"
				value="dodaj"
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				display="block"
				onClick={onSubmit}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddEmployeeForm('none'),
						props.setDisplayAddServicesForm('block'),
						props.nextStep();
				}}
			/>
		</div>
	);
};

export default addEmployeeForm;
