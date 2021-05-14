import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';
import initServiceProviderForm from './initServiceProviderForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import ServiceProvidersList from './ServiceProvidersList';

import classes from '../../Components/SetupForms/SetupForms.module.scss';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';
import TextArea from 'antd/lib/input/TextArea';

const AddServiceProvidersForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [serviceProviderInfo, setServiceProviderInfo] = useState([]);
	const [serviceProvidersList, setServiceProvidersList] = useState([]);
	const [serviceProviderId, setServiceProviderId] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [displayToolBox, setDisplayToolBox] = useState('none');

	const [formInput, setFormInput] = useState(initServiceProviderForm);

	const resetForm = () => {
		setServiceProviderId(null), setFormInput(initSaloonForm), setEditMode(false);
	};

	const getAllServiceProvidersHandler = async () => {
		const api = await getAllServiceProviders()
			.then(response => {
				const getServiceProviderData = response.data.map(serviceProvider => {
					return serviceProvider;
				});
				props.setServiceProviderData(getServiceProviderData);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		return api;
	};

	const addServiceProviderHandler = () => {
		const api = saveServiceProviders(serviceProviderInfo)
			.then(response => {
				console.log(response),
					props.setIsLoading(false),
					getAllServiceProvidersHandler(),
					setServiceProviderId(null),
					setFormInput(initServiceProviderForm);
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					/* error.response.data.map(err => {
						const Input = err.type[0].toLowerCase() + err.type.slice(1);
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						updateValidity(setFormInput, Input, formInput, '', false);
						props.setShowBackdrop(classes.backdropIn);
					}); */
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
		addServiceProviderHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceProviderInfo]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: serviceProviderId,
				Name: formInput.serviceProviderName.value.trim(),
				City: formInput.city.value.trim(),
				/* Informations: `Telefon: ${formInput.mobOperator.value}${formInput.phone.value.trim()}`, */
				Informations: formInput.informations.value,
			},
		];

		/* const numericPattern = /^\d+$/; */
		if (!formInput.serviceProviderName.value.trim()) {
			updateValidity(setFormInput, 'serviceProviderName', formInput, '', false);
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
		} else {
			setServiceProviderInfo(formData);
			setServiceProvidersList([...serviceProvidersList, formData.name]);
			props.setIsLoading(true);
		}
	};

	/* Load data for edit in formInput state */
	useEffect(() => {
		props.serviceProviderData.filter(item => {
			if (item.id === serviceProviderId) {
				/* const phoneNumber = item.informations.replace(/\D/g, ''); */
				/* console.log(item.informations.replace(/\D/g, '')); */
				/* const mobOperator = phoneNumber.substring(0, 3);
				const phone = phoneNumber.substring(3, phoneNumber.length); */
				return setFormInput({
					...formInput,
					serviceProviderName: {
						value: item.name,
						touched: false,
						valid: true,
					},
					city: {
						value: item.city,
						touched: false,
						valid: true,
					},
					informations: {
						value: item.informations,
					},
				});
			}
		});
	}, [serviceProviderId]);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const textAreaClassName = isMobile ? classes.InformationsInputMob : classes.InformationsInput;
	return (
		<div style={{ display: props.displayAddServiceProvidersForm }}>
			<h3>Unesite podatke salona</h3>
			<Input
				type="text"
				name="serviceProviderName"
				placeholder="Naziv salona"
				className={inputClassName}
				value={formInput.serviceProviderName.value}
				onChange={e => inputChangedHandler(e, 'serviceProviderName', formInput, setFormInput)}
				invalid={!formInput.serviceProviderName.valid}
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
			<TextArea
				name="informations"
				placeholder="Unesite informacije (adresa, telefon, e-mail, dodatne informacije...)"
				className={textAreaClassName}
				value={formInput.informations.value}
				/* minRows={4} */
				maxLength="500"
				onChange={e => inputChangedHandler(e, 'informations', formInput, setFormInput)}
			/>
			<Input
				type="button"
				value="dodaj"
				display={isMobile ? 'none' : 'block'}
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				onClick={onSubmit}
			/>
			<ServiceProvidersList
				serviceProviderData={props.serviceProviderData}
				addForSelectedClassName={classes.addForSelected}
				displayToolBox={displayToolBox}
				setDisplayToolBox={setDisplayToolBox}
				id={serviceProviderId}
				setId={setServiceProviderId}
				setEditMode={setEditMode}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				display={isMobile ? 'none' : 'block'}
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddServiceProvidersForm('none'), props.setDisplayAddEmployeeForm('block');
				}}
			/>
			<WrappedButtonsMob
				forward={() => {
					props.setDisplayAddServiceProvidersForm('none'), props.setDisplayAddEmployeeForm('block');
				}}
				save={onSubmit}
				isMobile={isMobile}
				displayForward="block"
				displaySave="block"
				displayAdd="none"
				displayStopEdit={editMode ? 'block' : 'none'}
				stopEdit={() => resetForm()}
			/>
		</div>
	);
};

export default AddServiceProvidersForm;
