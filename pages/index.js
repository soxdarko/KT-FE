import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useDeviceDetect from '../utils/UseDeviceDetect';

import Layout from '../Components/hoc/Layout/Layout';
import NavItem from '../Components/Navigation/NavItem';
import NavItems from '../Components/Navigation/NavItems';
import Slider from '../Components/HomePage/Slider';
import Login from '../Components/Auth/Login/Login';
import RegServProv from '../Components/Auth/RegServProv/RegServProv';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import ClientVerification from '../Components/Auth/ClientVerification';
import ContactForm from '../Components/HomePage/forms/ContactForm';
import Footer from '../Components/HomePage/Footer';
import AuthButton from '../Components/HomePage/AuthButton';

import classes from '../Components/Navigation/Navigation.module.scss';
import OurServices from '../Components/HomePage/OurServices/OurServices';

const Index = () => {
	const { isMobile } = useDeviceDetect();
	const [displayLogin, setDisplayLogin] = useState('none');
	const [displayRegServProv, setDisplayRegServProv] = useState('none');
	/* const [displayRegClient, setDisplayRegClient] = useState('none'); */
	const [displayClientVerify, setDisplayClientVerify] = useState('none');
	const [displayPassRecovery, setDisplayPassRecovery] = useState('none');

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
			<Link href="/Kalendar">
				<NavItem link="/Kalendar" className={classes.IndexBookingButton} marginLeft="375px">
					<a>Rezerviši termin</a>
				</NavItem>
			</Link>
		</NavItems>
	);

	const RegistrationAndLogin = (
		<>
			<Login
				displayLogin={displayLogin}
				setDisplayLogin={setDisplayLogin}
				setDisplayPassRecovery={setDisplayPassRecovery}
				setDisplayRegServProv={setDisplayRegServProv}
			/>
			<RegServProv
				displayRegServProv={displayRegServProv}
				setDisplayRegServProv={setDisplayRegServProv}
			/>
			<ClientVerification
				displayClientVerify={displayClientVerify}
				setDisplayClientVerify={setDisplayClientVerify}
			/>
			<PassRecovery
				displayPassRecovery={displayPassRecovery}
				setDisplayPassRecovery={setDisplayPassRecovery}
			/>
		</>
	);

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
				{RegistrationAndLogin}
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
				<Footer />
			</Layout>
		</>
	);
};

export default Index;
