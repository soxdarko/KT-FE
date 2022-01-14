import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	infoMessageHandler,
} from '../../helpers/universalFunctions';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';

import Input from '../UI/Forms/Input';
import ServiceProvidersList from './ServiceProvidersList';

import classes from '../../Components/SetupForms/SetupForms.module.scss';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';
import TextArea from 'antd/lib/input/TextArea';

const AddServiceProvidersForm = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [displayToolBox, setDisplayToolBox] = useState('none');

	const resetForm = () => {
		props.setServiceProviderId(null);
		props.setServProvFormInput(props.initServiceProviderForm);
		props.setEditMode(false);
	};

	const inputValidityHandler = (object, message) => {
		updateValidity(props.setServProvFormInput, object, props.servProvFormInput, '', false);
		responseHandler(props.setShowResponseModal, message, 'red', !props.triger);
		props.setShowBackdrop(classes.backdropIn);
	};

	const onChange = (e, object) => {
		inputChangedHandler(e, object, props.servProvFormInput, props.setServProvFormInput);
	};

	const apiErrorHandler = error => {
		console.log(error);
		props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
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
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					apiErrorHandler(error.request);
				} else {
					apiErrorHandler(error);
				}
			});
		return api;
	};

	const addServiceProviderHandler = () => {
		const api = saveServiceProviders(props.serviceProviderInfo)
			.then(response => {
				console.log(response);
				getAllServiceProvidersHandler();
				infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.triger);
				props.setIsLoading(true);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					apiErrorHandler(error.request);
				} else {
					apiErrorHandler(error);
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		addServiceProviderHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.serviceProviderInfo]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: props.serviceProviderId,
				Name: props.servProvFormInput.serviceProviderName.value.trim(),
				City: props.servProvFormInput.city.value.trim(),
				/* Informations: `Telefon: ${props.servProvFormInput.mobOperator.value}${props.servProvFormInput.phone.value.trim()}`, */
				Informations: props.servProvFormInput.informations.value,
			},
		];

		/* const numericPattern = /^\d+$/; */
		if (!props.servProvFormInput.serviceProviderName.value.trim()) {
			inputValidityHandler('serviceProviderName', 'Morate uneti naziv salona!');
		} else if (!props.servProvFormInput.city.value.trim()) {
			inputValidityHandler('city', 'Morate uneti grad!');
		} else {
			props.setServiceProviderInfo(formData);
			props.setServiceProvidersList([...props.serviceProvidersList, formData.name]);
		}
	};

	/* Load data for edit in props.servProvFormInput state */
	useEffect(() => {
		props.serviceProviderData.filter(item => {
			if (item.id === props.serviceProviderId) {
				/* const phoneNumber = item.informations.replace(/\D/g, ''); */
				/* console.log(item.informations.replace(/\D/g, '')); */
				/* const mobOperator = phoneNumber.substring(0, 3);
				const phone = phoneNumber.substring(3, phoneNumber.length); */
				return props.setServProvFormInput({
					...props.servProvFormInput,
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
	}, [props.serviceProviderId]);

	function forward() {
		props.setDisplayAddServiceProvidersForm('none');
		props.setDisplayAddEmployeeForm('block');
	}

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const textAreaClassName = isMobile ? classes.InformationsInputMob : classes.InformationsInput;
	return (
		<div
			style={{ display: props.displayAddServiceProvidersForm }}
			className={props.isSetupGuide ? '' : classes.AddForm}>
			<h3>Unesite podatke salona</h3>
			<Input
				type="text"
				name="serviceProviderName"
				placeholder="Naziv salona"
				className={inputClassName}
				value={props.servProvFormInput.serviceProviderName.value}
				onChange={e => onChange(e, 'serviceProviderName')}
				invalid={!props.servProvFormInput.serviceProviderName.valid}
			/>
			<Input
				type="text"
				name="city"
				placeholder="Grad"
				className={inputClassName}
				value={props.servProvFormInput.city.value}
				onChange={e => onChange(e, 'city')}
				invalid={!props.servProvFormInput.city.valid}
			/>
			<TextArea
				name="informations"
				placeholder="Unesite informacije (adresa, telefon, e-mail, dodatne informacije...)"
				className={textAreaClassName}
				value={props.servProvFormInput.informations.value}
				/* minRows={4} */
				maxLength="500"
				onChange={e => onChange(e, 'informations')}
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
				displayToolBox={displayToolBox}
				setDisplayToolBox={setDisplayToolBox}
				id={props.serviceProviderId}
				setId={props.setServiceProviderId}
				setEditMode={props.setEditMode}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				display={isMobile ? 'none' : 'inline-block'}
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => forward()}
			/>
			<WrappedButtonsMob
				forward={() => forward()}
				save={onSubmit}
				isMobile={isMobile}
				displayForward="inline-block"
				displaySave="block"
				displayAdd="none"
				displayStopEdit={props.editMode ? 'block' : 'none'}
				stopEdit={() => resetForm()}
			/>
		</div>
	);
};

export default AddServiceProvidersForm;
