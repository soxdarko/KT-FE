import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Link from 'next/link';
import Head from 'next/head';
import { useDeviceDetect } from '../helpers/universalFunctions';

import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import NavItem from '../Components/Navigation/NavItem';
import NavItems from '../Components/Navigation/NavItems';
import Slider from '../Components/HomePage/Slider';
import Login from '../Components/Auth/Login/Login';
import RegServProv from '../Components/Auth/RegServProv/RegServProv';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import ClientVerification from '../Components/Auth/ClientVerification';
import ContactForm from '../Components/HomePage/forms/ContactForm';
import Footer from '../Components/HomePage/Footer';
import OurServices from '../Components/HomePage/OurServices/OurServices';
import AuthButton from '../Components/HomePage/AuthButton';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Index = () => {
	const { isMobile } = useDeviceDetect();
	const router = useRouter();
	const isPageLoad = useRef(true);
	const [regColor, setRegColor] = useState('orange');
	const [loginColor, setLoginColor] = useState('white');
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const [completnessMessage, setCompletnessMessage] = useState('Uspešno sačuvano!');
	const [isLoading, setIsLoading] = useState(false);
	const [userStatus, setUserStatus] = useState('');
	const [showBackdrop, setShowBackdrop] = useState('');
	const [displayTabContainer, setDisplayTabContainer] = useState('none');
	const [displayTabButtons, setDisplayTabButtons] = useState('none');
	const [displayLogin, setDisplayLogin] = useState('none');
	const [displayRegServProv, setDisplayRegServProv] = useState('none');
	const [displayClientVerify, setDisplayClientVerify] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
	const [loginInputId, setLoginInputId] = useState(null);
	const [showInfoModal, setShowInfoModal] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
		showButton: 'block',
	});

	const regTabHandler = () => {
		setRegColor('orange'),
			setLoginColor('white'),
			setDisplayRegServProv('block'),
			setDisplayLogin('none');
	};

	const loginTabHandler = () => {
		setRegColor('white'),
			setLoginColor('orange'),
			setDisplayRegServProv('none'),
			setDisplayLogin('block');
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

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const loginInput = document.getElementById('login1stInput');
		setLoginInputId(loginInput);
	}, []);

	const focusInputHandler = element => {
		element.focus();
		console.log(element);
	};

	const Navigation = (
		<NavItems display={isMobile ? 'none' : 'inherit'}>
			<p className={classes.logNotifPc} style={{ display: 'none' }}>
				Dobrodošli Jovan Stefanovic
			</p>
			<NavItem
				link="/"
				className={classes.IndexToolbarNavBtn}
				displayLoginBtn="block"
				marginLeft="10px"
				onClick={() => {
					setDisplayTabContainer('block');
					setDisplayLogin('block');
					setDisplayRegServProv('none');
					setShowBackdrop(classes.backdropIn);
					setRegColor('white');
					setLoginColor('orange');
				}}>
				<a>Prijava</a>
			</NavItem>
			<NavItem
				link="/"
				className={classes.IndexToolbarNavBtn}
				displayRegBtn="block"
				marginLeft="85px"
				onClick={() => {
					setDisplayTabContainer('block');
					setDisplayRegServProv('block');
					setDisplayLogin('none');
					setShowBackdrop(classes.backdropIn);
					setRegColor('orange');
					setLoginColor('white');
				}}>
				<a>Registracija</a>
			</NavItem>
			<NavItem link="/" className={classes.IndexToolbarNavBtn} marginLeft="205px">
				<a>Usluge</a>
			</NavItem>
			<NavItem link="/" className={classes.IndexToolbarNavBtn} marginLeft="283px">
				<a>Kontakt</a>
			</NavItem>
			<Link href="/kalendar">
				<NavItem link="/kalendar" className={classes.IndexBookingButton} marginLeft="375px">
					<a>Rezerviši termin</a>
				</NavItem>
			</Link>
		</NavItems>
	);

	const Authentification = (
		<>
			<Backdrop backdropAnimation={showBackdrop} />
			<InfoModal message={completnessMessage} modalAnimation={showInfoModal} borderColor="green" />
			<ResponseModal
				message={showResponseModal.message}
				modalAnimation={showResponseModal.animation}
				displayLinkButton="none"
				displayFormButton="block"
				borderColor={showResponseModal.border}
				showButton={showResponseModal.showButton}
				link="/"
				onClick={() => {
					setShowResponseModal({
						...showResponseModal,
						animation: modalAnimationOut,
						border: null,
					});
				}}
			/>
			<div
				className={isMobile ? classes.TabContainerMob : classes.TabContainer}
				style={{ position: 'fixed', display: displayTabContainer }}>
				<div className={classes.TabButtonContainer}>
					<button
						style={{ color: regColor, display: displayTabButtons }}
						onClick={() => {
							regTabHandler();
						}}>
						Registracija
					</button>
					<button
						style={{ color: loginColor, display: displayTabButtons }}
						onClick={() => {
							loginTabHandler();
							focusInputHandler(loginInputId);
						}}>
						Login
					</button>
				</div>
				<Login
					displayLogin={displayLogin}
					modalAnimationIn={modalAnimationIn}
					setDisplayLogin={setDisplayLogin}
					setDisplayPassRecovery={setDisplayPassRecovery}
					setDisplayRegServProv={setDisplayRegServProv}
					setShowBackdrop={setShowBackdrop}
					setShowResponseModal={setShowResponseModal}
					setIsLoading={setIsLoading}
					setUserStatus={setUserStatus}
					setDisplayTabContainer={setDisplayTabContainer}
					setDisplayTabButtons={setDisplayTabButtons}
					completnessMessageHandler={completnessMessageHandler}
					inputId={'login1stInput'}
				/>
				<RegServProv
					displayRegServProv={displayRegServProv}
					modalAnimationIn={modalAnimationIn}
					setDisplayRegServProv={setDisplayRegServProv}
					setIsLoading={setIsLoading}
					setShowBackdrop={setShowBackdrop}
					setShowResponseModal={setShowResponseModal}
					setDisplayTabContainer={setDisplayTabContainer}
					setDisplayTabButtons={setDisplayTabButtons}
				/>
				<PassRecovery
					displayPassRecovery={displayPassRecovery}
					setDisplayPassRecovery={setDisplayPassRecovery}
					setShowBackdrop={setShowBackdrop}
					setShowResponseModal={setShowResponseModal}
					setDisplayLogin={setDisplayLogin}
					setDisplayTabButtons={setDisplayTabButtons}
				/>
			</div>

			<ClientVerification
				displayClientVerify={displayClientVerify}
				setDisplayClientVerify={setDisplayClientVerify}
			/>
		</>
	);

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		if (
			(userStatus.guideStatus !== 'WorkingHours' && userStatus.userRole === 'Company') ||
			userStatus.userRole === 'ServiceProvider' ||
			userStatus.userRole === 'Employee'
		) {
			router.push('/setupguide');
		} else if (userStatus.guideStatus === 'WorkingHours' && userStatus.userRole === 'Company') {
			router.push('/kalendar');
		} else if (userStatus.userRole === 'Client') {
			alert('preusmeriti klijenta na klijent kalendar stranicu');
		} else {
			router.push('/');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userStatus]);

	return (
		<>
			<Head>
				<title>KlikTermin | Početna stranica</title>
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
				{Authentification}
				{Navigation}
				<Slider />
				<OurServices />
				<hr style={{ marginTop: isMobile ? '10px' : '40px' }} />
				<ContactForm />
				<AuthButton
					onClickLogin={() => {
						setDisplayTabContainer('block');
						setDisplayTabButtons('block');
						setDisplayLogin('block');
						setDisplayRegServProv('none');
						setShowBackdrop(classes.backdropIn);
						setRegColor('white');
						setLoginColor('orange');
						focusInputHandler(loginInputId);
					}}
					onClickReg={() => {
						setDisplayTabContainer('block');
						setDisplayTabButtons('block');
						setDisplayRegServProv('block');
						setDisplayLogin('none');
						setShowBackdrop(classes.backdropIn);
						setRegColor('orange');
						setLoginColor('white');
					}}
					diplayBackdrop={
						// eslint-disable-next-line no-nested-ternary
						displayLogin === 'block' ? 'block' : displayRegServProv === 'block' ? 'block' : 'none'
					}
				/>
				{/* <button onClick={() => console.log(authenticate)}></button> */} {/* test za redux */}
				<Footer />
			</Layout>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const token = await nextCookie(ctx);

	if (token) {
		return { props: { token: true } };
	} else {
		return { props: { token: false } };
	}
}

export default Index;
