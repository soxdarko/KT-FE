import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { saveServicesToManyEmployees } from '../../api/saveServicesToManyEmployees';
import { addNewService } from '../../api/addNewService';
import { getAllServices } from '../../api/getAllServices';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesPicker from './EmployeesPicker';

import classes from './SetupForms.module.scss';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';
import NavItems from '../Navigation/NavItems';

const AddServicesForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [serviceId, setServiceId] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [newServiceData, setNewServiceData] = useState({});
	const [checkedEmployees, setCheckedEmployees] = useState([]);

	const [formInput, setFormInput] = useState(initServicesForm);

	const resetForm = () => {
		setServiceId(null), setFormInput(initServicesForm);
	};

	const duration = ['15', '30', '45', '60'];

	const durationList = () => {
		return duration.map((time, i) => (
			<option key={i} value={time}>
				{time}
			</option>
		));
	};

	const getAllServicesHandler = async () => {
		const api = await getAllServices()
			.then(response => {
				const getServicesData = response.data.map(service => {
					return service;
				});
				props.setServicesData(getServicesData);
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

	const addServiceHandler = () => {
		const api = addNewService(newServiceData)
			.then(response => {
				console.log(response), props.setIsLoading(false);
				setFormInput(initServicesForm);
				getAllServicesHandler();
				resetForm();
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
		const api = saveServicesToManyEmployees(newServiceData)
			.then(response => {
				console.log(response), props.setIsLoading(false);
				getAllServicesHandler();
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
	}, [newServiceData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: serviceId,
				Name: formInput.serviceName.value.trim(),
				Duration: parseInt(formInput.duration.value),
				Price:
					typeof formInput.price.value === 'string'
						? parseFloat(formInput.price.value.trim())
						: formInput.price.value,
				Employees: checkedEmployees,
				Description: formInput.description.value.trim(),
				Deleted: formInput.deleted,
			},
		];

		if (!formInput.serviceName.value.trim()) {
			updateValidity(setFormInput, 'serviceName', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.duration.value) {
			updateValidity(setFormInput, 'duration', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati dužinu trajanja usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (checkedEmployees.length === 0) {
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati minimum jednog radnika!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setNewServiceData(formData);
			props.setIsLoading(true);
		}
	};

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

	const allServicesPreview = () => {
		return props.servicesData.map(service => (
			<option key={service.id} value={service.id}>
				{service.name}
			</option>
		));
	};

	useEffect(() => {
		props.servicesData.filter(item => {
			if (item.id === serviceId) {
				setCheckedEmployees(item.employees);
				return setFormInput({
					...formInput,
					id: null,
					serviceName: {
						value: item.name,
						touched: false,
						valid: true,
					},
					duration: {
						value: item.duration,
						touched: false,
						valid: true,
					},
					price: {
						value: item.price,
						touched: false,
						valid: true,
					},
					description: {
						value: item.description,
						touched: false,
						valid: true,
					},
					serviceProviderId: {
						value: null,
						touched: false,
						valid: true,
					},
					deleted: item.deleted,
				});
			}
		});
	}, [serviceId]);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	/* 	console.log(
		props.servicesData.map(a => {
			return a.name;
		})
	); */

	const displayForm = () => {
		if (props.userGuideStatus === 'Employees') {
			props.setDisplayGreeting('none');
			props.setDisplayAddServicesForm('block');
		} else {
			props.setDisplayAddServicesForm('none');
		}
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		displayForm();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div style={{ display: props.displayAddServicesForm }}>
			<h3>Unesite usluge</h3>
			<Select
				name="serviceProviderId"
				className={classes.SelectInputText}
				value={formInput.serviceProviderId.value}
				onChange={e => {
					inputChangedHandler(e, 'serviceProviderId', formInput, setFormInput), setEditMode(false);
				}}>
				<option value="" disabled selected hidden>
					Izaberite salon
				</option>
				{serviceProvidersPreview(props.serviceProviderData)}
			</Select>
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
				displaySelect="block"
				className={classes.SelectInputText}
				value={formInput.duration.value}
				name={'duration'}
				onChange={e => inputChangedHandler(e, 'duration', formInput, setFormInput)}>
				<option value="trajanje usluge" disabled selected hidden>
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
			<EmployeesPicker
				title="Radnici u izabranom salonu"
				listOfEmployees={props.employeeData}
				addForSelectedClassName={classes.addForSelected}
				editMode={editMode}
				selectedServiceProvider={formInput.serviceProviderId.value}
				checkedEmployees={checkedEmployees}
				setCheckedEmployees={setCheckedEmployees}
				emptyListMessage={'Izaberite salon'}
				tag="services"
			/>
			<Input
				type="button"
				value="dodaj"
				className={
					isMobile
						? [classes.ChoiceButton, classes.AddMob].join(' ')
						: [classes.ChoiceButton, classes.Add].join(' ')
				}
				display={isMobile ? 'none' : 'block'}
				marginBottom="20px"
				onClick={onSubmit}
			/>
			<Select
				displaySelect="block"
				className={isMobile ? classes.SelectServiceForEditMob : classes.SelectInputText}
				id={'myServices'}
				name={'myServices'}
				onChange={e => {
					inputChangedHandler(e, 'myServices', formInput, setFormInput),
						setServiceId(e.target.value),
						setEditMode(true);
				}}>
				<option value="Lista usluga" disabled selected>
					Lista usluga
				</option>
				{allServicesPreview()}
			</Select>
			<Input
				type="button"
				value="nastavi >>>"
				display={isMobile ? 'none' : 'block'}
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddServicesForm('none'), props.setDisplayWorkingTimeForm('block');
				}}
			/>
			<WrappedButtonsMob
				forward={() => {
					props.setDisplayAddServicesForm('none'), props.setDisplayWorkingTimeForm('block');
				}}
				save={onSubmit}
				isMobile={isMobile}
				displayForward="block"
				displaySave="block"
				displayAdd="none"
				displayStopEdit="none"
			/>
		</div>
	);
};

export default AddServicesForm;
