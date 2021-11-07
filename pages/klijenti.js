import { useState, useEffect, useRef } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import nextCookie from 'next-cookies';
import { useDeviceDetect } from '../helpers/universalFunctions';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ClientsList from '../Components/Clients/ClientsList';
import AddClientForm from '../Components/Clients/AddClientForm';
import InviteClient from '../Components/AddToList/InviteClient';
import AddClientButton from '../Components/UI/AddClientButton';
import WrappedTools from '../Components/UI/WrappedTools';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Clients = props => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [isLoading, setIsLoading] = useState(false);
	const [displayInviteClient, setDisplayInviteClient] = useState('none');
	const [showInviteClient, setShowInviteClient] = useState('');
	const [displayAddClientForm, setDisplayAddClientForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
	const [showBackdrop, setShowBackdrop] = useState('');
	const [employeeData, setEmployeeData] = useState(props.employees);
	const [displayConfirmModal, setDisplayConfirmModal] = useState('none');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
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
							setShowInviteClient(classes.slideOutLeft);
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
						setShowResponseModal(
							{
								...showResponseModal,
								animation: modalAnimationOut,
								border: null,
							},
							setShowBackdrop(classes.backdropOut)
						);
					}}
				/>
				<WrappedTools
					displayWrappedTools={displayWrappedTools}
					setDisplayWrappedTools={setDisplayWrappedTools}
					className={classes.WrappedToolsContainer}
					displayWrappedToolsChkBox="none"
				/>
				<AddClientForm
					displayAddClientForm={displayAddClientForm}
					setDisplayAddClientForm={setDisplayAddClientForm}
					setShowResponseModal={setShowResponseModal}
					setShowBackdrop={setShowBackdrop}
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
				/>
				<ListBody>
					<ClientsList setDisplayWrappedTools={setDisplayWrappedTools} clients={props.clients} />
				</ListBody>
				<AddClientButton
					onClick={() => {
						setShowInviteClient(classes.slideInLeft),
							setShowBackdrop(classes.backdropIn),
							setDisplayConfirmModal('none'),
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
