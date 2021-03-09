import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import initEmployeeForm from './initEmployeeForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';

import classes from '../../Components/UI/UI.module.scss';

const addEmployeeForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [employeeData, setEmployeeData] = useState({});
	const [employeesList, setEmployeesList] = useState([]);

	const [formInput, setFormInput] = useState({
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
	});

	const employeesPreview = () => {
		const listItems = employeesList.map(data => {
			return <p>{data}</p>;
		});
		return listItems;
	};

	const addEmployeeHandler = () => {
		/* const api = newCompany(companyData)
			.then(response => {
				console.log(response),
					responseHandler(
						props.setShowResponseModal,
						modalAnimation,
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
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						updateValidity(setFormInput, Input, formInput, '', false);
						props.setShowBackdrop(classes.backdropIn);
					});
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api; */
		console.log('employee added');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addEmployeeHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			name: formInput.name.value.trim(),
			email: formInput.email.value.trim(),
			phone: formInput.mobOperator.value + formInput.phone.value.trim(),
		};

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
		} else if (!formInput.email.value.trim()) {
			updateValidity(setFormInput, 'email', formInput, '', false);
			responseHandler(props.setShowResponseModal, modalAnimation, 'Morate uneti grad!', 'red');
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
		} else {
			setEmployeeData(formData);
			setEmployeesList([...employeesList, formData.name]);
			setFormInput(initEmployeeForm);
			/* props.setIsLoading(true); */
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<div style={{ display: props.displayAddEmployeeForm }}>
			<h3>Unesite podatke radnika</h3>
			<Input
				type="text"
				name="name"
				placeholder="Ime i prezime"
				className={inputClassName}
				value={formInput.name.value}
				onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
				invalid={!formInput.name.valid}
			/>
			<Input
				type="text"
				name="email"
				placeholder="Email adresa"
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
				placeholder="Uneti telefon"
				maxLength="7"
				value={formInput.phone.value}
				onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="button"
				value="dodaj"
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				display="block"
				onClick={onSubmit}
			/>
			<div className={classes.Review}>
				<h4>Vaši radnici</h4>
				<div>{employeesPreview()}</div>
			</div>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				onClick={() => {
					setDisplayAddEmployeeForm('none'), setDisplayGreeting('none'), nextStep();
				}}
			/>
		</div>
	);
};

export default addEmployeeForm;
