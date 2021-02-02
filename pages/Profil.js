import { useState } from 'react';
import { useDeviceDetect } from '../helpers/universalFunctions';
import Head from 'next/head';
import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';

import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import Profile from '../Components/Profile/Profile';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ChangePass from '../Components/Auth/ChangePass';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';

import classes from '../Components/Navigation/Navigation.module.scss';

const profil = () => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [displayChangePass, setDisplayChangePass] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
	const [displayConfirmModal, setDisplayConfirmModal] = useState('none');
	const [showBackdrop, setShowBackdrop] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
		backdrop: '',
	});
	return (
		<>
			<Head>
				<title>Profil</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Backdrop backdropAnimation={showBackdrop} onClick={() => setDisplayBackdrop('none')} />
			<ResponseModal
				message={showResponseModal.message}
				modalAnimation={showResponseModal.animation}
				backdropAnimation={showResponseModal.backdrop}
				displayLinkButton="none"
				displayFormButton="block"
				borderColor={showResponseModal.border}
				link="/"
				onClick={() =>
					setShowResponseModal({
						...showResponseModal,
						animation: modalAnimationOut,
						border: null,
						backdrop: classes.backdropOut,
					})
				}
			/>
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
			<PassRecovery
				displayPassRecovery={displayPassRecovery}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setShowResponseModal={setShowResponseModal}
				modalAnimationIn={modalAnimationIn}
			/>
			<ChangePass
				displayChangePass={displayChangePass}
				setDisplayChangePass={setDisplayChangePass}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setShowResponseModal={setShowResponseModal}
				modalAnimationIn={modalAnimationIn}
			/>
			<Profile
				setShowBackdrop={setShowBackdrop}
				setShowConfirmModal={setShowConfirmModal}
				setDisplayChangePass={setDisplayChangePass}
				setDisplayConfirmModal={setDisplayConfirmModal}
				setShowResponseModal={setShowResponseModal}
				modalAnimationIn={modalAnimationIn}
			/>
			<ConfirmModal
				display={displayConfirmModal}
				modalAnimation={showConfirmModal}
				message="Da li sigurno želite deaktivirati profil? Deaktivacija profila onemogućuje Vas i klijente da Vam rezervišu termine !!!"
				submitValue="DEAKTIVIRAJ"
				onDecline={() => {
					setShowConfirmModal(classes.modalDown), setShowBackdrop(classes.backdropOut);
				}}
				onSubmit={() => {
					setShowConfirmModal(classes.modalDown), setShowBackdrop(classes.backdropOut);
				}}
			/>
		</>
	);
};

export default profil;
