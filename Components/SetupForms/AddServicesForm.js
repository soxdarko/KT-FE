import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	checkBoxGroupToArrayHandler,
} from '../../helpers/universalFunctions';
import { addNewServiceToMany } from '../../api/addNewServiceToMany';
import { addNewService } from '../../api/addNewService';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';
import Select from '../UI/Select';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

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

	const employeesList = employees => {
		const listItems = employees.map(employee => {
			return (
				<div key={employee.id} className={classes.addForSelectedWrapper}>
					<Input
						type="checkbox"
						id={employee.id}
						className={classes.addForSelected}
						onChange={e => checkBoxGroupToArrayHandler(e, checkedEmployees, setCheckedEmployees)}
					/>
					<Label htmlFor={employee.id} />
					<p className={classes.addForSelceted_p}>{employee.name}</p>
				</div>
			);
		});
		return listItems;
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

	console.log(props.employees.length);

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
			<div
				className={isMobile ? classes.ReviewMob : classes.Review}
				style={{ display: props.employees.length < 2 ? 'none' : 'block' }}>
				<h4>Izaberite radnike kojima dodeljujete usluge</h4>
				<div>{employeesList(props.employees)}</div>
			</div>
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
					props.setDisplayAddServicesForm('none'),
						props.setDisplayWorkingTimeForm('block'),
						props.nextStep();
				}}
			/>
		</div>
	);
};

export default AddServicesForm;
