import { useState } from 'react';
import { fetchJson } from '../api/fetchJson';
import { withAuthSync } from '../helpers/withAuthSync';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	cookieReqParser,
} from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Backdrop from '../Components/UI/Backdrop';
import AddSaloonForm from '../Components/SetupForms/AddSaloonForm';
import AddEmployeeForm from '../Components/SetupForms/AddEmployeeForm';
import ResponseModal from '../Components/UI/Modal/ResponseModal';

import classes from '../Components/UI/UI.module.scss';
import TeamStatusForm from '../Components/SetupForms/TeamStatusForm';
import GreetingForm from '../Components/SetupForms/GreetingForm';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WorkingTimeForm from '../Components/SetupForms/WorkingTimeForm';

const setupguide = props => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [stepCounter, setStepCounter] = useState(1);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
	const [displayGreeting, setDisplayGreeting] = useState('block');
	const [displayteamStatusForm, setDisplayteamStatusForm] = useState('none');
	const [displayAddSaloonForm, setDisplayAddSaloonForm] = useState('none');
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('none');

	const nextStep = () => setStepCounter(setCounter => setCounter + 1);

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
				<div className={[classes.Form, classes.FormLayout].join(' ')}>
					<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
						VODIČ ZA PODEŠAVANJE
					</h2>
					<GreetingForm
						displayGreeting={displayGreeting}
						setDisplayGreeting={setDisplayGreeting}
						setDisplayteamStatusForm={setDisplayteamStatusForm}
						nextStep={nextStep}
					/>
					<TeamStatusForm
						displayteamStatusForm={displayteamStatusForm}
						setDisplayteamStatusForm={setDisplayteamStatusForm}
						setDisplayAddSaloonForm={setDisplayAddSaloonForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setShowResponseModal={setShowResponseModal}
						nextStep={nextStep}
						token={props.token}
					/>
					<AddSaloonForm
						displayAddSaloonForm={displayAddSaloonForm}
						setDisplayAddSaloonForm={setDisplayAddSaloonForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						nextStep={nextStep}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<AddEmployeeForm
						displayAddEmployeeForm={displayAddEmployeeForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						nextStep={nextStep}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<AddServicesForm
						displayAddServicesForm={displayAddServicesForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						nextStep={nextStep}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<WorkingTimeForm
						displayWorkingTimeForm={displayWorkingTimeForm}
						setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
						nextStep={nextStep}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<h4 className={classes.StepCounter}>Korak {stepCounter} od 10</h4>
				</div>
			</Layout>
		</>
	);
};

/* setupguide.getInitialProps = async ({ req, query }) => {
	const { id, type } = query;
	let cookiesString = req != undefined ? req.headers.cookie : '';
	let token = cookieReqParser(cookiesString, 'pdfgen_token');

	async function getUserParams() {
		const userParams = await fetchJson('/user-verification' + id + '/' + type, 'get', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(res => (res.status === 200 ? res.text() : ''))
			.catch(error => {
				console.log(error);
				return [];
			});

		if (userParams != undefined) {
			return userParams;
		}
	}

	return {
		getUserParams: await getUserParams(),
		id: id,
		type: type,
		token: token,
	};
};

export default setupguide; */
export default withAuthSync(setupguide);
