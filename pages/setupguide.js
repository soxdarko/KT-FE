import { useState } from 'react';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
} from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import Form from '../Components/UI/Forms/Form';
import Label from '../Components/UI/Forms/Form';
import Input from '../Components/UI/Forms/Input';
import Select from '../Components/UI/Select';
import DescriptionLabel from '../Components/UI/DescriptionLabel';

import classes from '../Components/UI/UI.module.scss';

const setupguide = () => {
	const { isMobile } = useDeviceDetect();
	const [stepCounter, setStepCounter] = useState(1);
	const [displayGreeting, setDisplayGreeting] = useState('block');
	const [displayteamStatusForm, setDisplayteamStatusForm] = useState('none');
	const [newSaloonForm, setNewSaloonForm] = useState('none');
	const [newEmployee, setNewEmployee] = useState('none');
	const [question, setQuestion] = useState({
		message: 'Da li imate više salona?',
		displaySaloon: 'block',
		displayEmployee: 'none',
	});

	const [newSaloon, setNewSaloon] = useState([{}]);

	const [saloonInput, setSaloonInput] = useState({
		saloonName: {
			value: '',
			touched: false,
			valid: true,
		},
		address: {
			value: '',
			touched: false,
			valid: true,
		},
		city: {
			value: '',
			touched: false,
			valid: true,
		},
		mobOperator: {
			value: '',
			touched: false,
			valid: true,
		},
		phone: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	const [employeeInput, setEmployeeInput] = useState({
		name: {
			value: '',
			touched: false,
			valid: true,
		},
		mobOperator: {
			value: '',
			touched: false,
			valid: true,
		},
		phone: {
			value: '',
			touched: false,
			valid: true,
		},
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
						setDisplayteamStatusForm('none'), setNewSaloonForm('block'), nextStep();
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

	const SaloonInputForm = (
		<div style={{ display: newSaloonForm }}>
			<h3>Unesite podatke salona</h3>
			<Input
				type="text"
				name="saloonName"
				placeholder="Naziv salona"
				className={inputClassName}
				value={saloonInput.saloonName.value}
				onChange={e => inputChangedHandler(e, 'saloonName', saloonInput, setSaloonInput)}
				invalid={!saloonInput.mobOperator.valid}
			/>
			<Input
				type="text"
				name="city"
				placeholder="Grad"
				className={inputClassName}
				value={saloonInput.city.value}
				onChange={e => inputChangedHandler(e, 'city', saloonInput, setSaloonInput)}
				invalid={!saloonInput.mobOperator.valid}
			/>
			<Input
				type="text"
				name="address"
				placeholder="Adresa"
				className={inputClassName}
				value={saloonInput.address.value}
				onChange={e => inputChangedHandler(e, 'address', saloonInput, setSaloonInput)}
				invalid={!saloonInput.mobOperator.valid}
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value={saloonInput.mobOperator.value}
				onChange={e => inputChangedHandler(e, 'mobOperator', saloonInput, setSaloonInput)}
				invalid={!saloonInput.mobOperator.valid}>
				<option value="060">060</option>
				<option value="061">061</option>
				<option value="062">062</option>
				<option value="063">063</option>
				<option value="064">064</option>
				<option value="065">065</option>
				<option value="066">066</option>
				<option value="069">069</option>
			</Select>
			<Input
				type="number"
				name="phone"
				className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
				placeholder="Uneti telefon"
				maxLength="7"
				value={saloonInput.phone.value}
				onChange={e => inputChangedHandler(e, 'phone', saloonInput, setSaloonInput)}
				invalid={!saloonInput.phone.valid}
			/>
			<Input
				type="button"
				value="dodaj"
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				display="block"
				onClick={() => {
					setNewSaloonForm('none'), nextStep(); /* Logika za dodavanje na listu */
				}}
			/>
			<div className={classes.Review}>
				<h4>Vaši saloni</h4>
				<p>state za unete salone</p> {/* dodaje se klikom na dugme dodaj */}
			</div>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				onClick={() => {
					setNewSaloonForm('none'), setDisplayGreeting('none'), nextStep();
				}}
			/>
		</div>
	);

	const EmployeeInputForm = (
		<div style={{ display: newEmployee }}>
			<h3>Unesite podatke radnika</h3>
			<Input type="text" name="name" placeholder="Ime i prezime" className={inputClassName} />
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value="060"
				value={employeeInput.mobOperator.value}
				onChange={e => inputChangedHandler(e, 'mobOperator', employeeInput, setEmployeeInput)}
				invalid={!employeeInput.mobOperator.valid}>
				<option value="060">060</option>
				<option value="061">061</option>
				<option value="062">062</option>
				<option value="063">063</option>
				<option value="064">064</option>
				<option value="065">065</option>
				<option value="066">066</option>
				<option value="069">069</option>
			</Select>
			<Input
				type="number"
				name="phone"
				className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
				placeholder="Uneti telefon"
				maxLength="7"
				value={employeeInput.phone.value}
				onChange={e => inputChangedHandler(e, 'phone', employeeInput, setEmployeeInput)}
				invalid={!employeeInput.phone.valid}
			/>
			<Input
				type="button"
				value="dodaj"
				className={[classes.ChoiceButton, classes.Add].join(' ')}
				display="block"
				onClick={() => {
					setSaloonQuantity('none'), nextStep();
				}}
			/>
			<div className={classes.Review}>
				<h4>Lista radnika</h4>
				<p>state za unete radnike</p> {/* dodaje se klikom na dugme dodaj */}
			</div>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				onClick={() => {
					setDisplayGreeting('none'), setSaloonQuantity('flex'), nextStep();
				}}
			/>
		</div>
	);

	return (
		<>
			<Head>
				<title>Vodič kroz podešavanja|KlikTermin</title>
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
				<div className={[classes.Form, classes.FormLayout].join(' ')}>
					<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
						VODIČ ZA PODEŠAVANJE
					</h2>
					{greetingForm}
					{teamStatusForm}
					{SaloonInputForm}
					{EmployeeInputForm}
					<h4 className={classes.StepCounter}>Korak {stepCounter} od 10</h4>
				</div>
			</Layout>
		</>
	);
};

export default setupguide;
