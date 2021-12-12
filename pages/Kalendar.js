import { useEffect, useState } from 'react';
import { fetchJson } from '../api/fetchJson';
import { auth } from '../helpers/auth';

import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Calendar from '../Components/Calendar/Calendar';

import classes from '../Components/Navigation/Navigation.module.scss';

const kalendar = props => {
	const [selectedEmployee, setSelectedEmployee] = useState(props.employees[0].id);
	const [clientFormBackdrop, setClientFormBackdrop] = useState('none');

	const clientFormBackdropShow = () => {
		setClientFormBackdrop('block');
	};

	const clientFormBackdropHide = () => {
		setClientFormBackdrop('none');
	};

	useEffect(() => {
		console.log('workingHours', props.workingHours);
		console.log('appointments', props.appointments);
	},[])

	return (
		<>
			<Head>
				<title>KlikTermin | Kalendar</title>
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
				selectData={props.employees}
				sms="10"
				license="5"
				setSelectedEmployee={setSelectedEmployee}>
				<Calendar
					displayBackdrop={clientFormBackdrop}
					showBackdrop={clientFormBackdropShow}
					hideBackdrop={clientFormBackdropHide}
					employees={props.employees}
					services={props.services}
					selectedEmployee={selectedEmployee}
					workingHours={props.workingHours}
					appointments={props.appointments}
				/>
			</Layout>
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
	const workingHoursUrl = `settings/getWorkingHours?employeeId=A34DAEF4-615E-48BD-2B71-08D9A67C247C&dateOfMonday=2021-12-06`
	const workingHours = await fetchJson(workingHoursUrl, 'get', token).then(res => res.data);
	const appointmentUrl = `appointments/getAppointments?employeeId=A34DAEF4-615E-48BD-2B71-08D9A67C247C&dateOfMonday=2021-12-06`
	const appointments = await fetchJson(appointmentUrl, 'get', token).then(res => res.data);

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
			workingHours,
			appointments
		},
	};
}

export default kalendar;
