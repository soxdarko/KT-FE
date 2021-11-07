import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
} from '../../helpers/universalFunctions';
/* import { saveEmployees } from '../../api/saveEmployees';
import { getAllEmployees } from '../../api/getAllEmployees'; */
import { addOrUpdateNewClient } from '../../api/addOrUpdateNewClient';
import initClientForm from './initClientForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesList from '../SetupForms/EmployeesList';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const addClientForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [userData, setUserData] = useState({});
	const [clientId, setClientId] = useState(null);
	const [editMode, setEditMode] = useState(false);

	const [formInput, setFormInput] = useState(initClientForm);

	const resetForm = () => {
		setClientId(null), setFormInput(initClientForm), setEditMode(false);
	};

	const displayWrappedButtonsMob = () => {
		if (isMobile && props.displayAddClientForm === 'block') {
			return true;
		} else return false;
	};

	const addClientHandler = () => {
		const api = addOrUpdateNewClient(userData)
			.then(response => {
				console.log(response), props.setIsLoading(false), resetForm();
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
		addClientHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: clientId,
				Name: formInput.name.value.trim(),
				Phone: formInput.mobOperator.value + formInput.phone.value.trim(),
				Email: formInput.email.value.trim(),
			},
		];

		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!formInput.name.value.trim()) {
			updateValidity(setFormInput, 'name', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti ime klijenta!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			updateValidity(setFormInput, 'email', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti validnu e-mail adresu!',
				'red'
			);
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
			setUserData(formData);
			props.setIsLoading(true);
		}
	};

	/* Load data for edit in formInput state */
	/* useEffect(() => {
		props.employeeData.filter(item => {
			if (item.id === employeeId) {
				const mobOperator = item.phone.substring(0, 3);
				const phone = item.phone.substring(3, item.phone.length);
				return setFormInput({
					...formInput,
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
					userName: {
						value: item.userName,
						touched: false,
						valid: true,
					},
					serviceProviderId: {
						value: item.serviceProviderId,
						touched: false,
						valid: true,
					},
				});
			}
		});
	}, [employeeId]); */

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
					value={formInput.name.value}
					onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
					invalid={!formInput.name.valid}
				/>
				<Input
					type="text"
					name="email"
					placeholder="Unesite  e-mail adresu"
					className={inputClassName}
					value={formInput.email.value}
					onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
					invalid={!formInput.email.valid}
				/>
				<Select
					name="mobOperator"
					className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
					display="inline-block"
					value={formInput.mobOperator.value}
					onChange={e => inputChangedHandler(e, 'mobOperator', formInput, setFormInput)}
					invalid={!formInput.mobOperator.valid}>
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
					value={formInput.phone.value}
					onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
					invalid={!formInput.phone.valid}
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
				style={{ display: props.displayAddClientForm }}
				forward={() => {
					props.setDisplayAddClientForm('none'), props.setShowBackdrop(classes.backdropOut);
				}}
				save={onSubmit}
				isMobile={displayWrappedButtonsMob()}
				displayForward="none"
				displaySave="block"
				displayAdd="none"
				displayStopEdit={editMode ? 'block' : 'none'}
				stopEdit={() => {
					resetForm(),
						props.setDisplayAddClientForm('none'),
						props.setShowBackdrop(classes.backdropOut);
				}}
			/>
		</>
	);
};

export default addClientForm;
