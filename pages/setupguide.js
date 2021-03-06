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
import AddSaloonForm from '../Components/SetupForms/addSaloonForm';
import AddEmployeeForm from '../Components/SetupForms/AddEmployeeForm';
import ResponseModal from '../Components/UI/Modal/ResponseModal';

import classes from '../Components/UI/UI.module.scss';

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
	const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('block');
	const [newEmployee, setNewEmployee] = useState('none');
	const [question, setQuestion] = useState({
		message: 'Da li imate više salona?',
		displaySaloon: 'block',
		displayEmployee: 'none',
	});

	const nextStep = () => setStepCounter(setCounter => setCounter + 1);

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

	const greetingForm = (
		<form style={{ display: displayGreeting }} className={classes.GuideForm}>
			<h3>Dobrodošli!</h3>
			<DescriptionLabel
				text={
					'Čestitamo na odluci koja će unaprediti Vaše poslovanje. Napisati tekst koji će navesti usera da isprati vodič do kraja'
				}
				className={classes.DesciptionLabel}
				margin="20px 0 50px 0"
				color="orange"
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				onClick={() => {
					setDisplayGreeting('none'), setDisplayteamStatusForm('block'), nextStep();
				}}
			/>
		</form>
	);

	const teamStatusForm = (
		<form style={{ display: displayteamStatusForm }} className={classes.GuideForm}>
			<h3>{question.message}</h3>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displaySaloon }}>
				<Input
					type="button"
					value="DA"
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={() => {
						setDisplayteamStatusForm('none'), setDisplayAddSaloonForm('block'), nextStep();
					}}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={() => {
						nextStep(),
							setQuestion({
								...question,
								message: 'Da li ste jedini zaposleni?',
								displaySaloon: 'none',
								displayEmployee: 'block',
							});
					}}
				/>
			</div>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displayEmployee }}>
				<Input
					type="button"
					value="DA" //Unos radnika u bazu na osnovu registracionih podataka
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={() => {
						setDisplayteamStatusForm('none'), nextStep();
					}}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={() => {
						setDisplayteamStatusForm('none'), nextStep();
					}}
				/>
			</div>
		</form>
	);

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
					{greetingForm}
					{teamStatusForm}
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
					<h4 className={classes.StepCounter}>Korak {stepCounter} od 10</h4>
				</div>
			</Layout>
		</>
	);
};

export default setupguide;
