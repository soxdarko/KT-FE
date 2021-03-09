import { useState } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
} from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Form from '../Components/UI/Forms/Form';
import Input from '../Components/UI/Forms/Input';
import Select from '../Components/UI/Select';
import DescriptionLabel from '../Components/UI/DescriptionLabel';
import Backdrop from '../Components/UI/Backdrop';
import AddSaloonForm from '../Components/SetupForms/AddSaloonForm';
import AddEmployeeForm from '../Components/SetupForms/AddEmployeeForm';
import ResponseModal from '../Components/UI/Modal/ResponseModal';

import classes from '../Components/UI/UI.module.scss';
import TeamStatusForm from '../Components/SetupForms/TeamStatusForm';
import GreetingForm from '../Components/SetupForms/GreetingForm';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WorkingTimeForm from '../Components/SetupForms/WorkingTimeForm';

const setupguide = () => {
	const { isMobile } = useDeviceDetect();
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [stepCounter, setStepCounter] = useState(1);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});
	const [displayGreeting, setDisplayGreeting] = useState('none');
	const [displayteamStatusForm, setDisplayteamStatusForm] = useState('none');
	const [displayAddSaloonForm, setDisplayAddSaloonForm] = useState('none');
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
	const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
	const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('block');

	const nextStep = () => setStepCounter(setCounter => setCounter + 1);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

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
						nextStep={nextStep}
					/>
					<AddSaloonForm
						displayAddSaloonForm={displayAddSaloonForm}
						setDisplayAddSaloonForm={setDisplayAddSaloonForm}
						nextStep={nextStep}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<AddEmployeeForm
						displayAddEmployeeForm={displayAddEmployeeForm}
						setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
						nextStep={nextStep}
						modalAnimation={showResponseModal.animation}
						setShowResponseModal={setShowResponseModal}
						setShowBackdrop={setShowBackdrop}
					/>
					<AddServicesForm
						displayAddServicesForm={displayAddServicesForm}
						setDisplayAddServicesForm={setDisplayAddServicesForm}
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

export default setupguide;
