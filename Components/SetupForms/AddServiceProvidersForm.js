import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
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
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [displayToolBox, setDisplayToolBox] = useState('none');

	const resetForm = () => {
		props.setServiceProviderId(null),
			props.setServProvFormInput(props.initServiceProviderForm),
			props.setEditMode(false);
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
		const api = saveServiceProviders(props.serviceProviderInfo)
			.then(response => {
				console.log(response),
					props.setIsLoading(false),
					getAllServiceProvidersHandler(),
					props.setServiceProviderId(null),
					props.setServProvFormInput(props.initServiceProviderForm);
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					/* error.response.data.map(err => {
						const Input = err.type[0].toLowerCase() + err.type.slice(1);
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						updateValidity(props.setServProvFormInput, Input, props.servProvFormInput, '', false);
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
			updateValidity(
				props.setServProvFormInput,
				'serviceProviderName',
				props.servProvFormInput,
				'',
				false
			);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv salona!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.servProvFormInput.city.value.trim()) {
			updateValidity(props.setServProvFormInput, 'city', props.servProvFormInput, '', false);
			responseHandler(props.setShowResponseModal, modalAnimation, 'Morate uneti grad!', 'red');
			props.setShowBackdrop(classes.backdropIn);
		} else {
			props.setServiceProviderInfo(formData);
			props.setServiceProvidersList([...props.serviceProvidersList, formData.name]);
			props.setIsLoading(true);
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
				value={props.servProvFormInput.serviceProviderName.value}
				onChange={e =>
					inputChangedHandler(
						e,
						'serviceProviderName',
						props.servProvFormInput,
						props.setServProvFormInput
					)
				}
				invalid={!props.servProvFormInput.serviceProviderName.valid}
			/>
			<Input
				type="text"
				name="city"
				placeholder="Grad"
				className={inputClassName}
				value={props.servProvFormInput.city.value}
				onChange={e =>
					inputChangedHandler(e, 'city', props.servProvFormInput, props.setServProvFormInput)
				}
				invalid={!props.servProvFormInput.city.valid}
			/>
			<TextArea
				name="informations"
				placeholder="Unesite informacije (adresa, telefon, e-mail, dodatne informacije...)"
				className={textAreaClassName}
				value={props.servProvFormInput.informations.value}
				/* minRows={4} */
				maxLength="500"
				onChange={e =>
					inputChangedHandler(
						e,
						'informations',
						props.servProvFormInput,
						props.setServProvFormInput
					)
				}
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
				id={props.serviceProviderId}
				setId={props.setServiceProviderId}
				setEditMode={props.setEditMode}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				display={isMobile ? 'none' : 'inline-block'}
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
