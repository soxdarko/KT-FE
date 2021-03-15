import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import initSaloonForm from './initSaloonForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const addSaloonForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [saloonData, setSaloonData] = useState({});
	const [saloonsList, setSaloonsList] = useState([]);

	const [formInput, setFormInput] = useState({
		saloonName: {
			value: '',
			touched: false,
			valid: true,
		},
		city: {
			value: '',
			touched: false,
			valid: true,
		},
		address: {
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

	const saloonsPreview = () => {
		const listItems = saloonsList.map(data => {
			return <p>{data}</p>;
		});
		return listItems;
	};

	const addSaloonHandler = () => {
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
		console.log('saloon added');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addSaloonHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [saloonData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			name: formInput.saloonName.value.trim(),
			city: formInput.city.value.trim(),
			address: formInput.address.value.trim(),
			phone: formInput.mobOperator.value + formInput.phone.value.trim(),
		};

		const numericPattern = /^\d+$/;
		if (!formInput.saloonName.value.trim()) {
			updateValidity(setFormInput, 'saloonName', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv salona!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.city.value.trim()) {
			updateValidity(setFormInput, 'city', formInput, '', false);
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
			setSaloonData(formData);
			setSaloonsList([...saloonsList, formData.name]);
			setFormInput(initSaloonForm);
			/* props.setIsLoading(true); */
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<div style={{ display: props.displayAddSaloonForm }}>
			<h3>Unesite podatke salona</h3>
			<Input
				type="text"
				name="saloonName"
				placeholder="Naziv salona"
				className={inputClassName}
				value={formInput.saloonName.value}
				onChange={e => inputChangedHandler(e, 'saloonName', formInput, setFormInput)}
				invalid={!formInput.saloonName.valid}
			/>
			<Input
				type="text"
				name="city"
				placeholder="Grad"
				className={inputClassName}
				value={formInput.city.value}
				onChange={e => inputChangedHandler(e, 'city', formInput, setFormInput)}
				invalid={!formInput.city.valid}
			/>
			<Input
				type="text"
				name="address"
				placeholder="Adresa"
				className={inputClassName}
				value={formInput.address.value}
				onChange={e => inputChangedHandler(e, 'address', formInput, setFormInput)}
				invalid={!formInput.address.valid}
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
			<div className={isMobile ? classes.ReviewMob : classes.Review}>
				<h4>Vaši saloni</h4>
				<div>{saloonsPreview()}</div>
			</div>
			<Input
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddSaloonForm('none'),
						props.setDisplayAddEmployeeForm('block'),
						props.nextStep();
				}}
			/>
		</div>
	);
};

export default addSaloonForm;
