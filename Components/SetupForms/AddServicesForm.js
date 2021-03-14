import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';
import Select from '../UI/Select';

import classes from '../../Components/UI/UI.module.scss';

const AddServicesForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [servicesData, setServicesData] = useState({});

	const [formInput, setFormInput] = useState({
		serviceName: {
			value: '',
			touched: false,
			valid: true,
		},
		description: {
			value: '',
			touched: false,
			valid: true,
		},
		duration: {
			value: '',
			touched: false,
			valid: true,
		},
		price: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	const employeeList = ['Emlpoyee1', 'Emlpoyee2', 'Emlpoyee3', 'Emlpoyee4', 'Emlpoyee5'];
	const duration = ['15', '30', '45', '60'];

	/* const saloonsPreview = () => {
		const listItems = saloonsList.map(data => {
			return <p>{data}</p>;
		});
		return listItems;
	}; */

	const addServicesHandler = () => {
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
		console.log('service added');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addServicesHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [servicesData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			serviceName: formInput.serviceName.value.trim(),
			description: formInput.description.value.trim(),
			duration: formInput.duration.value.trim(),
			price: formInput.price.value.trim(),
		};

		if (!formInput.serviceName.value.trim()) {
			updateValidity(setFormInput, 'serviceName', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.duration.value.trim()) {
			updateValidity(setFormInput, 'duration', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati dužinu trajanja usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setServicesData(formData);
			setFormInput(initServicesForm);
			/* props.setIsLoading(true); */
		}
	};

	const durationList = () => {
		return duration.map((time, i) => <option key={i}>{time}</option>);
	};

	const employeesList = () => {
		return employeeList.map((user, i) => (
			<div key={i} className={classes.addForSelectedWrapper}>
				<Input type="checkbox" id={`chkbox${i}`} className={classes.addForSelected} />
				<Label htmlFor={`chkbox${i}`} />
				<p className={classes.addForSelceted_p}>{user}</p>
			</div>
		));
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const pickDurationClassName = isMobile ? classes.pickDuratuionMob : classes.pickDuratuion;
	return (
		<div style={{ display: props.displayAddServicesForm }}>
			<h3>Unesite usluge</h3>
			<Input
				type="text"
				name="serviceName"
				placeholder="Naziv usluge"
				className={inputClassName}
				value={formInput.serviceName.value}
				onChange={e => inputChangedHandler(e, 'serviceName', formInput, setFormInput)}
				invalid={!formInput.serviceName.valid}
			/>
			<Input
				type="text"
				name="description"
				placeholder="Opis usluge"
				className={inputClassName}
				value={formInput.description.value}
				onChange={e => inputChangedHandler(e, 'description', formInput, setFormInput)}
				invalid={!formInput.description.valid}
			/>
			<Select
				displaySelect={'block'}
				className={pickDurationClassName}
				idSelect={'employees'}
				idName={'employees'}
				onChange={e => inputChangedHandler(e, 'duration', formInput, setFormInput)}>
				<option value="trajanje usluge" disabled selected>
					trajanje usluge
				</option>
				{durationList()}
			</Select>
			<Input
				type="text"
				name="price"
				placeholder="Cena usluge"
				className={inputClassName}
				value={formInput.price.value}
				onChange={e => inputChangedHandler(e, 'price', formInput, setFormInput)}
				invalid={!formInput.price.valid}
			/>
			<div className={classes.Review}>
				<h4>Izaberite radnike kojima želite dodeliti uslugu</h4>
				<div>{employeesList()}</div>
			</div>
			<Input
				type="button"
				value="dodaj"
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				display="block"
				marginTop="-10px"
				marginBottom="20px"
				onClick={onSubmit}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				onClick={() => {
					props.setDisplayAddServicesForm('none'),
						props.setDisplayWorkingTimeForm('block'),
						props.nextStep();
				}}
			/>
		</div>
	);
};

export default AddServicesForm;
