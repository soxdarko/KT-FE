import { useState, useEffect, useRef } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ServicesList from '../Components/Services/ServicesList';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WrappedTools from '../Components/UI/WrappedTools';
import CheckBox from '../Components/UI/CheckBox';
import Input from '../Components/UI/Forms/Input';
import Label from '../Components/UI/Forms/Label';

import classes from '../Components/Navigation/Navigation.module.scss';
import classesSetupForms from '../Components/SetupForms/SetupForms.module.scss';

const Services = props => {
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');

	return (
		<>
			<Head>
				<title>KlikTermin | Lista usluga</title>
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
			<WrappedTools
				displayWrappedTools={displayWrappedTools}
				setDisplayWrappedTools={setDisplayWrappedTools}
				className={[classes.WrappedToolsContainer, classes.WrappedToolsWithChkBox].join(' ')}
				displayWrappedToolsChkBox="flex">
				<div>
					<CheckBox name="omiljenaUsluga" className={classes.addForSelectedServiceOptions} />
					<p>Omiljena usluga?</p>
				</div>
				<div>
					<CheckBox name="izabranaUsluga" className={classes.addForSelectedServiceOptions} />
					<p>Uvek izabrana usluga?</p>
				</div>
				<div>
					<CheckBox name="koristimUslugu" className={classes.addForSelectedServiceOptions} />
					<p>Koristim uslugu!</p>
				</div>
				<div>
					<CheckBox name="klijentiVideCenu" className={classes.addForSelectedServiceOptions} />
					<p>Klijenti vide cenu usluge?</p>
				</div>
				<div>
					<CheckBox
						name="klijentiVideUslugu"
						className={classes.addForSelectedServiceOptions}
						defaultChecked
					/>
					<p>Klijenti vide uslugu?</p>
				</div>
			</WrappedTools>
			<div
				className={[classesSetupForms.Form, classesSetupForms.FormLayout].join(' ')}
				style={{ display: displayAddServicesForm }}>
				<AddServicesForm
					displayAddServicesForm={displayAddServicesForm}
					setDisplayAddServicesForm={setDisplayAddServicesForm}
					serviceProviderData={props.serviceProviders}
					servicesData={props.services}
					employeeData={props.employees}
					displayForward="none"
					displayStopEdit="block"
				/>
			</div>
			<ListHead
				displayCopy="none"
				displayPaste="none"
				displaySelectWeek="none"
				displaySave="none"
				displayLink="none"
				add="uslugu"
				addNew={faPlus}
				onAdd={() => setDisplayAddServicesForm('block')}
			/>
			<ListBody>
				<ServicesList
					services={props.services}
					setDisplayWrappedTools={setDisplayWrappedTools}
					services={props.services}
				/>
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

export default Services;
