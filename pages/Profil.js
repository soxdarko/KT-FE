import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Profile from '../Components/Profile/Profile';

import classes from '../Components/Navigation/Navigation.module.scss';

import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';

const Profil = () => (
	<>
		<Head>
			<title>Podešavanja</title>
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
		<Profile />
	</>
);

export default Profil;
