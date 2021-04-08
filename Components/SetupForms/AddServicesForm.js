import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { addNewServiceToMany } from '../../api/addNewServiceToMany';
import { addNewService } from '../../api/addNewService';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import UsersList from './UsersList';

import classes from './SetupForms.module.scss';

const AddServicesForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [serviceData, setServiceData] = useState({});
	const [checkedEmployees, setCheckedEmployees] = useState([]);

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

	const duration = ['15', '30', '45', '60'];

	const durationList = () => {
		return duration.map((time, i) => <option key={i}>{time}</option>);
	};

	const addServiceHandler = () => {
		const employee = props.employee.id;
		const api = addNewService(serviceData, employee)
			.then(response => {
				console.log(response), props.setIsLoading(false);
				setFormInput(initServicesForm);
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
		api;
	};

	const addServiceToManyHandler = () => {
		const api = addNewServiceToMany(serviceData)
			.then(response => {
				console.log(response), props.setIsLoading(false);
				setFormInput(initServicesForm);
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
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}

		/* addServiceToManyHandler(); */
		props.employees.length < 1 ? addServiceHandler() : addServiceToManyHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			NewService: {
				Name: formInput.serviceName.value.trim(),
				Price: parseFloat(formInput.price.value.trim()),
				Duration: parseInt(formInput.duration.value),
				Description: formInput.description.value.trim(),
			},
			Employees: checkedEmployees,
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
			setServiceData(formData);
			props.setIsLoading(true);
		}
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const pickDurationClassName = isMobile ? classes.pickDuratuionMob : classes.pickDuratuion;
	return (
		<div style={{ display: props.displayAddServicesForm }}>
			<h3>Unesite usluge</h3>
			<UsersList
				title="Izaberite radnike kojima dodeljujete usluge"
				listOfUsers={props.listOfEmployees}
				checkedUsers={checkedEmployees}
				setCheckedUsers={setCheckedEmployees}
				addForSelectedClassName={classes.addForSelected}
				component="services"
			/>
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
				type="number"
				name="price"
				placeholder="Cena usluge"
				maxLength="10"
				className={inputClassName}
				value={formInput.price.value}
				onChange={e => inputChangedHandler(e, 'price', formInput, setFormInput)}
			/>
			<Input
				type="button"
				value="dodaj"
				className={
					isMobile
						? [classes.ChoiceButton, classes.AddMob].join(' ')
						: [classes.ChoiceButton, classes.Add].join(' ')
				}
				display="block"
				marginBottom="20px"
				onClick={onSubmit}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddServicesForm('none'), props.setDisplayWorkingTimeForm('block');
				}}
			/>
		</div>
	);
};

export default AddServicesForm;
