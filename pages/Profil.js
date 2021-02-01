import { useState } from 'react';
import { useDeviceDetect } from '../helpers/universalFunctions';
import Head from 'next/head';
import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';

import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import Profile from '../Components/Profile/Profile';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import ResponseModal from '../Components/UI/Modal/ConfirmModal';
import ChangePass from '../Components/Auth/ChangePass';

import classes from '../Components/Navigation/Navigation.module.scss';

const profil = () => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [displayChangePass, setDisplayChangePass] = useState('none');
	const [displayConfirmModal, setDisplayConfirmModal] = useState('none');
	const [showBackdrop, setShowBackdrop] = useState('');
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
			<Backdrop backdropAnimation={showBackdrop} onClick={() => setDisplayBackdrop('none')} />
			<ConfirmModal
				display={displayConfirmModal}
				bottom="0"
				message="Da li sigurno želite deaktivirati profil? Deaktivacija profila onemogućuje Vas i klijente da Vam rezervišu termine !!!"
				submitValue="DEAKTIVIRAJ"
				onDecline={() => {
					setDisplayConfirmModal('none'), setShowBackdrop(classes.backdropOut);
				}}
				onSubmit={() => {
					setDisplayConfirmModal('none'), setShowBackdrop(classes.backdropOut);
				}}
			/>
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
			<ChangePass
				displayChangePass={displayChangePass}
				setDisplayChangePass={setDisplayChangePass}
				setShowResponseModal={setShowResponseModal}
			/>
			<Profile
				setShowBackdrop={setShowBackdrop}
				setDisplayChangePass={setDisplayChangePass}
				setDisplayConfirmModal={setDisplayConfirmModal}
			/>
		</>
	);
};

export default profil;
