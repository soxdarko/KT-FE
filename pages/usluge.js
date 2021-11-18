import { useState, useEffect, useRef } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import initServicesForm from '../Components/SetupForms/initServicesForm';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import ServicesList from '../Components/Services/ServicesList';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WrappedTools from '../Components/UI/WrappedTools';
import CheckBox from '../Components/UI/CheckBox';

import classes from '../Components/Navigation/Navigation.module.scss';

const Services = props => {
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
	const [formInput, setFormInput] = useState(initServicesForm);
	const [servicesData, setServicesData] = useState(props.services);
	const [serviceId, setServiceId] = useState(null);
	const [checkedEmployees, setCheckedEmployees] = useState([]);
	const [displayDescription, setDisplayDescription] = useState('none');
	const [descriptionEdit, setDescriptionEdit] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [dipslaySerachBar, setDipslaySerachBar] = useState('none');
	const [searchInput, setSearchInput] = useState('');

	const resetForm = () => {
		if (descriptionEdit) {
			return;
		} else {
			setServiceId(null), setFormInput(initClientForm), setEditMode(false);
		}
	};

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
			<Backdrop backdropAnimation={showBackdrop} />
			<WrappedTools
				displayWrappedTools={displayWrappedTools}
				setDisplayWrappedTools={setDisplayWrappedTools}
				descriptionEdit={descriptionEdit}
				setDescriptionEdit={setDescriptionEdit}
				formInput={formInput}
				setFormInput={setFormInput}
				setDataId={setServiceId}
				initServicesForm={initServicesForm}
				setEditMode={setEditMode}
				className={[classes.WrappedToolsContainer, classes.WrappedToolsWithChkBox].join(' ')}
				displayWrappedToolsChkBox="flex">
				<div>
					<CheckBox name="omiljenaUsluga" className={classes.addForSelected} />
					<p>Omiljena usluga?</p>
				</div>
				<div>
					<CheckBox name="izabranaUsluga" className={classes.addForSelected} />
					<p>Uvek izabrana usluga?</p>
				</div>
				<div>
					<CheckBox name="koristimUslugu" className={classes.addForSelected} />
					<p>Koristim uslugu!</p>
				</div>
				<div>
					<CheckBox name="klijentiVideCenu" className={classes.addForSelected} />
					<p>Klijenti vide cenu usluge?</p>
				</div>
				<div>
					<CheckBox name="klijentiVideUslugu" className={classes.addForSelected} defaultChecked />
					<p>Klijenti vide uslugu?</p>
				</div>
			</WrappedTools>
			<div className={[classes.Form, classes.FormLayout].join(' ')} style={{ zIndex: 999 }}>
				<AddServicesForm
					displayAddServicesForm={displayAddServicesForm}
					setDisplayAddServicesForm={setDisplayAddServicesForm}
					serviceProviderData={props.serviceProviders}
					initServicesForm={initServicesForm}
					servicesFormInput={formInput}
					setServicesFormInput={setFormInput}
					servicesData={servicesData}
					setServicesData={setServicesData}
					serviceId={serviceId}
					setServiceId={setServiceId}
					employeeData={props.employees}
					checkedEmployees={checkedEmployees}
					editMode={editMode}
					setEditMode={setEditMode}
					setShowBackdrop={setShowBackdrop}
					setCheckedEmployees={setCheckedEmployees}
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
				onAdd={() => {
					setDisplayAddServicesForm('block'), setShowBackdrop(classes.backdropIn);
				}}
				onClickSearch={() => setDipslaySerachBar('flex')}
				dipslaySerachBar={dipslaySerachBar}
				setDipslaySerachBar={setDipslaySerachBar}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<ListBody>
				<ServicesList
					servicesData={props.services}
					setDisplayWrappedTools={setDisplayWrappedTools}
					serviceId={serviceId}
					setServiceId={setServiceId}
					services={props.services}
					searchInput={searchInput}
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
