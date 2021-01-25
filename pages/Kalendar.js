import { useState } from 'react';
import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';

import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Calendar from '../Components/Calendar/Calendar';

import classes from '../Components/Navigation/Navigation.module.scss';

const kalendar = () => {
	const [clientFormBackdrop, setClientFormBackdrop] = useState('none');

	const clientFormBackdropShow = () => {
		setClientFormBackdrop('block');
	};

	const clientFormBackdropHide = () => {
		setClientFormBackdrop('none');
	};
	return (
		<>
			<Head>
				<title>Kalendar</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout
				displayLoginBtn="none"
				displayRegisterBtn="none"
				displayToolbarNavBtn="none"
				displayToolbarBookingBtn="none"
				displayNotifLabel="block"
				colorCalIcon="#fc9815"
				classNameCal={classes.sideDrawerButtonActive}
				classNameClients={classes.sideDrawerButton}
				classNameServices={classes.sideDrawerButton}
				classNameProfile={classes.sideDrawerButton}
				classNameEmployeeSelect={classes.EmployeeSelect}
				selectData={ServiceProvidersEmployees}
				sms="10"
				license="5">
				<Calendar
					displayBackdrop={clientFormBackdrop}
					showBackdrop={clientFormBackdropShow}
					hideBackdrop={clientFormBackdropHide}
				/>
			</Layout>
		</>
	);
};

export default kalendar;
