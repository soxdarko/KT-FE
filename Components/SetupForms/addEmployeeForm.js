import { useState, useEffect, useRef } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	infoMessageHandler,
} from '../../helpers/universalFunctions';
import { saveEmployees } from '../../api/saveEmployees';
import { getAllEmployees } from '../../api/getAllEmployees';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesList from './EmployeesList';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from '../../Components/SetupForms/SetupForms.module.scss';

const addEmployeeForm = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [userData, setUserData] = useState({});
	const [displayToolBox, setDisplayToolBox] = useState('none');

	const inputValidityHandler = (object, message) => {
		updateValidity(props.setEmplyeesFormInput, object, props.emplyeesFormInput, '', false);
		responseHandler(props.setShowResponseModal, message, 'red', !props.triger);
		props.setShowBackdrop(classes.backdropIn);
	};

	const onChange = (e, object) => {
		inputChangedHandler(e, object, props.emplyeesFormInput, props.setEmplyeesFormInput);
	};

	const apiErrorHandler = (err, message) => {
		console.log(err);
		props.errorMessage(message);
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

	const getAllEmployeesHandler = async () => {
		const api = await getAllEmployees()
			.then(res => {
				const getEmployeesData = res.data.map(employee => {
					return employee;
				});
				props.setEmployeeData(getEmployeesData);
			})
			.catch(err => {
				if (err.response) {
					apiErrorHandler(err.response)
				} else if (err.request) {
					apiErrorHandler(err.request)
				} else {
					apiErrorHandler(err)
				}
			});
		return api;
	};

	const addEmployeesHandler = () => {
		const api = saveEmployees(userData)
			.then(res => {
				console.log(res);
				getAllEmployeesHandler();
				props.resetForm();
				infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.triger);
				props.setIsLoading(false);
			})
			.catch(err => {
				if (err.response) {
					apiErrorHandler(err.response)
				} else if (err.request) {
					apiErrorHandler(err.request)
				} else {
					apiErrorHandler(err)
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		addEmployeesHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: props.employeeId,
				Name: props.emplyeesFormInput.name.value.trim(),
				Phone:
					props.emplyeesFormInput.mobOperator.value + props.emplyeesFormInput.phone.value.trim(),
				Email: props.emplyeesFormInput.email.value.trim(),
				UserName: props.emplyeesFormInput.userName.value.trim(),
				Password: props.emplyeesFormInput.password.value.trim(),
				serviceProviderId: props.emplyeesFormInput.serviceProviderId.value,
			},
		];

		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!props.emplyeesFormInput.name.value.trim()) {
			inputValidityHandler('name', 'Morate uneti ime radnika!');
		} else if (
			!props.emplyeesFormInput.email.value.trim() ||
			!emailPattern.test(props.emplyeesFormInput.email.value)
		) {
			inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!');
		} else if (!props.emplyeesFormInput.mobOperator.value) {
			inputValidityHandler('mobOperator', 'Morate izabrati pozivni broj!');
		} else if (
			!props.emplyeesFormInput.phone.value.trim() ||
			!numericPattern.test(props.emplyeesFormInput.phone.value) ||
			props.emplyeesFormInput.phone.value.length < 6
		) {
			inputValidityHandler('phone', 'Morate uneti validan broj telefona!');
		} else if (!props.emplyeesFormInput.userName.value.trim()) {
			inputValidityHandler('userName', 'Morate uneti korisničko ime!');
		} else if (!props.emplyeesFormInput.password.value.trim() && !props.editMode) {
			inputValidityHandler('password', 'Morate uneti lozinku!');
		} else if (!props.emplyeesFormInput.passConfirm.value.trim() && !props.editMode) {
			inputValidityHandler('passConfirm', 'Morate uneti potvrdu izabrane lozinke!');
		} else if (
			props.emplyeesFormInput.password.value.trim() !==
			props.emplyeesFormInput.passConfirm.value.trim()
		) {
			inputValidityHandler('password', 'Lozinka i potvrda moraju biti jednake!');
		} else if (props.emplyeesFormInput.serviceProviderId.value === '') {
			inputValidityHandler(
				'serviceProviderId',
				'Morate izabrati salon za koji želite dodati radnika!'
			);
		} else {
			setUserData(formData);
			props.setIsLoading(true);
		}
	};

	/* Load data for edit in props.emplyeesFormInput state */
	useEffect(() => {
		props.employeeData.filter(item => {
			if (item.id === props.employeeId) {
				const mobOperator = item.phone.substring(0, 3);
				const phone = item.phone.substring(3, item.phone.length);
				return props.setEmplyeesFormInput({
					...props.emplyeesFormInput,
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
						value: item.userName /* Ovde ce ici item.userName */,
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
	}, [props.employeeId]);

	function forward() {
		props.setDisplayAddEmployeeForm('none');
		props.setDisplayAddServicesForm('block');
	}

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const readOnlyClassName = isMobile ? classes.ReadOnlyMob : classes.ReadOnly;
	return (
		<div
			style={{ display: props.displayAddEmployeeForm }}
			className={props.isSetupGuide ? '' : classes.AddForm}>
			<h3>Unesite radnike</h3>
			<Select
				name="serviceProviderId"
				className={classes.SelectInputText}
				value={props.emplyeesFormInput.serviceProviderId.value}
				invalid={!props.emplyeesFormInput.serviceProviderId.valid}
				onChange={e => onChange(e, 'serviceProviderId')}>
				<option value="" disabled selected hidden>
					Izaberite salon
				</option>
				{serviceProvidersPreview(props.serviceProviderData)}
			</Select>
			<Input
				type="text"
				name="name"
				placeholder="Unesite ime i prezime"
				className={inputClassName}
				value={props.emplyeesFormInput.name.value}
				onChange={e => onChange(e, 'name')}
				invalid={!props.emplyeesFormInput.name.valid}
			/>
			<Input
				type="text"
				name="userName"
				className={props.editMode ? readOnlyClassName : inputClassName}
				placeholder="Unesite korisničko ime"
				value={props.emplyeesFormInput.userName.value}
				maxLength="50"
				onChange={e => onChange(e, 'userName')}
				invalid={!props.emplyeesFormInput.userName.valid}
			/>
			<Input
				type="text"
				name="email"
				placeholder="Unesite  e-mail adresu"
				className={inputClassName}
				value={props.emplyeesFormInput.email.value}
				onChange={e => onChange(e, 'email')}
				invalid={!props.emplyeesFormInput.email.valid}
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value={props.emplyeesFormInput.mobOperator.value}
				onChange={e => onChange(e, 'mobOperator')}
				invalid={!props.emplyeesFormInput.mobOperator.valid}>
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
				value={props.emplyeesFormInput.phone.value}
				onChange={e => onChange(e, 'phone')}
				invalid={!props.emplyeesFormInput.phone.valid}
			/>
			<Input
				type="password"
				name="password"
				className={inputClassName}
				placeholder="Izaberite lozinku"
				value={props.emplyeesFormInput.password.value}
				maxLength="50"
				onChange={e => onChange(e, 'password')}
				invalid={!props.emplyeesFormInput.password.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Ponovo unseite lozinku"
				value={props.emplyeesFormInput.passConfirm.value}
				maxLength="50"
				onChange={e => onChange(e, 'passConfirm')}
				invalid={!props.emplyeesFormInput.passConfirm.valid}
			/>
			<Input
				type="button"
				value={props.editMode ? 'Sačuvaj' : 'Dodaj'}
				display={isMobile ? 'none' : 'block'}
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				onClick={onSubmit}
			/>
			<EmployeesList
				listOfEmployees={props.employeeData}
				addForSelectedClassName={classes.addForSelected}
				id={props.employeeId}
				setId={props.setEmployeeId}
				selectedServiceProvider={props.emplyeesFormInput.serviceProviderId.value}
				setEditMode={props.setEditMode}
				displayToolBox={displayToolBox}
				setDisplayToolBox={setDisplayToolBox}
				emptyListMessage={'Izaberite salon'}
			/>
			<Input
				type="button"
				value="Nastavi >>>"
				display={props.displayForward}
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => forward()}
			/>
			<Input
				type="button"
				value="Odustani"
				display={props.displayStopEdit}
				color="red"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => props.resetForm()}
			/>
			<WrappedButtonsMob
				forward={() => forward()}
				save={onSubmit}
				isMobile={isMobile}
				displayForward={props.displayForwardMob}
				displaySave="block"
				displayAdd="none"
				displayStopEdit={props.displayStopEditMob}
				stopEdit={() => props.resetForm()}
				validation={true}
			/>
		</div>
	);
};

export default addEmployeeForm;
