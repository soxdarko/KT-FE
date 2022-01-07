import { useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import {
	useDeviceDetect,
	responseHandler,
	infoMessageHandler,
	confirmHandler,
} from '../helpers/universalFunctions';
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
	const [isLoading, setIsLoading] = useState(false);
	const [formInput, setFormInput] = useState(initClientForm);
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
	const [showInfoModal, setShowInfoModal] = useState({
		triger: false,
		message: null,
	});
	const [showConfirmModal, setShowConfirmModal] = useState({
		message: null,
		triger: false,
	});
	const [showResponseModal, setShowResponseModal] = useState({
		triger: false,
		message: null,
		border: '',
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
			setClientId(null);
			setEditMode(false);
		}
	};

	const errorMessage = message => {
		responseHandler(setShowResponseModal, message, 'red');
		setShowBackdrop(classes.backdropIn);
	};

	const getClientsHandler = async deleted => {
		const api = await getClients(deleted)
			.then(response => {
				const getClientsData = response.data.map(client => {
					return client;
				});
				setClientData(getClientsData);
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

	const banClientHandler = () => {
		const api = banClient(clientId)
			.then(response => {
				console.log(response);
				getClientsHandler(false);
				resetForm();
				infoMessageHandler(
					setShowInfoModal,
					'Klijent uspešno uklonjen sa liste!',
					!showInfoModal.triger
				);
			})
			.catch(error => {
				!holdBackdrop ? setHoldBackdrop(true) : {};
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

	function confirmModalSubmitHandler() {
		banClientHandler(clientId);
		setShowBackdrop(classes.backdropOut);
		setDisplayWrappedTools('none');
	}
	function confirmModalCancelHandler() {
		setClientId(null);
		setShowBackdrop(classes.backdropOut);
	}
	function newClientHandler() {
		setDisplayAddClientForm('block');
		setShowBackdrop(classes.backdropIn);
		setFormInput(initClientForm);
	}
	function editClientHandler() {
		setDisplayAddClientForm('block');
		setShowBackdrop(classes.backdropIn);
		setEditMode(true);
	}
	function clientInvitationHandler() {
		setShowInviteClient(classes.slideInLeft);
		setShowBackdrop(classes.backdropIn);
		setDisplayInviteClient('block');
	}

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
				<Backdrop backdropAnimation={showBackdrop} />
				<InfoModal
					message={showInfoModal.message}
					showInfoModal={showInfoModal}
					borderColor="green"
				/>
				<ResponseModal
					showResponseModal={showResponseModal}
					setShowBackdrop={setShowBackdrop}
					holdBackdrop={holdBackdrop}
					resetForm={resetForm}
					setIsLoading={setIsLoading}
				/>
				<ConfirmModal
					modalTriger={showConfirmModal.triger}
					message={showConfirmModal.message}
					submitValue="Da"
					setShowBackdrop={setShowBackdrop}
					onSubmit={() => confirmModalSubmitHandler()}
					onCancel={() => confirmModalCancelHandler()}
				/>
				<WrappedTools
					displayWrappedTools={displayWrappedTools}
					setDisplayWrappedTools={setDisplayWrappedTools}
					setDisplayDescription={setDisplayDescription}
					setDescriptionEdit={setDescriptionEdit}
					setShowBackdrop={setShowBackdrop}
					setShowConfirmModal={setShowConfirmModal}
					setFormInput={setFormInput}
					setEditMode={setEditMode}
					isEmployeesArray={false}
					displayWrappedToolsChkBox="none"
					setDataId={setClientId}
					className={classes.WrappedToolsContainer}
					initForm={initClientForm}
					onClickEdit={() => editClientHandler()}
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
					displayAddClientForm={displayAddClientForm}
					setDisplayAddClientForm={setDisplayAddClientForm}
					setShowBackdrop={setShowBackdrop}
					setShowResponseModal={setShowResponseModal}
					showInfoModal={showInfoModal}
					setShowInfoModal={setShowInfoModal}
					setDisplayDescription={setDisplayDescription}
					displayWrappedButtonsMob={displayWrappedButtonsMob}
					resetForm={resetForm}
					errorMessage={errorMessage}
					setIsLoading={setIsLoading}
					triger={showResponseModal.triger}
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
					onAdd={() => newClientHandler()}
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
						showConfirmModal={showConfirmModal}
						confirmHandler={confirmHandler}
						setShowConfirmModal={setShowConfirmModal}
						triger={showConfirmModal.triger}
					/>
				</ListBody>
				<AddClientButton onClick={() => clientInvitationHandler()} />
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
