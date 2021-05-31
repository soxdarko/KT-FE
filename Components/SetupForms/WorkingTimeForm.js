import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import TimeField from 'react-simple-timefield';
import { FaCopy, FaPaste } from 'react-icons/fa';
import {
	useDeviceDetect,
	inputChangedHandler,
	inputChangedHandlerArray,
	inputChangedHandlerCheckBox,
	updateValidity,
	responseHandler,
	currDayFormat,
} from '../../helpers/universalFunctions';
import { saveWorkingHoursToMany } from '../../api/saveWorkingHoursToMany';
import { getWorkingHours } from '../../api/getWorkingHours';
import initServicesForm from './initServicesForm';

import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import AbsenceRadio from './AbsenceRadio';
import EmployeesPicker from './EmployeesPicker';

import classes from './SetupForms.module.scss';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';

const WorkingTimeForm = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimation = isMobile ? classes.modalInMob : classes.modalInPC;
	const [workingHoursData, setWorkingHoursData] = useState({});
	const [serviceProviderId, setServiceProviderId] = useState(null);
	const [employeeId, setEmployeeId] = useState(null);
	const [indexOfDay, setIndexOfDay] = useState(0);
	const [weekIndex, setWeekIndex] = useState(0);

	const [formInput, setFormInput] = useState([]);

	const d_Start = new Date(),
		d_End = new Date(),
		year = d_Start.getFullYear(),
		mondays = [],
		mondaysISO = [];

	d_Start.setDate(1);
	d_End.setDate(7);

	const today = new Date();

	function currMonday(d) {
		const day = d_Start.getDay(),
			diff = d_Start.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d_Start.setDate(diff));
	}
	// Get the first Monday in the month
	while (d_Start.getDay() !== 1) {
		d_Start.setDate(d_Start.getDate() + 1);
	}

	const startMonday = d_Start.setDate(1) + 2 * 86400000;

	const currMondayMs = currMonday(new Date()).getTime();
	const [datePicker, setDatePicker] = useState(moment(currMonday()).format('YYYY-MM-DD'));
	const currSundayMs = parseInt(currMondayMs) + 1000 * 60 * 60 * 24 * 6;
	const currMondayISO = new Date(currMondayMs + 7 * 86400000);
	const [selectedMonday, setSelectedMonday] = useState(currMondayMs);
	const selectedMondayFormated = moment(selectedMonday).format('YYYY-MM-DD');

	const [workingHoursOnChangeEmployee, setWorkingHoursOnChangeEmployee] = useState([]);
	const [hoursFromGet, setHoursFromGet] = useState([]);
	const [minutesFromGet, setMinutesFromGet] = useState([]);

	// Get all the other Mondays in the month

	while (d_Start.getFullYear() < parseInt(year) + 2) {
		let pushMondays = new Date(d_Start);
		let pushSundays = new Date(d_End);
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
		mondaysISO.push(pushMondays);
	}

	const fullTime = formInput[0]?.firstStartHour;
	const numHour = Math.floor(fullTime / 60);
	const numMinutes = fullTime % 60;

	const getTimeHandler = (setState, time) => {
		if (time < 10) {
			return setState('0' + time.toString());
		} else {
			return setState(time.toString());
		}
	};

	const initialTimeFormHandler = () => {
		const defaultForm = [];
		for (let i = 1; i < 8; i++) {
			setIndexOfDay(i);
			const index = i - 1;
			const addDay = i > 0 ? index * 86400000 : '';
			defaultForm.push({
				id: i,
				idAbsenceType: 0,
				date: {
					value: moment(selectedMonday + addDay).format('YYYY-MM-DD'),
					touched: false,
					valid: true,
				},
				firstStartHour: '--:--',
				firstEndHour: '--:--',
				secondStartHour: '--:--',
				secondEndHour: '--:--',
				cellsDuration: 15,
			});
		}
		setFormInput(defaultForm);
	};

	const getWorkingHoursHandler = async () => {
		const api = await getWorkingHours(employeeId, selectedMondayFormated)
			.then(response => {
				const getWorkingHoursData = response.data.map(workingHours => {
					return workingHours;
				});
				if (getWorkingHoursData.length > 0) {
					return setWorkingHoursOnChangeEmployee(getWorkingHoursData);
				} else {
					return initialTimeFormHandler();
				}
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				}
			});
		return api;
	};

	const addWorkingHoursHandler = () => {
		const api = saveWorkingHoursToMany(workingHoursData)
			.then(response => {
				console.log(response),
					responseHandler(
						props.setShowResponseModal,
						modalAnimation,
						'Radno vreme uspešno sačuvano',
						'green'
					);
				props.setIsLoading(false);
				props.displayWorkingTimeForm('none');
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
		api;
		console.log('service added');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addWorkingHoursHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workingHoursData]);

	const timeFormatHandler = (obj, time) => {
		if (obj[time] === '--:--' || obj[time] === '00:00') {
			return null;
		} else {
			return moment.duration(obj[time]).asMinutes();
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			NewWorkingHours: formInput
				.filter(
					hour =>
						(!hour.firstStartHour.includes('--') && !hour.firstEndHour.includes('--')) ||
						hour.idAbsenceType !== 0
				)
				.map(hour => {
					const houdId = hour.id;
					return {
						Id: typeof houdId === 'number' ? null : hour.id,
						IdAbsenceType: hour.idAbsenceType,
						Date: hour.date.value,
						FirstStartHour:
							hour.idAbsenceType !== 0 ? 0 : timeFormatHandler(hour, 'firstStartHour'),
						FirstEndHour: hour.idAbsenceType !== 0 ? 0 : timeFormatHandler(hour, 'firstEndHour'),
						SecondStartHour: timeFormatHandler(hour, 'secondStartHour'),
						SecondEndHour: timeFormatHandler(hour, 'secondEndHour'),
						CellsDuration: 0,
					};
				}),
			Employees: [employeeId],
		};
		setWorkingHoursData(formData);
		props.setIsLoading(true);
	};

	const weekDays = [
		{
			name: 'Pon',
			date: moment(selectedMonday).format('YYYY-MM-DD'),
		},
		{
			name: 'Uto',
			date: moment(selectedMonday + 86400000).format('YYYY-MM-DD'),
		},
		{
			name: 'Sre',
			date: moment(selectedMonday + 2 * 86400000).format('YYYY-MM-DD'),
		},
		{
			name: 'Čet',
			date: moment(selectedMonday + 3 * 86400000).format('YYYY-MM-DD'),
		},
		{
			name: 'Pet',
			date: moment(selectedMonday + 4 * 86400000).format('YYYY-MM-DD'),
		},
		{
			name: 'Sub',
			date: moment(selectedMonday + 5 * 86400000).format('YYYY-MM-DD'),
		},
		{
			name: 'Ned',
			date: moment(selectedMonday + 6 * 86400000).format('YYYY-MM-DD'),
		},
	];

	//Format getWorkingHours
	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}

		const defaultForm = [];
		if (workingHoursOnChangeEmployee.length > 0) {
			for (let i = 0; i < 7; i++) {
				const myDate = weekDays[i].date;
				const dateFromServer = workingHoursOnChangeEmployee.find(
					q => q.date.split('T')[0] === myDate
				);

				if (dateFromServer === undefined) {
					defaultForm.push({
						id: i,
						idAbsenceType: 0,
						date: {
							value: weekDays[i].date,
							touched: false,
							valid: true,
						},
						firstStartHour: '--:--',
						firstEndHour: '--:--',
						secondStartHour: '--:--',
						secondEndHour: '--:--',
						cellsDuration: 15,
					});
				} else {
					defaultForm.push({
						id: dateFromServer.id,
						idAbsenceType: dateFromServer?.idAbsenceType ? dateFromServer.idAbsenceType : 0,
						date: {
							value: dateFromServer.date.split('T')[0],
							touched: false,
							valid: true,
						},
						firstStartHour: updateWorkingTimefromServer(dateFromServer.firstStartHour),
						firstEndHour: updateWorkingTimefromServer(dateFromServer.firstEndHour),
						secondStartHour: dateFromServer?.secondStartHour
							? updateWorkingTimefromServer(dateFromServer?.secondStartHour)
							: '--:--',
						secondEndHour: dateFromServer?.secondEndHour
							? updateWorkingTimefromServer(dateFromServer?.secondEndHour)
							: '--:--',
						cellsDuration: dateFromServer.cellsDuration,
					});
				}
			}
			setFormInput(defaultForm);
		} else {
			initialTimeFormHandler();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workingHoursOnChangeEmployee]);

	const serviceProvidersPreview = serviceProviders => {
		const listItems = serviceProviders.map(serviceProvider => {
			return (
				<option key={serviceProvider.id} value={serviceProvider.id}>
					{serviceProvider.name}
				</option>
			);
		});
		return listItems;
	};

	const updateWorkingTimefromServer = time => {
		if (time === 0 || !time) {
			return '--';
		} else return `${formatHoursFromServer(time)}:${formatMinutesFromServer(time)}`;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		getTimeHandler(setHoursFromGet, numHour);
		getTimeHandler(setMinutesFromGet, numMinutes);
	}, [formInput]);

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		if (employeeId) {
			getWorkingHoursHandler();
		}

		const defaultForm = [];
		if (employeeId) {
			for (let i = 0; i < workingHoursOnChangeEmployee.length; i++) {
				defaultForm.push({
					id: workingHoursOnChangeEmployee[i].id,
					idAbsenceType: workingHoursOnChangeEmployee[i].idAbsenceType,
					date: {
						value: workingHoursOnChangeEmployee[i].date,
						touched: false,
						valid: true,
					},
					firstStartHour: workingHoursOnChangeEmployee[i].firstStartHour,
					firstEndHour: workingHoursOnChangeEmployee[i].firstEndHour,
					secondStartHour: workingHoursOnChangeEmployee[i].secondStartHour,
					secondEndHour: workingHoursOnChangeEmployee[i].secondEndHour,
					cellsDuration: workingHoursOnChangeEmployee[i].cellsDuration,
				});
			}
			setFormInput(defaultForm);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeId]);

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}

		setEmployeeId(null);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceProviderId]);

	const formatHoursFromServer = time => {
		const numHour = Math.floor(time / 60);

		if (numHour < 10) {
			return '0' + numHour.toString();
		} else {
			return numHour.toString();
		}
	};

	const formatMinutesFromServer = time => {
		const numMinutes = time % 60;

		if (numMinutes < 10) {
			return '0' + numMinutes.toString();
		} else {
			return numMinutes.toString();
		}
	};

	const employeesPreview = () => {
		const listItems = props.listOfEmployees
			.filter(user => user.serviceProviderId.includes(serviceProviderId))
			.map(filteredEmployee => {
				return (
					<option key={filteredEmployee.id} value={filteredEmployee.id}>
						{filteredEmployee.name}
					</option>
				);
			});
		return listItems;
	};

	const displayForm = () => {
		if (props.userGuideStatus !== 'Services') {
			props.setDisplayGreeting('none');
			props.setDisplayWorkingTimeForm('block');
		} else {
			props.setDisplayWorkingTimeForm('none');
		}
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		displayForm();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(formInput);

	const displayOverlay = !employeeId ? 'block' : 'none';

	if (isMobile) {
		/* **************** MOB ****************/
		return (
			<div style={{ display: props.displayWorkingTimeForm }}>
				<h3>Unesite radno vreme</h3>
				<div className={classes.WorkingTimeHeaderMob}>
					<i>
						<FaCopy className={classes.Icon} />
					</i>
					<Select
						name="monday"
						onChange={e => {
							setDatePicker(moment(e.target.value).format('YYYY-MM-DD')),
								setSelectedMonday(new Date(e.target.value).getTime());
						}}>
						{mondays.map((monday, i) => {
							() => setWeekIndex(i);
							return (
								<option key={monday} name="monday" value={mondaysISO[i]}>
									{monday}
								</option>
							);
						})}
					</Select>
					<i style={{ marginLeft: '10px' }}>
						<FaPaste className={classes.Icon} />
					</i>
				</div>
				<Select
					name="serviceProviderId"
					className={classes.SelectInputText}
					value={serviceProviderId}
					marginTop={5}
					onChange={e => setServiceProviderId(e.target.value)}>
					<option value="" disabled selected hidden>
						Izaberite salon
					</option>
					{serviceProvidersPreview(props.serviceProviderData)}
				</Select>
				<Select
					name="employeeId"
					className={classes.SelectInputText}
					displaySelect={serviceProviderId ? 'block' : 'none'}
					value={employeeId}
					onChange={e => setEmployeeId(e.target.value)}>
					<option value={null} disabled selected>
						Izaberite radnika
					</option>
					{employeesPreview(props.serviceProviderData)}
				</Select>
				<div>
					<div className={classes.WorkingTimeContainerMob}>
						<div className={classes.FormOverlayMob} style={{ display: displayOverlay }}></div>
						<div className={classes.WorkingTimeHead}>
							<div className={classes.DayTitleMob} style={{ width: '10vw' }}>
								<p>Dan</p>
							</div>
							<div style={{ width: '43.5vw' }}>Od</div>
							<div style={{ width: '43.5vw' }}>Do</div>
						</div>
						<div className={classes.WorkingTimeBodyMob}>
							{weekDays.map((day, i) => {
								return (
									<div key={day} className={classes.WorkingTimeBodyBlockMob}>
										<div className={classes.WorkingTimeDaysMob}>
											<p>{day.name}</p>
										</div>
										<div className={classes.WorkingTimeBlockMob}>
											<div className={classes.WorkingTimePairsContainerMob}>
												<TimeField
													value={formInput[i]?.firstStartHour} // {String}   required, format '00:00' or '00:00:00'
													className={classes.WorkingTimePairsMob}
													onChange={e =>
														inputChangedHandlerArray(e, 'firstStartHour', setFormInput, i + 1)
													}
													colon=":"
													showSeconds={false}
													style={{ marginRight: '4%' }}
												/>
												<TimeField
													value={formInput[i]?.firstEndHour}
													className={classes.WorkingTimePairsMob}
													showSeconds={false}
													colon=":"
													onChange={e =>
														inputChangedHandlerArray(e, 'firstEndHour', setFormInput, i + 1)
													}
													style={{ marginLeft: '4%' }}
												/>
											</div>
											<div className={classes.WorkingTimePairsContainerMob}>
												<TimeField
													value={formInput[i]?.secondStartHour} // {String}   required, format '00:00' or '00:00:00'
													className={classes.WorkingTimePairsMob}
													onChange={e =>
														inputChangedHandlerArray(e, 'secondStartHour', setFormInput, i + 1)
													}
													colon=":"
													showSeconds={false}
													style={{ marginRight: '4%' }}
												/>
												<TimeField
													value={formInput[i]?.secondEndHour}
													className={classes.WorkingTimePairsMob}
													showSeconds={false}
													colon=":"
													onChange={e =>
														inputChangedHandlerArray(e, 'secondEndHour', setFormInput, i + 1)
													}
													style={{ marginLeft: '4%' }}
												/>
											</div>

											<div className={classes.AbsencePairsContainer}>
												<div className={classes.AbsenceRadioContainerMob}>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}${0}`}
															name={day.name}
															id={`${day.date}${0}`}
															defaultChecked={formInput[i]?.IdAbsenceType === 0}
															onClick={() =>
																inputChangedHandlerCheckBox(0, 'idAbsenceType', setFormInput, i + 1)
															}
														/>
														<p>Nema odsustva</p>
													</div>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}${1}`}
															name={day.name}
															id={`${day.date}${1}`}
															defaultChecked={formInput[i]?.IdAbsenceType === 1}
															onClick={() =>
																inputChangedHandlerCheckBox(1, 'idAbsenceType', setFormInput, i + 1)
															}
														/>
														<p>Godišnji odmor</p>
													</div>
												</div>
												<da className={classes.Spacer}></da>
												<div className={classes.AbsenceRadioContainerMob}>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}${2}`}
															name={day.name}
															id={`${day.date}${2}`}
															defaultChecked={formInput[i]?.IdAbsenceType === 2}
															onClick={() =>
																inputChangedHandlerCheckBox(2, 'idAbsenceType', setFormInput, i + 1)
															}
														/>
														<p>Praznik</p>
													</div>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}${3}`}
															name={day.name}
															id={`${day.date}${3}`}
															defaultChecked={formInput[i]?.IdAbsenceType === 3}
															onClick={() =>
																inputChangedHandlerCheckBox(3, 'idAbsenceType', setFormInput, i + 1)
															}
														/>
														<p>Bolovanje</p>
													</div>
												</div>
												<div className={classes.AbsenceRadioContainer}></div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<WrappedButtonsMob
					forward={() => props.setDisplayWorkingTimeForm('none')}
					save={onSubmit}
					isMobile={isMobile}
					displayForward="block"
					displaySave="block"
					displayAdd="none"
					displayStopEdit="none"
				/>
			</div>
		);
	} else {
		/* **************** DESKTOP ****************/
		return (
			<div style={{ display: props.displayWorkingTimeForm }}>
				<h3>Unesite radno vreme</h3>
				<div className={classes.WorkingTimeHeader}>
					<Input type="button" value="Kopiraj" />
					<Select
						name="monday"
						onChange={e => {
							setDatePicker(moment(e.target.value).format('YYYY-MM-DD')),
								setSelectedMonday(new Date(e.target.value).getTime()),
								setEmployeeId(''),
								setServiceProviderId(''),
								initialTimeFormHandler();
						}}>
						{mondays.map((monday, i) => {
							return (
								<option key={monday} name="monday" value={mondaysISO[i]}>
									{monday}
								</option>
							);
						})}
					</Select>
					<Input type="button" value="Nalepi" />
				</div>
				<Select
					name="serviceProviderId"
					className={classes.SelectInputText}
					value={serviceProviderId}
					marginTop={5}
					onChange={e => setServiceProviderId(e.target.value)}>
					<option value={null} selected>
						Izaberite salon
					</option>
					{serviceProvidersPreview(props.serviceProviderData)}
				</Select>
				<Select
					name="employeeId"
					className={classes.SelectInputText}
					displaySelect={serviceProviderId ? 'block' : 'none'}
					value={employeeId}
					onChange={e => setEmployeeId(e.target.value)}>
					<option value={null} selected>
						Izaberite radnika
					</option>
					{employeesPreview(props.serviceProviderData)}
				</Select>
				<div className={classes.WorkingTimeContainer}>
					<div className={classes.FormOverlay} style={{ display: displayOverlay }}></div>
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
							{weekDays.map(day => {
								return <div key={day}>{day.name}</div>;
							})}
						</div>
						<div className={classes.WorkingTimeBlock}>
							{weekDays.map((day, i) => {
								return (
									<div className={classes.WorkingTimePairsContainer} key={i}>
										<TimeField
											value={formInput[i]?.firstStartHour} // {String}   required, format '00:00' or '00:00:00'
											className={classes.WorkingTimePairs}
											onChange={e =>
												inputChangedHandlerArray(
													e,
													'firstStartHour',
													setFormInput,
													formInput[i]?.id
												)
											}
											colon=":"
											showSeconds={false}
										/>
										<p className={classes.WorkingTimePairsLine}>-</p>
										<TimeField
											value={formInput[i]?.firstEndHour}
											className={classes.WorkingTimePairs}
											showSeconds={false}
											colon=":"
											onChange={e =>
												inputChangedHandlerArray(e, 'firstEndHour', setFormInput, formInput[i]?.id)
											}
										/>
									</div>
								);
							})}
						</div>
						<div className={classes.WorkingTimeBlock}>
							{weekDays.map((day, i) => {
								return (
									<div className={classes.WorkingTimePairsContainer} key={i}>
										<TimeField
											value={formInput[i]?.secondStartHour}
											className={classes.WorkingTimePairs}
											showSeconds={false}
											colon=":"
											onChange={e =>
												inputChangedHandlerArray(
													e,
													'secondStartHour',
													setFormInput,
													formInput[i]?.id
												)
											}
										/>
										<p className={classes.WorkingTimePairsLine}>-</p>
										<TimeField
											value={formInput[i]?.secondEndHour}
											className={classes.WorkingTimePairs}
											showSeconds={false}
											colon=":"
											onChange={e =>
												inputChangedHandlerArray(e, 'secondEndHour', setFormInput, formInput[i]?.id)
											}
										/>
									</div>
								);
							})}
						</div>
						<div className={classes.WorkingTimeAbsence}>
							{weekDays.map((day, i) => {
								return (
									<div className={classes.AbsencePairsContainer} key={i}>
										<div className={classes.AbsenceRadioContainer}>
											<div className={classes.Radio_p_Container}>
												<AbsenceRadio
													htmlFor={`${day.date}prvi`}
													name={day.name}
													id={`${day.date}prvi`}
													defaultChecked={formInput[i]?.idAbsenceType === 0}
													onClick={() =>
														inputChangedHandlerCheckBox(0, 'idAbsenceType', setFormInput, i + 1)
													}
												/>
												<p>Nema odsustva</p>
											</div>
											<div className={classes.Radio_p_Container}>
												<AbsenceRadio
													htmlFor={`${day.date}drugi`}
													name={day.name}
													id={`${day.date}drugi`}
													defaultChecked={formInput[i]?.idAbsenceType === 1}
													onClick={() =>
														inputChangedHandlerCheckBox(1, 'idAbsenceType', setFormInput, i + 1)
													}
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
													defaultChecked={formInput[i]?.idAbsenceType === 2}
													onClick={() =>
														inputChangedHandlerCheckBox(2, 'idAbsenceType', setFormInput, i + 1)
													}
												/>
												<p>Praznik</p>
											</div>
											<div className={classes.Radio_p_Container}>
												<AbsenceRadio
													htmlFor={`${day.date}cetvrti`}
													name={day.name}
													id={`${day.date}cetvrti`}
													defaultChecked={formInput[i]?.idAbsenceType === 3}
													onClick={() =>
														inputChangedHandlerCheckBox(3, 'idAbsenceType', setFormInput, i + 1)
													}
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
				{/* <EmployeesPicker
					listOfEmployees={props.listOfEmployees}
					checkedUsers={checkedEmployees}
					setCheckedUsers={setCheckedEmployees}
					addForSelectedClassName={classes.addForSelected}
				/> */}
				<Input
					type="button"
					value="Sačuvaj"
					className={[classes.ChoiceButton, classes.Save].join(' ')}
					display="block"
					onClick={onSubmit}
				/>
				<Input
					type="button"
					value="nastavi >>>"
					className={classes.Forward}
					onClick={() => props.setDisplayWorkingTimeForm('none')}
				/>
			</div>
		);
	}
};

export default WorkingTimeForm;
