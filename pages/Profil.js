import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
import Head from 'next/head';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';

import Layout from '../Components/hoc/Layout/Layout';
import Profile from '../Components/Profile/Profile';
import Backdrop from '../Components/UI/Backdrop';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ChangePass from '../Components/Auth/ChangePass';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const profil = props => {
	const { isMobile } = useDeviceDetect();
	const [isLoading, setIsLoading] = useState(false);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const [profileData, setProfileeData] = useState(props.profileData);
	const [displayConfirmModal, setDisplayConfirmModal] = useState('none');
	const [displayChangePass, setDisplayChangePass] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
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

	const errorMessage = message => {
		responseHandler(setShowResponseModal, message, 'red');
		setShowBackdrop(classes.backdropIn);
	};

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
					setShowBackdrop(classes.backdropOut);
					setShowConfirmModal(classes.modalDown);
				}}
			/>
			<Loader loading={isLoading} />
			<InfoModal 
				message={showInfoModal.message}
				showInfoModal={showInfoModal}
				borderColor="green"
			/>
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
				triger={setShowResponseModal.triger}
			/>
			<Profile
				setDisplayConfirmModal={setDisplayConfirmModal}
				setShowBackdrop={setShowBackdrop}
				errorMessage={errorMessage}
				setShowConfirmModal={setShowConfirmModal}
				setDisplayChangePass={setDisplayChangePass}
				setShowResponseModal={setShowResponseModal}
				setShowInfoModal={setShowInfoModal}
				responseTriger={setShowResponseModal.triger}
				infoTriger={setShowInfoModal.triger}
				profileData={profileData}
				setIsLoading={setIsLoading}
			/>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const token = await auth(ctx);
	const guideStatusUrl = `users/getCompanyGuideStatus`;
	const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);
	const getEmployeeProfileUrl = `users/getEmployeeProfile`;
	const getEmployeeProfile = await fetchJson(getEmployeeProfileUrl, 'get', token);

	/* const profileData = getEmployeeProfile.data.map(data => {
		return data;
	}); */

	const profileData = getEmployeeProfile.data

	const userStatus = resGuideStatusUrl.data;

	return {
		props: {
			token,
			userStatus,
			profileData
		},
	};
}

export default profil;
