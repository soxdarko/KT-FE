import { useState, useEffect, useRef } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import nextCookie from 'next-cookies';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ClientsList from '../Components/Clients/ClientsList';
import AddClientForm from '../Components/Clients/AddClientForm';

import classes from '../Components/Navigation/Navigation.module.scss';

const Clients = props => {
	return (
		<>
			<Head>
				<title>KlikTermin | Lista klienata</title>
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
				/* backdropAnimation={showBackdrop} */
				onClick={() => {
					setShowBackdrop(classes.backdropOut),
						setShowConfirmModal(classes.modalDown),
						setShowInviteClient(classes.slideOutLeft);
				}}
			/>
			<AddClientForm serviceProviders={props.serviceProviders} />
			<ListHead
				displayCopy="none"
				displayPaste="none"
				displaySelectWeek="none"
				displaySave="none"
				displayLink="none"
				add="klijenta"
				/* onAdd={} */
			/>
			<ListBody>
				<ClientsList />
			</ListBody>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const token = await auth(ctx);
	const serviceProvidersUrl = `users/getAllServiceProviders`;
	const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token);
	const employeesUrl = `users/getAllEmployees`;
	const resEmployees = await fetchJson(employeesUrl, 'get', token);
	const servicesUrl = `appointments/getAllServices`;
	const resServices = await fetchJson(servicesUrl, 'get', token);
	const guideStatusUrl = `users/getCompanyGuideStatus`;
	const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);

	const serviceProviders = resServiceProviders.data.map(name => {
		return name;
	});

	const employees = resEmployees.data.map(name => {
		return name;
	});

	const services = resServices.data.map(name => {
		return name;
	});

	const userStatus = resGuideStatusUrl.data;

	return {
		props: {
			token,
			serviceProviders,
			employees,
			services,
			userStatus,
		},
	};
}

export default Clients;