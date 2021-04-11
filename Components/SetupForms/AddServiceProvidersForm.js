import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';
import initSaloonForm from './initSaloonForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import ServiceProvidersList from './ServiceProvidersList';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const AddServiceProvidersForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [serviceProviderInfo, setServiceProviderInfo] = useState([]);
	const [serviceProvidersList, setServiceProvidersList] = useState([]);
	const [serviceProviderId, setServiceProviderId] = useState(null);

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
					setFormInput(initSaloonForm);
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
				Name: formInput.saloonName.value.trim(),
				City: formInput.city.value.trim(),
				Address: formInput.address.value.trim(),
				Informations: `Telefon: ${formInput.mobOperator.value}${formInput.phone.value.trim()}`,
			},
		];

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
			setServiceProviderInfo(formData);
			setServiceProvidersList([...serviceProvidersList, formData.name]);
			props.setIsLoading(true);
		}
	};

	/* Load data for edit in formInput state */
	useEffect(() => {
		props.serviceProviderData.filter(item => {
			if (item.id === serviceProviderId) {
				const informations = item.informations;
				const phoneNumber = informations.substring(informations.indexOf(':') + 1).trim();
				const mobOperator = phoneNumber.substring(0, 3);
				const phone = phoneNumber.substring(3, phoneNumber.length);
				return setFormInput({
					...formInput,
					saloonName: {
						value: item.name,
						touched: false,
						valid: true,
					},
					city: {
						value: item.city,
						touched: false,
						valid: true,
					},
					address: {
						value: item.address,
						touched: false,
						valid: true,
					},
					mobOperator: {
						value: mobOperator,
						touched: false,
						valid: true,
					},
					phone: {
						value: phone,
						touched: false,
						valid: true,
					},
				});
			}
		});
	}, [serviceProviderId]);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	return (
		<div style={{ display: props.displayAddServiceProvidersForm }}>
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
				<option value="--" disabled defaultValue>
					--
				</option>
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
			<ServiceProvidersList
				serviceProviderData={props.serviceProviderData}
				addForSelectedClassName={classes.addForSelected}
				id={serviceProviderId}
				setId={setServiceProviderId}
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayAddServiceProvidersForm('none'), props.setDisplayAddEmployeeForm('block');
				}}
			/>
		</div>
	);
};

export default AddServiceProvidersForm;
