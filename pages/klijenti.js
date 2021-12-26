import { useState, useEffect, useRef } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import nextCookie from 'next-cookies';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
import { banClient } from '../api/banClient';
import { getClients } from '../api/getClients';
import initClientForm from '../Components/Clients/initClientForm';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ClientsList from '../Components/Clients/ClientsList';
import AddClientForm from '../Components/Clients/AddClientForm';
import InviteClient from '../Components/AddToList/InviteClient';
import AddClientButton from '../Components/UI/AddClientButton';
import WrappedTools from '../Components/UI/WrappedTools';
import ClientDescription from '../Components/UI/Forms/ClientDescription';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Clients = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [isLoading, setIsLoading] = useState(false);
	const [formInput, setFormInput] = useState(initClientForm);
	const [completnessMessage, setCompletnessMessage] = useState('Uspešno sačuvano!');
	const [userData, setUserData] = useState({});
	const [clientsData, setClientData] = useState(props.clients);
	const [clientId, setClientId] = useState(null);
	const [descriptionEdit, setDescriptionEdit] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [displayInviteClient, setDisplayInviteClient] = useState('none');
	const [showInviteClient, setShowInviteClient] = useState('');
	const [displayAddClientForm, setDisplayAddClientForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
	const [displayDescription, setDisplayDescription] = useState('none');
	const [showBackdrop, setShowBackdrop] = useState('');
	const [dipslaySerachBar, setDipslaySerachBar] = useState('none');
	const [searchInput, setSearchInput] = useState('');
	const [showInfoModal, setShowInfoModal] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
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
			setClientId(null);
			setEditMode(false);
		}
	};

	const errorMessage = message => {
		responseHandler(setShowResponseModal, modalAnimationIn, message, 'red');
		setIsLoading(false);
		setShowBackdrop(classes.backdropIn);
	};

	const completnessMessageHandler = message => {
		setShowInfoModal(modalAnimationIn);
		setIsLoading(false);
		setCompletnessMessage(message);
	};

	const getClientsHandler = async deleted => {
		const api = await getClients(deleted)
			.then(response => {
				const getClientsData = response.data.map(client => {
					return client;
				});
				setClientData(getClientsData);
				1;
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

	const banClientHandler = () => {
		const api = banClient(clientId)
			.then(response => {
				console.log(response);
				getClientsHandler(false);
				resetForm();
				completnessMessageHandler('Klijent uspešno uklonjen');
			})
			.catch(error => {
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
		api;
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

	return (
		<>
			<Head>
				<title>KlikTermin | Lista klienata</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout
				displayLoginBtn="none"
				displayRegisterBtn="none"
				displayToolbarNavBtn="none"
				displayToolbarBookingBtn="none"
				displaySelect="none"
				displayNotifLabel="block"
				colorClientsIcon="#fc9815"
				classNameCal={classes.sideDrawerButtonActive}
				classNameClients={classes.sideDrawerButton}
				classNameServices={classes.sideDrawerButton}
				classNameProfile={classes.sideDrawerButton}
				classNameEmployeeSelect={classes.EmployeeSelect}
				selectData={ServiceProvidersEmployees}
				sms="10"
				license="5">
				<Loader loading={isLoading} />
				<Backdrop
					backdropAnimation={showBackdrop}
					/* onClick={() => {
						setShowBackdrop(classes.backdropOut),
							setDisplayAddClientForm('none'),
							setShowInviteClient(classes.slideOutLeft),
							setDisplayDescription('none');
					}} */
				/>
				<InfoModal
					message={completnessMessage}
					modalAnimation={showInfoModal}
					borderColor="green"
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
					resetForm={resetForm}
				/>
				<ConfirmModal
					animation={showConfirmModal.animation}
					submitValue="Da"
					message={showConfirmModal.message}
					borderColor={showConfirmModal.border}
					onSubmit={() => {
						banClientHandler(clientId);
						setShowConfirmModal({ ...showConfirmModal, animation: modalAnimationOut });
						setShowBackdrop(classes.backdropOut);
						setDisplayWrappedTools('none');
					}}
					onDecline={() => {
						setClientId(null);
						setShowConfirmModal({ ...showConfirmModal, animation: modalAnimationOut });
						setShowBackdrop(classes.backdropOut);
					}}
				/>
				<WrappedTools
					displayWrappedTools={displayWrappedTools}
					setDisplayWrappedTools={setDisplayWrappedTools}
					setDisplayDescription={setDisplayDescription}
					setDescriptionEdit={setDescriptionEdit}
					setShowBackdrop={setShowBackdrop}
					setShowConfirmModal={setShowConfirmModal}
					modalAnimationIn={modalAnimationIn}
					responseHandler={responseHandler}
					formInput={formInput}
					setFormInput={setFormInput}
					setEditMode={setEditMode}
					displayWrappedToolsChkBox="none"
					setDataId={setClientId}
					className={classes.WrappedToolsContainer}
					initForm={initClientForm}
					isMobile={isMobile}
					onClickEdit={() => {
						setDisplayAddClientForm('block');
						setShowBackdrop(classes.backdropIn);
						setEditMode(true);
					}}
					resetForm={resetForm}
				/>
				<ClientDescription
					displayDescription={displayDescription}
					setDisplayDescription={setDisplayDescription}
					displayWrappedButtonsMob={displayWrappedButtonsMob}
					formInput={formInput}
					setFormInput={setFormInput}
					setClientData={setClientData}
					setUserData={setUserData}
					clientId={clientId}
					setShowBackdrop={setShowBackdrop}
					setDescriptionEdit={setDescriptionEdit}
					resetForm={resetForm}
					setIsLoading={setIsLoading}
				/>
				<AddClientForm
					getClientsHandler={getClientsHandler}
					formInput={formInput}
					userData={userData}
					setUserData={setUserData}
					initClientForm={initClientForm}
					setFormInput={setFormInput}
					clientsData={clientsData}
					setClientData={setClientData}
					clientId={clientId}
					setClientId={setClientId}
					editMode={editMode}
					setEditMode={setEditMode}
					setShowInfoModal={setShowInfoModal}
					displayAddClientForm={displayAddClientForm}
					setDisplayAddClientForm={setDisplayAddClientForm}
					setShowResponseModal={setShowResponseModal}
					setShowBackdrop={setShowBackdrop}
					setDisplayDescription={setDisplayDescription}
					displayWrappedButtonsMob={displayWrappedButtonsMob}
					modalAnimationIn={modalAnimationIn}
					resetForm={resetForm}
					errorMessage={errorMessage}
					completnessMessageHandler={completnessMessageHandler}
					isPageLoad={isPageLoad}
					setIsLoading={setIsLoading}
				/>
				<InviteClient
					display={displayInviteClient}
					animation={showInviteClient}
					backdropAnimation={showBackdrop}
					setShowBackdrop={setShowBackdrop}
					setShowInviteClient={setShowInviteClient}
				/>
				<ListHead
					title="Lista klijenata"
					displayCopy="none"
					displayPaste="none"
					displaySelectWeek="none"
					displaySave="none"
					displayLink="none"
					add="klijenta"
					addNew={faUserPlus}
					onAdd={() => {
						setDisplayAddClientForm('block');
						setShowBackdrop(classes.backdropIn);
						setFormInput(initClientForm);
					}}
					onClickSearch={() => setDipslaySerachBar('flex')}
					dipslaySerachBar={dipslaySerachBar}
					setDipslaySerachBar={setDipslaySerachBar}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
				/>
				<ListBody>
					<ClientsList
						setDisplayWrappedTools={setDisplayWrappedTools}
						setShowBackdrop={setShowBackdrop}
						setDisplayAddClientForm={setDisplayAddClientForm}
						setDisplayDescription={setDisplayDescription}
						setDescriptionEdit={setDescriptionEdit}
						/* clientsData={searchInput === null ? clientsData : filterData()} */
						clientsData={clientsData}
						clientId={clientId}
						setClientId={setClientId}
						searchInput={searchInput}
						editMode={editMode}
						setEditMode={setEditMode}
						modalAnimationIn={modalAnimationIn}
						showConfirmModal={showConfirmModal}
						setShowConfirmModal={setShowConfirmModal}
						responseHandler={responseHandler}
					/>
				</ListBody>
				<AddClientButton
					onClick={() => {
						setShowInviteClient(classes.slideInLeft),
							setShowBackdrop(classes.backdropIn),
							setDisplayInviteClient('block');
					}}
				/>
			</Layout>
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
	const clientsUrl = `users/getClients?deleted=${false}`;
	const resClients = await fetchJson(clientsUrl, 'get', token);
	const guideStatusUrl = `users/getCompanyGuideStatus`;
	const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);

	const serviceProviders = resServiceProviders.data.map(name => {
		return name;
	});

	const employees = resEmployees.data.map(name => {
		return name;
	});

	const services = resServices.data.map(name => {
		return name;
	});

	const clients = resClients.data.map(name => {
		return name;
	});

	const userStatus = resGuideStatusUrl.data;

	return {
		props: {
			token,
			serviceProviders,
			employees,
			services,
			clients,
			userStatus,
		},
	};
}

export default Clients;
