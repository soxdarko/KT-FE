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
			.then(response => {
				const getEmployeesData = response.data.map(employee => {
					return employee;
				});
				props.setEmployeeData(getEmployeesData);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		return api;
	};

	const addEmployeesHandler = () => {
		const api = saveEmployees(userData)
			.then(response => {
				console.log(response);
				getAllEmployeesHandler();
				props.resetForm();
				infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.triger);
			})
			.catch(error => {
				if (error.response) {
					error.response.data.map(err => {
						console.log(error.response);
						error.response.data.map(err => {
							props.errorMessage(err.errorMessage);
						});
					});
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
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
			updateValidity(props.setEmplyeesFormInput, 'name', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti ime radnika!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			!props.emplyeesFormInput.email.value.trim() ||
			!emailPattern.test(props.emplyeesFormInput.email.value)
		) {
			updateValidity(props.setEmplyeesFormInput, 'email', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti validnu e-mail adresu!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.emplyeesFormInput.mobOperator.value) {
			updateValidity(props.setEmplyeesFormInput, 'mobOperator', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate izabrati pozivni broj!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			!props.emplyeesFormInput.phone.value.trim() ||
			!numericPattern.test(props.emplyeesFormInput.phone.value) ||
			props.emplyeesFormInput.phone.value.length < 6
		) {
			updateValidity(props.setEmplyeesFormInput, 'phone', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti validan broj telefona!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.emplyeesFormInput.userName.value.trim()) {
			updateValidity(props.setEmplyeesFormInput, 'userName', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti korisničko ime!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.emplyeesFormInput.password.value.trim() && !props.editMode) {
			updateValidity(props.setEmplyeesFormInput, 'password', props.emplyeesFormInput, '', false);
			responseHandler(props.setShowResponseModal, 'Morate uneti lozinku!', 'red', !props.triger);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!props.emplyeesFormInput.passConfirm.value.trim() && !props.editMode) {
			updateValidity(props.setEmplyeesFormInput, 'passConfirm', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Morate uneti potvrdu izabrane lozinke!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (
			props.emplyeesFormInput.password.value.trim() !==
			props.emplyeesFormInput.passConfirm.value.trim()
		) {
			updateValidity(props.setEmplyeesFormInput, 'password', props.emplyeesFormInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				'Lozinka i potvrda moraju biti jednake!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (props.emplyeesFormInput.serviceProviderId.value === '') {
			updateValidity(
				props.setEmplyeesFormInput,
				'serviceProviderId',
				props.emplyeesFormInput,
				'',
				false
			);
			responseHandler(
				props.setShowResponseModal,
				'Morate izabrati salon za koji želite dodati radnika!',
				'red',
				!props.triger
			);
			props.setShowBackdrop(classes.backdropIn);
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
				onChange={e =>
					inputChangedHandler(
						e,
						'serviceProviderId',
						props.emplyeesFormInput,
						props.setEmplyeesFormInput
					)
				}>
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
				onChange={e =>
					inputChangedHandler(e, 'name', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
				invalid={!props.emplyeesFormInput.name.valid}
			/>
			<Input
				type="text"
				name="userName"
				className={props.editMode ? readOnlyClassName : inputClassName}
				placeholder="Unesite korisničko ime"
				value={props.emplyeesFormInput.userName.value}
				maxLength="50"
				onChange={e =>
					inputChangedHandler(e, 'userName', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
				invalid={!props.emplyeesFormInput.userName.valid}
			/>
			<Input
				type="text"
				name="email"
				placeholder="Unesite  e-mail adresu"
				className={inputClassName}
				value={props.emplyeesFormInput.email.value}
				onChange={e =>
					inputChangedHandler(e, 'email', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
				invalid={!props.emplyeesFormInput.email.valid}
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value={props.emplyeesFormInput.mobOperator.value}
				onChange={e =>
					inputChangedHandler(e, 'mobOperator', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
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
				onChange={e =>
					inputChangedHandler(e, 'phone', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
				invalid={!props.emplyeesFormInput.phone.valid}
			/>
			<Input
				type="password"
				name="password"
				className={inputClassName}
				placeholder="Izaberite lozinku"
				value={props.emplyeesFormInput.password.value}
				maxLength="50"
				onChange={e =>
					inputChangedHandler(e, 'password', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
				invalid={!props.emplyeesFormInput.password.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Ponovo unseite lozinku"
				value={props.emplyeesFormInput.passConfirm.value}
				maxLength="50"
				onChange={e =>
					inputChangedHandler(e, 'passConfirm', props.emplyeesFormInput, props.setEmplyeesFormInput)
				}
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
