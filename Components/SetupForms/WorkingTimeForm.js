import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	currDayFormat,
} from '../../helpers/universalFunctions';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';
import Select from '../UI/Select';
import AbsenceRadio from './AbsenceRadio';

import classes from '../SetupForms/SetupForms.module.scss';

const WorkingTimeForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [workingTimeData, setWorkingTime] = useState({});

	const [formInput, setFormInput] = useState({
		monday: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	const d_Start = new Date(),
		d_End = new Date(),
		year = d_Start.getFullYear(),
		mondays = [],
		mondaysInMiliseconds = [];

	d_Start.setDate(1);
	d_End.setDate(7);

	const today = d_Start.getDate();

	function currMonday(d) {
		const day = d_Start.getDay(),
			diff = d_Start.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d_Start.setDate(diff));
	}
	// Get the first Monday in the month
	while (d_Start.getDay() !== 1) {
		d_Start.setDate(d_Start.getDate() + 1);
	}

	const currMondayMs = currMonday(new Date()).getTime();
	const currSundayMs = parseInt(currMondayMs) + 1000 * 60 * 60 * 24 * 6;
	const currMondayISO = new Date(currMondayMs);

	// Get all the other Mondays in the month

	while (d_Start.getFullYear() < parseInt(year) + 2) {
		let pushMondays = new Date(d_Start.getTime());
		let pushSundays = new Date(d_End.getTime());
		mondays.push(
			(pushMondays.getDate() < 10 ? '0' : '') +
				pushMondays.getDate() +
				'.' +
				(pushMondays.getMonth() < 9 ? '0' : '') +
				(pushMondays.getMonth() + 1) +
				'.' +
				pushMondays.getFullYear() +
				'.' +
				' - ' +
				(pushSundays.getDate() < 10 ? '0' : '') +
				pushSundays.getDate() +
				'.' +
				(pushSundays.getMonth() < 9 ? '0' : '') +
				(pushSundays.getMonth() + 1) +
				'.' +
				pushSundays.getFullYear() +
				'.'
		);
		d_Start.setDate(d_Start.getDate() + 7);
		d_End.setDate(d_End.getDate() + 7);
		mondaysInMiliseconds.push(d_Start.getTime());
	}

	const demodays = [
		{
			name: 'pon',
			date: today,
		},
		{
			name: 'uto',
			date: today + 1,
		},
		{
			name: 'sre',
			date: today + 2,
		},
		{
			name: 'cet',
			date: today + 3,
		},
		{
			name: 'pet',
			date: today + 4,
		},
		{
			name: 'sub',
			date: today + 5,
		},
		{
			name: 'ned',
			date: today + 6,
		},
	];

	const employeeList = ['Emlpoyee1', 'Emlpoyee2', 'Emlpoyee3', 'Emlpoyee4', 'Emlpoyee5'];
	const duration = ['15', '30', '45', '60'];

	/* const saloonsPreview = () => {
		const listItems = saloonsList.map(data => {
			return <p>{data}</p>;
		});
		return listItems;
	}; */

	const addServicesHandler = () => {
		/* const api = newCompany(companyData)
			.then(response => {
				console.log(response),
					responseHandler(
						props.setShowResponseModal,
						modalAnimation,
						'Poslali smo Vam verifikacioni e-mail i sms. Klikom na link u e-mail-u i sms-u registracija će biti završena.',
						'green'
					);
				props.setIsLoading(false);
				props.setDisplayRegServProv('none');
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					error.response.data.map(err => {
						const Input = err.type[0].toLowerCase() + err.type.slice(1);
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						updateValidity(setFormInput, Input, formInput, '', false);
						props.setShowBackdrop(classes.backdropIn);
					});
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api; */
		console.log('service added');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addServicesHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workingTimeData]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			serviceName: formInput.serviceName.value.trim(),
			description: formInput.description.value.trim(),
			duration: formInput.duration.value.trim(),
			price: formInput.price.value.trim(),
		};

		if (!formInput.serviceName.value.trim()) {
			updateValidity(setFormInput, 'serviceName', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate uneti naziv usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else if (!formInput.duration.value.trim()) {
			updateValidity(setFormInput, 'duration', formInput, '', false);
			responseHandler(
				props.setShowResponseModal,
				modalAnimation,
				'Morate izabrati dužinu trajanja usluge!',
				'red'
			);
			props.setShowBackdrop(classes.backdropIn);
		} else {
			setWorkingTimeData(formData);
			setFormInput(initServicesForm);
			/* props.setIsLoading(true); */
		}
	};

	const durationList = () => {
		return duration.map((time, i) => <option key={i}>{time}</option>);
	};

	const employeesList = () => {
		return employeeList.map((user, i) => (
			<div key={i} className={classes.addForSelectedWrapper}>
				<Input type="checkbox" id={`chkbox${i}`} className={classes.addForSelected} />
				<Label htmlFor={`chkbox${i}`} />
				<p className={classes.addForSelceted_p}>{user}</p>
			</div>
		));
	};

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
	const pickDurationClassName = isMobile ? classes.pickDuratuionMob : classes.pickDuratuion;
	return (
		<div style={{ display: props.displayworkingTimeForm }}>
			<h3>Unesite radno vreme</h3>
			<div className={classes.WorkingTimeHeader}>
				<Select
					name="monday"
					onChange={e => inputChangedHandler(e, 'monday', formInput, setFormInput)}>
					{mondays.map((monday, i) => {
						return (
							<option key={monday} name="monday" value={mondaysInMiliseconds[i]}>
								{monday}
							</option>
						);
					})}
				</Select>
				<Input type="button" value="Kopiraj" />
				<Input type="button" value="Nalepi" />
			</div>
			<div className={classes.WorkingTimeContainer}>
				<div className={classes.WorkingTimeHead}>
					<div className={classes.WorkingTimeHead} style={{ width: '7vw' }}>
						Dan
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '30vw' }}>
						Prvi deo
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '30vw' }}>
						Drugi deo
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '33vw' }}>
						Odsustvo
					</div>
				</div>
				<div className={classes.WorkingTimeBody}>
					<div className={classes.WorkingTimeDays}>
						<div>Pon</div>
						<div>Uto</div>
						<div>Sre</div>
						<div>Čet</div>
						<div>Pet</div>
						<div>Sub</div>
						<div>Ned</div>
					</div>
					<div className={classes.WorkingTimeBlock}>
						{demodays.map((day, i) => {
							return (
								<div className={classes.WorkingTimePairsContainer} key={i}>
									<Input type="time" className={classes.WorkingTimePairs} />-
									<Input type="time" className={classes.WorkingTimePairs} />
								</div>
							);
						})}
					</div>
					<div className={classes.WorkingTimeBlock}>
						{demodays.map((day, i) => {
							return (
								<div className={classes.WorkingTimePairsContainer} key={i}>
									<Input type="time" className={classes.WorkingTimePairs} />-
									<Input type="time" className={classes.WorkingTimePairs} />
								</div>
							);
						})}
					</div>
					<div className={classes.WorkingTimeAbsence}>
						{demodays.map((day, i) => {
							return (
								<div className={classes.AbsencePairsContainer} key={i}>
									<div className={classes.AbsenceRadioContainer}>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}prvi`}
												name={day.name}
												id={`${day.date}prvi`}
												defaultChecked
											/>
											<p>Nema odsustva</p>
										</div>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}drugi`}
												name={day.name}
												id={`${day.date}drugi`}
											/>
											<p>Godišnji odmor</p>
										</div>
									</div>
									<da className={classes.Spacer}></da>
									<div className={classes.AbsenceRadioContainer}>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}treci`}
												name={day.name}
												id={`${day.date}treci`}
											/>
											<p>Praznik</p>
										</div>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}cetvrti`}
												name={day.name}
												id={`${day.date}cetvrti`}
											/>
											<p>Bolovanje</p>
										</div>
									</div>
									<div className={classes.AbsenceRadioContainer}></div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Input
				type="button"
				value="Sačuvaj"
				className={[classes.ChoiceButton, classes.Save].join(' ')}
				display="block"
				onClick={() => console.log(formInput)}
				/* onClick={onSubmit} */
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={classes.Forward}
				/* onClick={() => {
					props.setDisplayAddSaloonForm('none'), props.nextStep();
				}} */
			/>
		</div>
	);
};

export default WorkingTimeForm;
