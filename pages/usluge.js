import { useState } from 'react';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import { getAllServices } from '../api/getAllServices';
import { getSettingsServices } from '../api/getSettingsServices';
import { saveSettingsServices } from '../api/saveSettingsServices';
import { deleteService } from '../api/deleteService';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import initServicesForm from '../Components/SetupForms/initServicesForm';
import Backdrop from '../Components/UI/Backdrop';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ServicesList from '../Components/Services/ServicesList';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WrappedTools from '../Components/UI/WrappedTools';
import ServiceSettingsForm from '../Components/Services/ServiceSettingsForm';
import ServiceDescription from '../Components/UI/Forms/ServiceDescription';
import Loader from '../Components/UI/Loader';
import ServiceSettings from '../Components/UI/Forms/ServiceSettings';

import classes from '../Components/Navigation/Navigation.module.scss';

const Services = props => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
	const [isLoading, setIsLoading] = useState(false);
	const [formInput, setFormInput] = useState(initServicesForm);
	const [servicesData, setServicesData] = useState(props.services);
	const [serviceSettings, setServiceSettings] = useState(props.serviceSettings);
	const [serviceSettingsData, setServiceSettingsData] = useState({});
	const [serviceId, setServiceId] = useState(null);
	const [checkedEmployees, setCheckedEmployees] = useState([]);
	const [displayDescription, setDisplayDescription] = useState('none');
	const [serviceDescriptionData, setServiceDescriptionData] = useState(null);
	const [descriptionEdit, setDescriptionEdit] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [dipslaySerachBar, setDipslaySerachBar] = useState('none');
	const [displayServiceSettings, setDisplayServiceSettings] = useState('none');
	const [searchInput, setSearchInput] = useState('');
	const [messageHandler, setMessageHandler] = useState('Uspešno sačuvano!');
	const [showInfoModal, setShowInfoModal] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState({
		triger: false,
		message: 'Da li ste sigurni da želite ukloniti uslugu sa liste?',
	});
	const [showResponseModal, setShowResponseModal] = useState({
		triger: false,
		message: null,
		border: '',
		triger: false,
	});
	const [holdBackdrop, setHoldBackdrop] = useState(true);

	const displayWrappedButtonsMob = condition => {
		if (isMobile && condition === 'block') {
			return true;
		} else return false;
	};

	const resetForm = () => {
		if (descriptionEdit) {
			return;
		} else {
			isMobile ? {} : setServiceId(null);
			setEditMode(false);
		}
	};

	const errorMessage = message => {
		responseHandler(setShowResponseModal, modalAnimationIn, message, 'red');
		setShowBackdrop(classes.backdropIn);
	};

	const saveSettingsServicesHandler = async () => {
		const api = await saveSettingsServices(serviceSettingsData)
			.then(response => {
				console.log(response);
				setDisplayServiceSettings('none');
				completnessMessageHandler('Uspešno sačuvano');
				getServiceSettingsHandler();
			})
			.catch(error => {
				!holdBackdrop ? setHoldBackdrop(true) : {};
				if (error.response) {
					console.log(error);
					/* error.response.data.map(err => {
						errorMessage(err.errorMessage);
					}); */
				} else if (error.request) {
					console.log(error.request);
					errorMessage('Došlo je do greške, pokušajte ponovo');
				} else {
					console.log(error);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		api;
	};

	const deleteServiceHandler = async () => {
		const api = await deleteService(serviceId)
			.then(response => {
				console.log(response);
				getAllServicesHandler();
				setDisplayWrappedTools('none');
				resetForm();
				setShowInfoModal(!showInfoModal);
			})
			.catch(error => {
				!holdBackdrop ? setHoldBackdrop(true) : {};
				if (error.response) {
					console.log(error);
					error.response.data.map(err => {
						errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					errorMessage('Došlo je do greške, pokušajte ponovo');
				} else {
					console.log(error);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		api;
	};

	const getAllServicesHandler = async () => {
		const api = await getAllServices()
			.then(response => {
				console.log(response);
				const serviceSettings = response.data.map(service => {
					return service;
				});
				setServicesData(serviceSettings);
			})
			.catch(error => {
				setHoldBackdrop(false);
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		return api;
	};

	const getServiceSettingsHandler = async () => {
		const api = await getSettingsServices()
			.then(response => {
				const getServiceSettingsData = response.data.map(setting => {
					return setting;
				});
				setServiceSettings(getServiceSettingsData);
			})
			.catch(error => {
				setHoldBackdrop(false);
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		return api;
	};

	function confirmModalSubmitHandler() {
		deleteServiceHandler(serviceId);
		setShowBackdrop(classes.backdropOut);
		setDisplayWrappedTools('none');
	}
	function confirmModalCancelHandler() {
		setServiceId(null);
		setShowBackdrop(classes.backdropOut);
	}
	function newServiceHandler() {
		setDisplayAddServicesForm('block');
		setShowBackdrop(classes.backdropIn);
		setFormInput(initServicesForm);
	}
	function editServiceHandler() {
		setDisplayAddServicesForm('block');
		setEditMode(true);
	}

	return (
		<>
			<Head>
				<title>KlikTermin | Lista usluga</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout
				displayLoginBtn="none"
				displayRegisterBtn="none"
				displayToolbarNavBtn="none"
				displayToolbarBookingBtn="none"
				displaySelect="none"
				displayNotifLabel="block"
				colorServicesIcon="#fc9815"
				classNameCal={classes.sideDrawerButtonActive}
				classNameClients={classes.sideDrawerButton}
				classNameServices={classes.sideDrawerButton}
				classNameProfile={classes.sideDrawerButton}
				classNameEmployeeSelect={classes.EmployeeSelect}
				selectData={props.employees}
				sms="10"
				license="5"
			/>
			<Loader loading={isLoading} />
			<Backdrop backdropAnimation={showBackdrop} />
			<InfoModal message={messageHandler} showInfoModal={showInfoModal} borderColor="green" />
			<ConfirmModal
				message="Da li ste sigurni da želite obrisati uslugu?"
				submitValue="Obriši"
				borderColor="yellow"
				onSubmit={() => confirmModalSubmitHandler()}
				onCancel={() => confirmModalCancelHandler()}
			/>
			<ResponseModal
				showResponseModal={showResponseModal}
				resetForm={resetForm}
				setShowBackdrop={setShowBackdrop}
				holdBackdrop={holdBackdrop}
				displayLinkButton="none"
				displayFormButton="block"
				setIsLoading={setIsLoading}
			/>
			<WrappedTools
				displayWrappedTools={displayWrappedTools}
				setDisplayWrappedTools={setDisplayWrappedTools}
				setDisplayDescription={setDisplayDescription}
				setShowBackdrop={setShowBackdrop}
				descriptionEdit={descriptionEdit}
				setDescriptionEdit={setDescriptionEdit}
				setShowConfirmModal={setShowConfirmModal}
				setFormInput={setFormInput}
				setDataId={setServiceId}
				isEmployeesArray={true}
				setCheckedEmployees={setCheckedEmployees}
				initForm={initServicesForm}
				setEditMode={setEditMode}
				onClickEdit={() => editServiceHandler()}
				className={[classes.WrappedToolsContainer, classes.WrappedToolsWithChkBox].join(' ')}
				displayWrappedToolsChkBox="flex">
				<ServiceSettingsForm
					serviceSettings={serviceSettings}
					serviceSettingsData={serviceSettingsData}
					setServiceSettingsData={setServiceSettingsData}
					serviceId={serviceId}
					saveSettingsServicesHandler={saveSettingsServicesHandler}
				/>
			</WrappedTools>
			<ServiceSettings
				addForSelectedClassName={classes.addForSelectedService}
				display={displayServiceSettings}
				serviceId={serviceId}
				setDisplayServiceSettings={setDisplayServiceSettings}
				initServiceSettings={serviceSettings}
				serviceSettings={serviceSettings}
				serviceSettingsData={serviceSettingsData}
				setServiceSettingsData={setServiceSettingsData}
				setEditMode={setEditMode}
				setServiceId={setServiceId}
				saveSettingsServicesHandler={saveSettingsServicesHandler}
			/>
			<ServiceDescription
				displayDescription={displayDescription}
				setDisplayDescription={setDisplayDescription}
				displayWrappedButtonsMob={displayWrappedButtonsMob}
				getAllServicesHandler={getAllServicesHandler}
				formInput={formInput}
				setFormInput={setFormInput}
				setServicesData={setServicesData}
				setShowBackdrop={setShowBackdrop}
				setDescriptionEdit={setDescriptionEdit}
				serviceDescriptionData={serviceDescriptionData}
				setServiceDescriptionData={setServiceDescriptionData}
				checkedEmployees={checkedEmployees}
				serviceId={serviceId}
				resetForm={resetForm}
				errorMessage={errorMessage}
				setIsLoading={setIsLoading}
			/>
			<AddServicesForm
				setFormInput={setFormInput}
				displayAddServicesForm={displayAddServicesForm}
				setDisplayAddServicesForm={setDisplayAddServicesForm}
				serviceProviderData={props.serviceProviders}
				initServicesForm={initServicesForm}
				servicesFormInput={formInput}
				setServicesFormInput={setFormInput}
				servicesData={servicesData}
				setServicesData={setServicesData}
				serviceId={serviceId}
				setServiceId={setServiceId}
				employeeData={props.employees}
				checkedEmployees={checkedEmployees}
				setCheckedEmployees={setCheckedEmployees}
				editMode={editMode}
				setEditMode={setEditMode}
				setShowBackdrop={setShowBackdrop}
				setIsLoading={setIsLoading}
				displayEmployeesPicker="block"
				displayForward="none"
				displayForwardMob="none"
				setShowResponseModal={setShowResponseModal}
				setMessageHandler={setMessageHandler}
				setShowInfoModal={setShowInfoModal}
				errorMessage={errorMessage}
				validation={true}
				isSetupGuide={false}
				cancelAddService={() => cancelAddServiceHandler()}
				displayCancel={isMobile ? 'none' : 'inline-block'}
				getAllServicesHandler={getAllServicesHandler}
				isSetupGuide={false}
				resetForm={resetForm}
				triger={showResponseModal.triger}
			/>
			<ListHead
				title="Lista usluga"
				displayCopy="none"
				displayPaste="none"
				displaySelectWeek="none"
				displaySave="none"
				displayLink="none"
				add="uslugu"
				addNew={faPlus}
				onAdd={() => newServiceHandler()}
				onClickSearch={() => setDipslaySerachBar('flex')}
				dipslaySerachBar={dipslaySerachBar}
				setDipslaySerachBar={setDipslaySerachBar}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<ListBody>
				<ServicesList
					servicesData={servicesData}
					setDisplayAddServicesForm={setDisplayAddServicesForm}
					setShowBackdrop={setShowBackdrop}
					setDisplayWrappedTools={setDisplayWrappedTools}
					setDisplayServiceSettings={setDisplayServiceSettings}
					serviceId={serviceId}
					setServiceId={setServiceId}
					services={props.services}
					searchInput={searchInput}
					formInput={formInput}
					setFormInput={setFormInput}
					setEditMode={setEditMode}
					serviceSettings={serviceSettings}
					setServiceSettingsData={setServiceSettingsData}
					deleteServiceHandler={deleteServiceHandler}
					showConfirmModal={showConfirmModal}
					setShowConfirmModal={setShowConfirmModal}
				/>
			</ListBody>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const token = await auth(ctx);
	const serviceProvidersUrl = `users/getAllServiceProviders`;
	const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token);
	const employeesUrl = `users/getAllEmployees`;
	const resEmployees = await fetchJson(employeesUrl, 'get', token);
	const servicesUrl = `appointments/getAllServices`;
	const resServices = await fetchJson(servicesUrl, 'get', token);
	const guideStatusUrl = `users/getCompanyGuideStatus`;
	const resGuideStatus = await fetchJson(guideStatusUrl, 'get', token);
	const serviceSettingsUrl = `settings/getSettingsServices`;
	const resServiceSettings = await fetchJson(serviceSettingsUrl, 'get', token);

	const serviceProviders = resServiceProviders.data.map(name => {
		return name;
	});

	const employees = resEmployees.data.map(name => {
		return name;
	});

	const services = resServices.data.map(name => {
		return name;
	});

	const userStatus = resGuideStatus.data;

	const serviceSettings = resServiceSettings.data.map(setting => {
		return setting;
	});

	return {
		props: {
			token,
			serviceProviders,
			employees,
			services,
			userStatus,
			serviceSettings,
		},
	};
}

export default Services;
