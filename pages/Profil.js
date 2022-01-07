import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import nextCookie from 'next-cookies';
import { useDeviceDetect } from '../helpers/universalFunctions';
import Head from 'next/head';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';

import Layout from '../Components/hoc/Layout/Layout';
import Profile from '../Components/Profile/Profile';
import Backdrop from '../Components/UI/Backdrop';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ChangePass from '../Components/Auth/ChangePass';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import InviteClient from '../Components/AddToList/InviteClient';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const profil = () => {
	const { isMobile } = useDeviceDetect();
	const [isLoading, setIsLoading] = useState(false);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [displayInviteClient, setDisplayInviteClient] = useState('none');
	const [displayConfirmModal, setDisplayConfirmModal] = useState('none');
	const [displayChangePass, setDisplayChangePass] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
	const [showInviteClient, setShowInviteClient] = useState('');
	const [showBackdrop, setShowBackdrop] = useState('');
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
	return (
		<>
			<Head>
				<title>KlikTermin | Profil</title>
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
				license="5"
			/>
			<Backdrop
				backdropAnimation={showBackdrop}
				onClick={() => {
					setShowBackdrop(classes.backdropOut),
						setShowConfirmModal(classes.modalDown),
						setShowInviteClient(classes.slideOutLeft);
				}}
			/>
			<Loader loading={isLoading} />
			<ResponseModal
				showResponseModal={showResponseModal}
				setShowBackdrop={setShowBackdrop}
				holdBackdrop={false}
				setIsLoading={setIsLoading}
			/>
			<ConfirmModal
				display={displayConfirmModal}
				animation={showConfirmModal}
				message="Da li sigurno želite deaktivirati profil? Deaktivacija profila onemogućuje Vas i klijente da Vam rezervišu termine !!!"
				submitValue="DEAKTIVIRAJ"
				onDecline={() => {
					setShowConfirmModal(classes.modalDown), setShowBackdrop(classes.backdropOut);
				}}
				onSubmit={() => {
					setShowConfirmModal(classes.modalDown), setShowBackdrop(classes.backdropOut);
				}}
			/>
			<InviteClient
				display={displayInviteClient}
				animation={showInviteClient}
				backdropAnimation={showBackdrop}
				setShowBackdrop={setShowBackdrop}
				setShowInviteClient={setShowInviteClient}
			/>
			<PassRecovery
				displayPassRecovery={displayPassRecovery}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setShowResponseModal={setShowResponseModal}
				modalAnimationIn={modalAnimationIn}
				setShowBackdrop={setShowBackdrop}
			/>
			<ChangePass
				displayChangePass={displayChangePass}
				setDisplayChangePass={setDisplayChangePass}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setShowResponseModal={setShowResponseModal}
				setShowBackdrop={setShowBackdrop}
				modalAnimationIn={modalAnimationIn}
			/>
			<Profile
				setDisplayInviteClient={setDisplayInviteClient}
				setDisplayConfirmModal={setDisplayConfirmModal}
				setShowBackdrop={setShowBackdrop}
				setShowInviteClient={setShowInviteClient}
				setShowConfirmModal={setShowConfirmModal}
				setDisplayChangePass={setDisplayChangePass}
				setShowResponseModal={setShowResponseModal}
				modalAnimationIn={modalAnimationIn}
			/>
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

export default profil;
