import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import authenticate from '../redux/actions/authActions';
import nextCookie from 'next-cookies';
import Link from 'next/link';
import Head from 'next/head';
import { useDeviceDetect } from '../helpers/universalFunctions';
import { fetchJson } from '../api/fetchJson';

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
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Index = props => {
	const { isMobile } = useDeviceDetect();
	const router = useRouter();
	const isPageLoad = useRef(true);
	const token = props.token;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [isLoading, setIsLoading] = useState(false);
	const [userStatus, setUserStatus] = useState('');
	const [showBackdrop, setShowBackdrop] = useState('');
	const [displayLogin, setDisplayLogin] = useState('none');
	const [displayRegServProv, setDisplayRegServProv] = useState('none');
	const [displayClientVerify, setDisplayClientVerify] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});

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
				onClick={() => setDisplayLogin('block')}>
				<a>Prijava</a>
			</NavItem>
			<NavItem
				link="/"
				className={classes.IndexToolbarNavBtn}
				displayRegBtn="block"
				marginLeft="85px"
				onClick={() => setDisplayRegServProv('block')}>
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

	const Authentifiacion = (
		<>
			<Backdrop backdropAnimation={showBackdrop} />
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
			<Login
				displayLogin={displayLogin}
				modalAnimation={showResponseModal.animation}
				setDisplayLogin={setDisplayLogin}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setDisplayRegServProv={setDisplayRegServProv}
				setShowBackdrop={setShowBackdrop}
				setShowResponseModal={setShowResponseModal}
				setIsLoading={setIsLoading}
				setUserStatus={setUserStatus}
				/* setCookie={setCookie} */
			/>
			<RegServProv
				displayRegServProv={displayRegServProv}
				setDisplayRegServProv={setDisplayRegServProv}
				setIsLoading={setIsLoading}
				setShowBackdrop={setShowBackdrop}
				setShowResponseModal={setShowResponseModal}
			/>
			<ClientVerification
				displayClientVerify={displayClientVerify}
				setDisplayClientVerify={setDisplayClientVerify}
			/>
			<PassRecovery
				displayPassRecovery={displayPassRecovery}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setShowBackdrop={setShowBackdrop}
				setShowResponseModal={setShowResponseModal}
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
		} else if (
			(userStatus.guideStatus === 'WorkingHours' && userStatus.userRole === 'Company') ||
			userStatus.userRole === 'ServiceProvider' ||
			userStatus.userRole === 'Employee'
		) {
			/* router.push('/kalendar'); */ router.push('/setupguide');
		} else if (userStatus.userRole === 'Client') {
			alert('presmeriti klijenta na klijent kalendar stranicu');
		} else {
			router.push('/');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userStatus]);

	return (
		<>
			<Head>
				<title>KlikTermin</title>
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
				{Authentifiacion}
				{Navigation}
				<Slider />
				<OurServices />
				<hr style={{ marginTop: isMobile ? '10px' : '40px' }} />
				<ContactForm />
				<AuthButton
					onClickLogin={() => setDisplayLogin('block')}
					onClickReg={() => setDisplayRegServProv('block')}
					diplayBackdrop={
						// eslint-disable-next-line no-nested-ternary
						displayLogin === 'block' ? 'block' : displayRegServProv === 'block' ? 'block' : 'none'
					}
				/>
				<button onClick={() => console.log(authenticate)}></button> {/* test za redux */}
				<Footer />
			</Layout>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const token = await nextCookie(ctx);

	if (token) {
		return console.log(token), { props: { token: true } };
	} else {
		return { props: { token: false } };
	}
}

export default Index;
