import { useState, useEffect, useRef } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import { getAllServices } from '../api/getAllServices';
import initServiceProviderForm from '../Components/SetupForms/initServiceProviderForm';
import initEmployeeForm from '../Components/SetupForms/initEmployeeForm';
import initServicesForm from '../Components/SetupForms/initServicesForm';
import Backdrop from '../Components/UI/Backdrop';
import AddServiceProvidersForm from '../Components/SetupForms/AddServiceProvidersForm';
import AddEmployeeForm from '../Components/SetupForms/AddEmployeeForm';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ServiceProviderQuestionForm from '../Components/SetupForms/ServiceProviderQuestionForm';
import EmployeeQuestionForm from '../Components/SetupForms/EmployeesQuestionForm';
import GreetingForm from '../Components/SetupForms/GreetingForm';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WorkingTimeForm from '../Components/SetupForms/WorkingTimeForm';
import Loader from '../Components/UI/Loader';

import classes from '../Components/SetupForms/SetupForms.module.scss';

const setupguide = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [serviceProviderData, setServiceProviderData] = useState(props.serviceProviders);
	const [employeeData, setEmployeeData] = useState(props.employees);
	const isServiceProvider = props.serviceProviders.length !== 0 ? true : false;
	const [singleEmployee, setSingleEmployee] = useState(false);
	const [listOfEmployees, setListOfEmployees] = useState(props.employees);
	const [servicesData, setServicesData] = useState(props.services);
	const [isLoading, setIsLoading] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [showInfoModal, setShowInfoModal] = useState('');
	const [completnessMessage, setCompletnessMessage] = useState('Uspešno sačuvano!'); //za sada nije bilo potrebe za izmenom teksta
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
	const [displayGreeting, setDisplayGreeting] = useState('block');
	const [displayServiceProviderQuestionForm, setDisplayServiceProviderQuestionForm] = useState(
		'none'
	);
	const [displayEmployeeQuestionForm, setDisplayEmployeeQuestionForm] = useState('none');
	const [displayAddServiceProvidersForm, setDisplayAddServiceProvidersForm] = useState('none');
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('none');
	const serviceProviderDatails = serviceProviderData.map(data => {
		return {
			id: data.id,
			name: data.name,
		};
	});
	const userGuideStatus = props.userStatus;
	const [editMode, setEditMode] = useState(false);
	const [checkedEmployees, setCheckedEmployees] = useState([]);
	const [servProvFormInput, setServProvFormInput] = useState(initServiceProviderForm);
	const [serviceProviderInfo, setServiceProviderInfo] = useState([]);
	const [serviceProvidersList, setServiceProvidersList] = useState([]);
	const [serviceProviderId, setServiceProviderId] = useState(null);
	const [servicesFormInput, setServicesFormInput] = useState(initServicesForm);
	const [emplyeesFormInput, setEmplyeesFormInput] = useState(initEmployeeForm);
	const [employeeId, setEmployeeId] = useState(null);
	const [workingTimeFormInput, setWorkingTimeFormInput] = useState([]);
	const [workingHoursData, setWorkingHoursData] = useState({});

	const errorMessage = message => {
		responseHandler(setShowResponseModal, modalAnimationIn, message, 'red');
		setShowBackdrop(classes.backdropIn);
		setIsLoading(false);
	};

	const completnessMessageHandler = message => {
		setShowInfoModal(modalAnimationIn);
		setIsLoading(false);
		setCompletnessMessage(message);
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const autoModalDisplay = () => {
			setShowInfoModal(modalAnimationOut);
		};

		const timer = setTimeout(() => {
			autoModalDisplay();
		}, 2000);

		return () => clearTimeout(timer);
	}, [showInfoModal]);

	const getAllServicesHandler = async () => {
		const api = await getAllServices()
			.then(response => {
				const getServicesData = response.data.map(service => {
					return service;
				});
				setServicesData(getServicesData);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		return api;
	};

	return (
		<>
			<Head>
				<title>KlikTermin | Podešavanja</title>
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
				<Backdrop backdropAnimation={showBackdrop} />
				<InfoModal
					message={completnessMessage}
					modalAnimation={showInfoModal}
					borderColor="green"
				/>
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
				<div className={[classes.Form, classes.FormLayout, classes.FormBlackBg].join(' ')}>
					<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
						VODIČ ZA PODEŠAVANJE
					</h2>
					<GreetingForm
						displayGreeting={displayGreeting}
						setDisplayGreeting={setDisplayGreeting}
						setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						isServiceProvider={isServiceProvider}
						userGuideStatus={userGuideStatus.guideStatus}
					/>
					<ServiceProviderQuestionForm
						displayServiceProviderQuestionForm={displayServiceProviderQuestionForm}
						setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
						isServiceProvider={isServiceProvider}
						serviceProviderData={serviceProviderData}
						setServiceProviderData={setServiceProviderData}
						setIsLoading={setIsLoading}
						userGuideStatus={userGuideStatus.guideStatus}
						setDisplayGreeting={setDisplayGreeting}
					/>
					<EmployeeQuestionForm
						setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
						displayEmployeeQuestionForm={displayEmployeeQuestionForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						singleEmployee={singleEmployee}
						setSingleEmployee={setSingleEmployee}
						isServiceProvider={isServiceProvider}
						serviceProviderData={serviceProviderData}
						setIsLoading={setIsLoading}
						userGuideStatus={userGuideStatus.guideStatus}
						setDisplayGreeting={setDisplayGreeting}
					/>
					<AddServiceProvidersForm
						displayAddServiceProvidersForm={displayAddServiceProvidersForm}
						setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						initServiceProviderForm={initServiceProviderForm}
						servProvFormInput={servProvFormInput}
						setServProvFormInput={setServProvFormInput}
						serviceProviderData={serviceProviderData}
						setServiceProviderData={setServiceProviderData}
						serviceProviderInfo={serviceProviderInfo}
						setServiceProviderInfo={setServiceProviderInfo}
						serviceProvidersList={serviceProvidersList}
						setServiceProvidersList={setServiceProvidersList}
						serviceProviderId={serviceProviderId}
						setServiceProviderId={setServiceProviderId}
						editMode={editMode}
						setEditMode={setEditMode}
						setIsLoading={setIsLoading}
						errorMessage={errorMessage}
						displayStopEdit="none"
						displayStopEditMob="none"
						completnessMessage={completnessMessage}
						isSetupGuide={true}
						validation={true}
					/>
					<AddEmployeeForm
						displayAddEmployeeForm={displayAddEmployeeForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setListOfEmployees={setListOfEmployees}
						setShowBackdrop={setShowBackdrop}
						setShowResponseModal={setShowResponseModal}
						serviceProviderData={serviceProviderData}
						initEmployeeForm={initEmployeeForm}
						emplyeesFormInput={emplyeesFormInput}
						setEmplyeesFormInput={setEmplyeesFormInput}
						employeeData={employeeData}
						setEmployeeData={setEmployeeData}
						employeeId={employeeId}
						setEmployeeId={setEmployeeId}
						editMode={editMode}
						setEditMode={setEditMode}
						displayForward={isMobile ? 'none' : 'block-block'}
						displayForwardMob={isMobile ? 'block' : 'none'}
						resetForm={() => {
							setEmployeeId(null);
							setEmplyeesFormInput(initEmployeeForm);
							setEditMode(false);
						}}
						setIsLoading={setIsLoading}
						modalAnimationIn={modalAnimationIn}
						displayStopEdit={editMode && !isMobile ? 'inline-block' : 'none'}
						displayStopEditMob={editMode ? 'inline-block' : 'none'}
						completnessMessageHandler={completnessMessageHandler}
						errorMessage={errorMessage}
						validation={true}
						isSetupGuide={true}
					/>
					<AddServicesForm
						displayAddServicesForm={displayAddServicesForm}
						setServicesData={setServicesData}
						servicesData={servicesData}
						initServicesForm={initServicesForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						serviceProviders={props.serviceProviders}
						employeeData={employeeData}
						listOfEmployees={listOfEmployees}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						checkedEmployees={checkedEmployees}
						setCheckedEmployees={setCheckedEmployees}
						servicesFormInput={servicesFormInput}
						setServicesFormInput={setServicesFormInput}
						serviceProviderData={serviceProviderData}
						serviceProviderId={serviceProviderId}
						setIsLoading={setIsLoading}
						serviceData={servicesData}
						editMode={editMode}
						setEditMode={setEditMode}
						abortAddService={null}
						resetForm={() => setServicesFormInput(initServicesForm)}
						userGuideStatus={userGuideStatus.guideStatus}
						setDisplayGreeting={setDisplayGreeting}
						displayEmployeesPicker="block"
						displayForward={isMobile ? 'none' : 'block-block'}
						displayForwardMob={isMobile ? 'block' : 'none'}
						errorMessage={errorMessage}
						setCompletnessMessage={setCompletnessMessage}
						modalAnimationIn={modalAnimationIn}
						completnessMessageHandler={completnessMessageHandler}
						displayStopEdit="none"
						displayStopEditMob="none"
						validation={true}
						isSetupGuide={true}
						displayCancel="none"
						getAllServicesHandler={getAllServicesHandler}
					/>
					<WorkingTimeForm
						displayWorkingTimeForm={displayWorkingTimeForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						listOfEmployees={listOfEmployees}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
						serviceProviderData={serviceProviderData}
						employeeId={employeeId}
						setEmployeeId={setEmployeeId}
						setServiceProviderId={setServiceProviderId}
						serviceProviderId={serviceProviderId}
						workingTimeFormInput={workingTimeFormInput}
						setWorkingTimeFormInput={setWorkingTimeFormInput}
						workingHoursData={workingHoursData}
						setWorkingHoursData={setWorkingHoursData}
						setIsLoading={setIsLoading}
						userGuideStatus={userGuideStatus.guideStatus}
						setDisplayGreeting={setDisplayGreeting}
						errorMessage={errorMessage}
						modalAnimationIn={modalAnimationIn}
						completnessMessageHandler={completnessMessageHandler}
						completnessMessage={completnessMessage}
						displayStopEdit="none"
						displayStopEditMob="none"
						validation={employeeId}
						isSetupGuide={true}
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

export default setupguide;
