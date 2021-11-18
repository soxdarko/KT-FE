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

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesPicker from './EmployeesPicker';

import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from './SetupForms.module.scss';

const AddServicesForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [newServiceData, setNewServiceData] = useState({});

	const resetForm = () => {
		props.setServiceId(null), props.setServicesFormInput(props.initServicesForm);
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
		const api = addNewService(newServiceData, props.checkedEmployees)
			.then(response => {
				console.log(response), props.setIsLoading(false);
				props.setServicesFormInput(props.initServicesForm);
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
				props.setServicesFormInput(props.initServicesForm);
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
				Id: props.serviceId,
				Name: props.servicesFormInput.serviceName.value.trim(),
				Duration: parseInt(props.servicesFormInput.duration.value),
				Price:
					typeof props.servicesFormInput.price.value === 'string'
						? parseFloat(props.servicesFormInput.price.value.trim())
						: props.servicesFormInput.price.value,
				Employees: props.checkedEmployees,
				Description: props.servicesFormInput.description.value.trim(),
				Deleted: props.servicesFormInput.deleted,
			},
		];

		if (!props.servicesFormInput.serviceName.value.trim()) {
			updateValidity(props.setServicesFormInput, 'serviceName', props.servicesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.servicesFormInput.duration.value) {
			updateValidity(props.setServicesFormInput, 'duration', props.servicesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati dužinu trajanja usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (props.checkedEmployees.length === 0) {
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

	/* const allServicesPreview = () => {
		return props.servicesData.map(service => (
			<option key={service.id} value={service.id}>
				{service.name}
			</option>
		));
	}; */

	useEffect(() => {
		props.servicesData.filter(item => {
			if (item.id === props.serviceId) {
				props.setCheckedEmployees(item.employees);
				return props.setServicesFormInput({
					...props.servicesFormInput,
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
	}, [props.serviceId]);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

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
		<>
			<div style={{ display: props.displayAddServicesForm }} className={classes.AddForm}>
				<h3>Unesite usluge</h3>
				<Select
					name="serviceProviderId"
					className={classes.SelectInputText}
					value={props.servicesFormInput.serviceProviderId.value}
					onChange={e => {
						inputChangedHandler(
							e,
							'serviceProviderId',
							props.servicesFormInput,
							props.setServicesFormInput
						),
							props.setEditMode(false);
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
					value={props.servicesFormInput.serviceName.value}
					onChange={e =>
						inputChangedHandler(
							e,
							'serviceName',
							props.servicesFormInput,
							props.setServicesFormInput
						)
					}
					invalid={!props.servicesFormInput.serviceName.valid}
				/>
				<Input
					type="text"
					name="description"
					placeholder="Opis usluge"
					className={inputClassName}
					value={props.servicesFormInput.description.value}
					onChange={e =>
						inputChangedHandler(
							e,
							'description',
							props.servicesFormInput,
							props.setServicesFormInput
						)
					}
				/>
				<Select
					displaySelect="block"
					className={classes.SelectInputText}
					value={props.servicesFormInput.duration.value}
					name={'duration'}
					onChange={e =>
						inputChangedHandler(e, 'duration', props.servicesFormInput, props.setServicesFormInput)
					}>
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
					value={props.servicesFormInput.price.value}
					onChange={e =>
						inputChangedHandler(e, 'price', props.servicesFormInput, props.setServicesFormInput)
					}
				/>
				<EmployeesPicker
					title="Radnici u izabranom salonu"
					listOfEmployees={props.employeeData}
					addForSelectedClassName={classes.PickerCheckBox}
					editMode={props.editMode}
					selectedServiceProvider={props.servicesFormInput.serviceProviderId.value}
					checkedEmployees={props.checkedEmployees}
					setCheckedEmployees={props.setCheckedEmployees}
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
				{/* <Select
				displaySelect="block"
				className={isMobile ? classes.SelectServiceForEditMob : classes.SelectInputText}
				id={'myServices'}
				name={'myServices'}
				onChange={e => {
					inputChangedHandler(e, 'myServices', servicesFormInput, setServicesFormInput),
						setServiceId(e.target.value),
						setEditMode(true);
				}}>
				<option value="Lista usluga" disabled selected>
					Lista usluga
				</option>
				{allServicesPreview()}
			</Select> */}
				<Input
					type="button"
					value="nastavi >>>"
					display={isMobile ? 'none' : 'inline-block'}
					className={isMobile ? classes.ForwardMob : classes.Forward}
					onClick={() => {
						props.setDisplayAddServicesForm('none'), props.setDisplayWorkingTimeForm('block');
					}}
				/>
			</div>
			<WrappedButtonsMob
				forward={() => {
					props.setDisplayAddServicesForm('none'), props.setDisplayWorkingTimeForm('block');
				}}
				stopEdit={() => {
					props.setDisplayAddServicesForm('none'),
						props.setServicesFormInput(props.initServicesForm),
						props.setShowBackdrop(classes.backdropOut);
				}}
				save={onSubmit}
				isMobile={isMobile && props.displayAddServicesForm === 'block' ? true : false}
				displayForward={props.displayForward}
				displaySave="block"
				displayAdd="none"
				displayStopEdit={props.displayStopEdit}
			/>
		</>
	);
};

export default AddServicesForm;
