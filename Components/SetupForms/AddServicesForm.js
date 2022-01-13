import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	infoMessageHandler,
} from '../../helpers/universalFunctions';
import { saveServicesToManyEmployees } from '../../api/saveServicesToManyEmployees';
import initServicesForm from './initServicesForm';
import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesPicker from './EmployeesPicker';

import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from './SetupForms.module.scss';

const AddServicesForm = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [serviceData, setServiceData] = useState({});

	const duration = ['15', '30', '45', '60'];

	const durationList = () => {
		return duration.map((time, i) => (
			<option key={i} value={time}>
				{time}
			</option>
		));
	};

	const addServiceToManyHandler = () => {
		const api = saveServicesToManyEmployees(serviceData)
			.then(response => {
				console.log(response);
				props.getAllServicesHandler();
				props.resetForm();
				/* props.isSetupGuide ? props.setServicesFormInput(initServicesForm) : {}; */
				infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.triger);
				props.setShowBackdrop(classes.backdropOut);
				props.setDisplayAddServicesForm(props.isSetupGuide ? 'block' : 'none');
				props.setIsLoading(false);
			})
			.catch(error => {
				if (error.response) {
					console.log(error);
					/* error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					}); */
				} else if (error.request) {
					console.log(error.request);
					responseHandler(
						props.setShowResponseModal,
						'Došlo je do greške, kontaktirajte nas putem kontakt forme!',
						'red',
						'block',
						!props.triger
					);
				} else {
					console.log(error);
					responseHandler(
						props.setShowResponseModal,
						'Došlo je do greške, kontaktirajte nas putem kontakt forme!',
						'red',
						'block',
						!props.triger
					);
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}

		/* addServiceToManyHandler(); */
		addServiceToManyHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceData]);

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
				'Morate uneti naziv usluge!',
				'red',
				'block',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.servicesFormInput.duration.value) {
			updateValidity(props.setServicesFormInput, 'duration', props.servicesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate izabrati dužinu trajanja usluge!',
				'red',
				'block',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (props.checkedEmployees.length === 0) {
			responseHandler(
				props.setShowResponseModal,
				'Morate izabrati minimum jednog radnika!',
				'red',
				'block',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setServiceData(formData);
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

	/* Load data for edit in formInput state */
	useEffect(() => {
		props.servicesData.filter(item => {
			if (item.id === props.serviceId) {
				props.setCheckedEmployees(item.employees);
				return props.setServicesFormInput({
					...props.servicesFormInput,
					id: item.id,
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

	const displayForm = () => {
		if (props.userGuideStatus === 'Employees') {
			props.setDisplayGreeting('none');
			props.setDisplayAddServicesForm('block');
		} else {
			props.setDisplayAddServicesForm('none');
		}
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		displayForm();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function cancelAddServicePcHandler() {
		props.setServiceId(null);
		props.setCheckedEmployees([]);
		props.setFormInput(initServicesForm);
		props.setDisplayAddServicesForm('none');
		props.setEditMode(false);
		props.setShowBackdrop(classes.backdropOut);
	}

	function cancelAddServiceMobHandler() {
		props.setDisplayAddServicesForm('none');
		isMobile ? {} : props.setServicesFormInput(initServicesForm);
		props.setShowBackdrop(classes.backdropOut);
		props.setCheckedEmployees([]);
	}

	function forward() {
		props.setDisplayAddServicesForm('none');
		props.setDisplayWorkingTimeForm('block');
	}

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

	return (
		<>
			<div
				style={{ display: props.displayAddServicesForm }}
				className={[classes.Form, classes.FormLayout, classes.FormBlackBg].join(' ')}>
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
						);
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
					placeholder="Unesite naziv usluge"
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
					placeholder="Unesite opis usluge"
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
					placeholder="Unesite cenu usluge"
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
					displayEmployeesPicker={props.displayEmployeesPicker}
				/>
				<Input
					type="button"
					value={props.editMode ? 'Sačuvaj' : 'Dodaj'}
					className={
						isMobile
							? [classes.ChoiceButton, classes.AddMob].join(' ')
							: [classes.ChoiceButton, classes.Add].join(' ')
					}
					display={isMobile ? 'none' : 'block'}
					marginBottom="20px"
					onClick={onSubmit}
				/>
				<Input
					type="button"
					value="Odustani"
					display={props.displayCancel}
					color="red"
					className={isMobile ? classes.ForwardMob : classes.Forward}
					onClick={() => cancelAddServicePcHandler()}
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
					value="Nastavi >>>"
					display={props.displayForward}
					className={isMobile ? classes.ForwardMob : classes.Forward}
					onClick={() => forward()}
				/>
			</div>
			<WrappedButtonsMob
				forward={() => forward()}
				stopEdit={() => cancelAddServiceMobHandler()}
				save={onSubmit}
				isMobile={isMobile && props.displayAddServicesForm === 'block' ? true : false}
				displayForward={props.displayForwardMob}
				displaySave="block"
				displayAdd="none"
				displayStopEdit={props.displayStopEditMob}
				validation={props.validation}
			/>
		</>
	);
};

export default AddServicesForm;
