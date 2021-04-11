import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	cookieReqParser,
} from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import AddServiceProvidersForm from '../Components/SetupForms/AddServiceProvidersForm';
import AddEmployeeForm from '../Components/SetupForms/AddEmployeeForm';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ServiceProviderQuestionForm from '../Components/SetupForms/ServiceProviderQuestionForm';
import EmployeeQuestionForm from '../Components/SetupForms/EmployeesQuestionForm';
import GreetingForm from '../Components/SetupForms/GreetingForm';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WorkingTimeForm from '../Components/SetupForms/WorkingTimeForm';
import Loader from '../Components/UI/Loader';

import classes from '../Components/SetupForms/SetupForms.module.scss';

const setupguide = props => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;

	const [serviceProviderData, setServiceProviderData] = useState(props.serviceProviders);
	const [employeeData, setEmployeeData] = useState(props.employees);

	const isServiceProvider = props.serviceProviders.length !== 0 ? true : false;
	const [singleEmployee, setSingleEmployee] = useState(false);
	const [listOfEmployees, setListOfEmployees] = useState(props.employees);

	const [isLoading, setIsLoading] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
	const [displayGreeting, setDisplayGreeting] = useState('none');
	const [displayServiceProviderQuestionForm, setDisplayServiceProviderQuestionForm] = useState(
		'none'
	);
	const [displayEmployeeQuestionForm, setDisplayEmployeeQuestionForm] = useState('none');
	const [displayAddServiceProvidersForm, setDisplayAddServiceProvidersForm] = useState('block');
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('none');

	return (
		<>
			<Head>
				<title>Vodič kroz podešavanja|KlikTermin</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
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
				<div className={[classes.Form, classes.FormLayout].join(' ')}>
					<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
						VODIČ ZA PODEŠAVANJE
					</h2>
					<GreetingForm
						displayGreeting={displayGreeting}
						setDisplayGreeting={setDisplayGreeting}
						setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						token={props.token}
						isServiceProvider={isServiceProvider}
					/>
					<ServiceProviderQuestionForm
						displayServiceProviderQuestionForm={displayServiceProviderQuestionForm}
						setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
						token={props.token}
						isServiceProvider={isServiceProvider}
						serviceProviderData={serviceProviderData}
						setServiceProviderData={setServiceProviderData}
						setIsLoading={setIsLoading}
					/>
					<EmployeeQuestionForm
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						displayEmployeeQuestionForm={displayEmployeeQuestionForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						singleEmployee={singleEmployee}
						setSingleEmployee={setSingleEmployee}
						token={props.token}
						isServiceProvider={isServiceProvider}
						serviceProviderData={serviceProviderData}
						setIsLoading={setIsLoading}
					/>
					<AddServiceProvidersForm
						displayAddServiceProvidersForm={displayAddServiceProvidersForm}
						setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						token={props.token}
						/* serviceProviders={props.serviceProviders} */
						serviceProviderData={serviceProviderData}
						setServiceProviderData={setServiceProviderData}
						setIsLoading={setIsLoading}
					/>
					<AddEmployeeForm
						displayAddEmployeeForm={displayAddEmployeeForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setListOfEmployees={setListOfEmployees}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						token={props.token}
						serviceProviderData={serviceProviderData}
						employeeData={employeeData}
						setEmployeeData={setEmployeeData}
						setIsLoading={setIsLoading}
					/>
					<AddServicesForm
						displayAddServicesForm={displayAddServicesForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						serviceProviders={props.serviceProviders}
						singleEmployee={singleEmployee}
						setSingleEmployee={setSingleEmployee}
						listOfEmployees={listOfEmployees}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						token={props.token}
						employees={props.employees}
						setIsLoading={setIsLoading}
					/>
					<WorkingTimeForm
						displayWorkingTimeForm={displayWorkingTimeForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						listOfEmployees={listOfEmployees}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						employees={props.employees}
						token={props.token}
						setIsLoading={setIsLoading}
					/>
				</div>
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

	const serviceProviders = resServiceProviders.data.map(name => {
		return name;
	});

	const employees = resEmployees.data.map(name => {
		return name;
	});

	return {
		props: {
			token,
			serviceProviders,
			employees,
		},
	};
}

export default setupguide;
