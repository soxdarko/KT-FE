import { useState } from 'react';
import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';
import axios from 'axios';
import { auth } from '../helpers/auth';

import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Calendar from '../Components/Calendar/Calendar';

import classes from '../Components/Navigation/Navigation.module.scss';

const kalendar = () => {
	const [clientFormBackdrop, setClientFormBackdrop] = useState('none');
	const [displayAddServiceProvidersForm, setDisplayAddServiceProvidersForm] = useState('none');
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('none');

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

/* export async function getServerSideProps(ctx) {
	const url = 'http://localhost:3000/api/auth';
	const token = ctx.req.headers.cookie;
	const res = await axios
		.post(url, {
			headers: { Authorization: 'Bearer ' + token },
		})
		.then(response => {
			return response;
		});
	const data = res.json();

	return { props: { data } };
} */

export default kalendar;
