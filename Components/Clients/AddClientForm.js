import { useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
import { addOrUpdateNewClient } from '../../api/addOrUpdateNewClient';
import { getClients } from '../../api/getClients';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const addClientForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;

	const getClientsHandler = async () => {
		const api = await getClients()
			.then(response => {
				const getClientsData = response.data.map(client => {
					return client;
				});
				props.setClientData(getClientsData);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo getClients');
				}
			});
		return api;
	};

	const errorMessage = () => {
		responseHandler(
			props.setShowResponseModal,
			modalAnimation,
			'Došlo je do greške, pokušajte ponovo!',
			'red'
		);
	};

	const addClientHandler = () => {
		const api = addOrUpdateNewClient(props.userData)
			.then(response => {
				console.log(response);
				getClientsHandler();
				props.setIsLoading(false);
				props.resetForm();
				props.setDisplayInfoModal(props.modalAnimationIn);
			})
			.catch(error => {
				if (error.response) {
					props.setShowBackdrop(classes.backdropIn);
					console.log(error.response);
					errorMessage();
					props.setIsLoading(false);
				} else if (error.request) {
					props.setShowBackdrop(classes.backdropIn);
					errorMessage();
					console.log(error.request);
					props.setIsLoading(false);
				} else {
					props.setShowBackdrop(classes.backdropIn);
					errorMessage();
					console.log('nesto drugo');
					props.setIsLoading(false);
				}
			});
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addClientHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.userData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			Id: props.clientId,
			Name: props.formInput.name.value.trim(),
			Phone: props.formInput.mobOperator.value + props.formInput.phone.value.trim(),
			Email: props.formInput.email.value.trim(),
			Description: props.formInput.description.value.trim(),
		};
		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!props.formInput.name.value.trim()) {
			updateValidity(props.setFormInput, 'name', props.formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti ime klijenta!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			!props.formInput.email.value.trim() ||
			!emailPattern.test(props.formInput.email.value)
		) {
			updateValidity(props.setFormInput, 'email', props.formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti validnu e-mail adresu!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.formInput.mobOperator.value) {
			updateValidity(props.setFormInput, 'mobOperator', props.formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati pozivni broj!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			!props.formInput.phone.value.trim() ||
			!numericPattern.test(props.formInput.phone.value) ||
			props.formInput.phone.value.length < 6
		) {
			updateValidity(props.setFormInput, 'phone', props.formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti validan broj telefona!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			props.setUserData(formData);
			props.setIsLoading(true);
		}
	};

	/* Load data for edit in formInput state */
	useEffect(() => {
		props.clientsData.filter(item => {
			if (item.id === props.clientId) {
				const mobOperator = item.phone.substring(0, 3);
				const phone = item.phone.substring(3, item.phone.length);
				return props.setFormInput({
					...props.formInput,
					name: {
						value: item.name,
						touched: false,
						valid: true,
					},
					email: {
						value: item.email,
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
					description: {
						value: item.description,
						touched: false,
						valid: true,
					},
					id: {
						value: item.id,
						touched: false,
						valid: true,
					},
				});
			}
		});
	}, [props.clientId]);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const readOnlyClassName = isMobile ? classes.ReadOnlyMob : classes.ReadOnly;
	return (
		<>
			<div style={{ display: props.displayAddClientForm }} className={classes.AddForm}>
				<h3>Unesite klijente</h3>
				{/* <Select
				name="serviceProviderId"
				className={classes.SelectInputText}
				value={formInput.serviceProviderId.value}
				invalid={!formInput.serviceProviderId.valid}
				onChange={e => inputChangedHandler(e, 'serviceProviderId', formInput, setFormInput)}>
				<option value="" disabled selected hidden>
					Izaberite salon
				</option>
				{serviceProvidersPreview(props.serviceProviderData)}
			</Select> */}
				<Input
					type="text"
					name="name"
					placeholder="Unesite ime i prezime"
					className={inputClassName}
					value={props.formInput.name.value}
					onChange={e => inputChangedHandler(e, 'name', props.formInput, props.setFormInput)}
					invalid={!props.formInput.name.valid}
				/>
				<Input
					type="text"
					name="email"
					placeholder="Unesite  e-mail adresu"
					className={inputClassName}
					value={props.formInput.email.value}
					onChange={e => inputChangedHandler(e, 'email', props.formInput, props.setFormInput)}
					invalid={!props.formInput.email.valid}
				/>
				<Select
					name="mobOperator"
					className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
					display="inline-block"
					value={props.formInput.mobOperator.value}
					onChange={e => inputChangedHandler(e, 'mobOperator', props.formInput, props.setFormInput)}
					invalid={!props.formInput.mobOperator.valid}>
					<option value="" disabled selected>
						06x
					</option>
					<option value="060">060</option>
					<option value="061">061</option>
					<option value="062">062</option>
					<option value="063">063</option>
					<option value="064">064</option>
					<option value="065">065</option>
					<option value="066">066</option>
					<option value="0677">0677</option>
					<option value="0678">0678</option>
					<option value="069">069</option>
				</Select>
				<Input
					type="number"
					name="phone"
					className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
					placeholder="Unesite broj telefona"
					maxLength="7"
					value={props.formInput.phone.value}
					onChange={e => inputChangedHandler(e, 'phone', props.formInput, props.setFormInput)}
					invalid={!props.formInput.phone.valid}
				/>
				<Input
					type="text"
					name="description"
					placeholder="Dodatne informacije"
					className={inputClassName}
					value={props.formInput.description.value}
					onChange={e => inputChangedHandler(e, 'description', props.formInput, props.setFormInput)}
				/>
				<Input
					type="button"
					value="dodaj"
					display={isMobile ? 'none' : 'block'}
					className={[classes.ChoiceButton, classes.Add].join(' ')}
					onClick={onSubmit}
				/>
				<Input
					type="button"
					value="odustani"
					display={isMobile ? 'none' : 'inline-block'}
					color="red"
					className={isMobile ? classes.ForwardMob : classes.Forward}
					onClick={() => {
						props.setDisplayAddClientForm('none'), props.setShowBackdrop(classes.backdropOut);
					}}
				/>
			</div>
			<WrappedButtonsMob
				display={props.displayAddClientForm}
				save={onSubmit}
				isMobile={props.displayWrappedButtonsMob(props.displayAddClientForm)}
				displayForward="none"
				displaySave="block"
				displayAdd="none"
				displayStopEdit="block"
				stopEdit={() => {
					props.setDisplayAddClientForm('none'),
						props.setShowBackdrop(classes.backdropOut),
						props.setEditMode(false),
						props.resetForm();
				}}
			/>
		</>
	);
};

export default addClientForm;
