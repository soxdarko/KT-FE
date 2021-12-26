import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
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
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import initServicesForm from '../Components/SetupForms/initServicesForm';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ServicesList from '../Components/Services/ServicesList';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WrappedTools from '../Components/UI/WrappedTools';
import CheckBox from '../Components/UI/CheckBox';
import ServiceDescription from '../Components/UI/Forms/ServiceDescription';
import Loader from '../Components/UI/Loader';
import ServiceSettings from '../Components/UI/Forms/ServiceSettings';

import classes from '../Components/Navigation/Navigation.module.scss';

const Services = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
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
	const [completnessMessage, setCompletnessMessage] = useState('Uspešno sačuvano!');
	const [descriptionEdit, setDescriptionEdit] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [dipslaySerachBar, setDipslaySerachBar] = useState('none');
	const [displayServiceSettings, setDisplayServiceSettings] = useState('none');
	const [searchInput, setSearchInput] = useState('');
	const [showInfoModal, setShowInfoModal] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});

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
			setFormInput(initServicesForm);
		}
	};

	const errorMessage = message => {
		responseHandler(setShowResponseModal, modalAnimationIn, message, 'red');
		setShowBackdrop(classes.backdropIn);
		setIsLoading(false);
	};

	const completnessMessageHandler = message => {
		setShowInfoModal(modalAnimationIn);
		setIsLoading(false);
		setCompletnessMessage(message);
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const autoModalDisplay = () => {
			setShowInfoModal(modalAnimationOut);
		};

		const timer = setTimeout(() => {
			autoModalDisplay();
		}, 2000);

		return () => clearTimeout(timer);
	}, [showInfoModal]);

	const saveSettingsServicesHandler = async () => {
		const api = await saveSettingsServices(serviceSettingsData)
			.then(response => {
				console.log(response);
				setDisplayServiceSettings('none');
				completnessMessageHandler('Uspešno sačuvano');
				getServiceSettingsHandler();
			})
			.catch(error => {
				if (error.response) {
					console.log(error);
					/* error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					}); */
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, pokušajte ponovo');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		api;
	};

	const deleteServiceHandler = async () => {
		const api = await deleteService(serviceId)
			.then(response => {
				console.log(response);
				/* setDisplayServiceSettings('none'); */
				getAllServicesHandler();
				completnessMessageHandler('Usluga obrisana');
			})
			.catch(error => {
				if (error.response) {
					console.log(error);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, pokušajte ponovo');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
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

	const getServiceSettingsHandler = async () => {
		const api = await getSettingsServices()
			.then(response => {
				const getServiceSettingsData = response.data.map(setting => {
					return setting;
				});
				setServiceSettings(getServiceSettingsData);
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

	console.log(serviceSettings);

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
				selectData={ServiceProvidersEmployees}
				sms="10"
				license="5"
			/>
			<Loader loading={isLoading} />
			<Backdrop backdropAnimation={showBackdrop} />
			<InfoModal message={completnessMessage} modalAnimation={showInfoModal} borderColor="green" />
			<ConfirmModal
				message="Da li ste sigurni da želite obrisati uslugu?"
				submitValue="Obriši"
				animation={showConfirmModal}
				borderColor="yellow"
				onSubmit={() => {
					deleteServiceHandler(serviceId);
					setShowConfirmModal(modalAnimationOut);
					setShowBackdrop(classes.backdropOut);
				}}
				onDecline={() => {
					setServiceId(null);
					setShowConfirmModal(modalAnimationOut);
					setShowBackdrop(classes.backdropOut);
					getAllServicesHandler();
				}}
			/>
			<ResponseModal
				message={showResponseModal.message}
				modalAnimation={showResponseModal.animation}
				displayLinkButton="none"
				displayFormButton="block"
				borderColor={showResponseModal.border}
				link="/"
				onClick={() => {
					setShowResponseModal({
						...showResponseModal,
						animation: modalAnimationOut,
						border: null,
					});
				}}
			/>
			<WrappedTools
				displayWrappedTools={displayWrappedTools}
				setDisplayWrappedTools={setDisplayWrappedTools}
				setDisplayDescription={setDisplayDescription}
				setShowBackdrop={setShowBackdrop}
				descriptionEdit={descriptionEdit}
				setDescriptionEdit={setDescriptionEdit}
				formInput={formInput}
				setFormInput={setFormInput}
				setDataId={setServiceId}
				initForm={initServicesForm}
				setEditMode={setEditMode}
				onClickEdit={() => {
					setDisplayAddServicesForm('block');
					setEditMode(true);
				}}
				className={[classes.WrappedToolsContainer, classes.WrappedToolsWithChkBox].join(' ')}
				displayWrappedToolsChkBox="flex">
				{serviceSettings
					.filter(data => data.idService.includes(serviceId))
					.map(() => {
						return (
							<div key={serviceId} className={classes.AddForSelectedWrapperLeftAlign}>
								<div>
									<CheckBox
										name="omiljenaUslugaMob"
										className={classes.addForSelected}
										defaultChecked={serviceSettingsData.favoriteService}
										onClick={() =>
											setServiceSettingsData({
												...serviceSettingsData,
												['favoriteService']: !serviceSettingsData.favoriteService,
											})
										}
									/>
									<p>Omiljena usluga?</p>
								</div>
								<div>
									<CheckBox
										name="izabranaUslugaMob"
										className={classes.addForSelected}
										defaultChecked={serviceSettingsData.alwaysSelected}
										onClick={() =>
											setServiceSettingsData({
												...serviceSettingsData,
												['alwaysSelected']: !serviceSettingsData.alwaysSelected,
											})
										}
									/>
									<p>Uvek izabrana usluga?</p>
								</div>
								<div>
									<CheckBox
										name="koristimUsluguMob"
										className={classes.addForSelected}
										defaultChecked={serviceSettingsData.serviceInUse}
										onClick={() =>
											setServiceSettingsData({
												...serviceSettingsData,
												['serviceInUse']: !serviceSettingsData.serviceInUse,
											})
										}
									/>
									<p>Koristim uslugu!</p>
								</div>
								<div>
									<CheckBox
										name="klijentiVideCenuMob"
										className={classes.addForSelected}
										defaultChecked={serviceSettingsData.clientsSeePrice}
										onClick={() =>
											setServiceSettingsData({
												...serviceSettingsData,
												['clientsSeePrice']: !serviceSettingsData.clientsSeePrice,
											})
										}
									/>
									<p>Klijenti vide cenu usluge?</p>
								</div>
								<div>
									<CheckBox
										name="klijentiVideUsluguMob"
										className={classes.addForSelected}
										defaultChecked={serviceSettingsData.clientsSeeService}
										onClick={() =>
											setServiceSettingsData({
												...serviceSettingsData,
												['clientsSeeService']: !serviceSettingsData.clientsSeeService,
											})
										}
									/>
									<p>Klijenti vide uslugu?</p>
								</div>
								<input
									type="button"
									value="Sačuvaj"
									className={classes.SaveServiceSettings}
									style={{ margin: '20px auto 0 35%', fontSize: '2em', padding: '5px' }}
									onClick={() => saveSettingsServicesHandler()}
								/>
							</div>
						);
					})}
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
				completnessMessageHandler={completnessMessageHandler}
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
				modalAnimationIn={modalAnimationIn}
				completnessMessageHandler={completnessMessageHandler}
				errorMessage={errorMessage}
				validation={true}
				isSetupGuide={false}
				abortAddService={() => {
					setServiceId(null);
					setFormInput(initServicesForm);
					setDisplayAddServicesForm('none');
					setEditMode(false);
					setShowBackdrop(classes.backdropOut);
				}}
				displayCancel={isMobile ? 'none' : 'inline-block'}
				getAllServicesHandler={getAllServicesHandler}
				isSetupGuide={false}
				resetForm={resetForm}
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
				onAdd={() => {
					setDisplayAddServicesForm('block');
					setFormInput(initServicesForm);
				}}
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
					setShowConfirmModal={setShowConfirmModal}
					modalAnimationIn={modalAnimationIn}
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
