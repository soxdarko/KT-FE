import { useState, useEffect, useRef } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import nextCookie from 'next-cookies';
import { useDeviceDetect } from '../helpers/universalFunctions';
import initClientForm from '../Components/Clients/initClientForm';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
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
	const [displayInfoModal, setDisplayInfoModal] = useState('');
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
			setClientId(null), setFormInput(initClientForm), setEditMode(false);
		}
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const autoModalDisplay = () => {
			setDisplayInfoModal(modalAnimationOut);
		};

		const timer = setTimeout(() => {
			autoModalDisplay();
		}, 2000);

		return () => clearTimeout(timer);
	}, [displayInfoModal]);

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
				colorProfileIcon="#fc9815"
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
					onClick={() => {
						setShowBackdrop(classes.backdropOut),
							setDisplayAddClientForm('none'),
							setShowInviteClient(classes.slideOutLeft),
							setDisplayDescription('none');
					}}
				/>
				<InfoModal
					message="Uspešno sačuvano!"
					modalAnimation={displayInfoModal}
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
						setShowResponseModal(
							{
								...showResponseModal,
								animation: modalAnimationOut,
								border: null,
							},
							setShowBackdrop(classes.backdropOut)
						);
					}}
					resetForm={resetForm}
				/>
				<WrappedTools
					displayWrappedTools={displayWrappedTools}
					setDisplayWrappedTools={setDisplayWrappedTools}
					setDisplayDescription={setDisplayDescription}
					setDescriptionEdit={setDescriptionEdit}
					setShowBackdrop={setShowBackdrop}
					displayWrappedToolsChkBox="none"
					setDataId={setClientId}
					className={classes.WrappedToolsContainer}
					onCLickEdit={() => {
						setDisplayAddClientForm('block'),
							setShowBackdrop(classes.backdropIn),
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
					setDisplayInfoModal={setDisplayInfoModal}
					displayAddClientForm={displayAddClientForm}
					setDisplayAddClientForm={setDisplayAddClientForm}
					setShowResponseModal={setShowResponseModal}
					setShowBackdrop={setShowBackdrop}
					displayWrappedButtonsMob={displayWrappedButtonsMob}
					modalAnimationIn={modalAnimationIn}
					resetForm={resetForm}
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
						setDisplayAddClientForm('block'), setShowBackdrop(classes.backdropIn);
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
						/* clientsData={searchInput === null ? clientsData : filterData()} */
						clientsData={clientsData}
						clientId={clientId}
						setClientId={setClientId}
						searchInput={searchInput}
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
	const clientsUrl = `users/getClients`;
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
