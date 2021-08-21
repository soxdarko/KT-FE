import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../helpers/universalFunctions';
import Head from 'next/head';
import Loader from 'react-spinners/RingLoader';
import Layout from '../Components/hoc/Layout/Layout';

import classes from '../Components/Navigation/Navigation.module.scss';
import AuthTabs from '../Components/Auth/AuthTabs';
import Backdrop from '../Components/UI/Backdrop';
import ResponseModal from '../Components/UI/Modal/ResponseModal';

const Autentification = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [showBackdrop, setShowBackdrop] = useState('');
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [isLoading, setIsLoading] = useState(false);
	const [userStatus, setUserStatus] = useState('');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
		showButton: 'block',
	});
	return (
		<>
			<Head>
				<title>Autentifikacija Klijenta</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout
				displayHamButton="none"
				displaySideDrawerMob="none"
				displaySideDrawerPC="none"
				displayNotifLabel="none"
				displaySelect="none"
				classNameCal={classes.sideDrawerButtonActive}
				classNameClients={classes.sideDrawerButton}
				classNameServices={classes.sideDrawerButton}
				classNameProfile={classes.sideDrawerButton}
				selectData={null}
				backgroundColorLayout="#303030">
				<Loader loading={isLoading} />
				<Backdrop backdropAnimation={showBackdrop} />
				<ResponseModal
					message={showResponseModal.message}
					modalAnimation={showResponseModal.animation}
					displayLinkButton="none"
					displayFormButton="block"
					borderColor={showResponseModal.border}
					showButton={showResponseModal.showButton}
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
				<AuthTabs
					setIsLoading={setIsLoading}
					setShowResponseModal={setShowResponseModal}
					showResponseModal={showResponseModal}
					displayPassRecovery={displayPassRecovery}
					setDisplayPassRecovery={setDisplayPassRecovery}
					showBackdrop={showBackdrop}
					setShowBackdrop={setShowBackdrop}
					userStatus={userStatus}
					setUserStatus={setUserStatus}
				/>
			</Layout>
		</>
	);
};

export default Autentification;
