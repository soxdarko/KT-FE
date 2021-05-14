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
	const [editMode, setEditMode] = useState(false);
	const [checkedEmployees, setCheckedEmployees] = useState([]);
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
	console.log(moment(selectedMonday).format('YYYY-MM-DD'));

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

	const weekDays = [
		{
			name: 'Pon',
			date: today,
		},
		{
			name: 'Uto',
			date: today + 1,
		},
		{
			name: 'Sre',
			date: today + 2,
		},
		{
			name: 'Čet',
			date: today + 3,
		},
		{
			name: 'Pet',
			date: today + 4,
		},
		{
			name: 'Sub',
			date: today + 5,
		},
		{
			name: 'Ned',
			date: today + 6,
		},
	];

	const getWorkingHours = async () => {
		const api = await getWorkingHours()
			.then(response => {
				const getWorkingHoursData = response.data.map(workingHours => {
					return workingHours;
				});
				setFormInput(getWorkingHoursData);
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

	/* console.log(selectedMonday.getTime); */

	useEffect(() => {
		const defaultForm = [];
		for (let i = 1; i < 8; i++) {
			setIndexOfDay(i);
			const index = i - 1;
			const addDay = i > 0 ? index * 86400000 : '';
			defaultForm.push({
				guid: null,
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
				cellDuration: 15,
			});
		}
		setFormInput(defaultForm);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedMonday]);

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			NewWorkingHours: formInput
				.filter(
					hour => !hour.firstStartHour.includes('--:--') && !hour.firstEndHour.includes('--:--')
				)
				.map(obj => {
					return {
						Id: obj.id,
						IdAbsenceType: obj.idAbsenceType,
						Date: datePicker,
						FirstStartHour:
							obj.firstStartHour === '--:--'
								? obj.firstStartHour
								: moment.duration(obj.firstStartHour).asMinutes(),
						FirstEndHour:
							obj.firstEndHour === '--:--'
								? obj.firstEndHour
								: moment.duration(obj.firstEndHour).asMinutes(),
						SecondStartHour:
							obj.secondStartHour === '--:--'
								? null
								: moment.duration(obj.secondStartHour).asMinutes(),
						SecondEndHour:
							obj.secondEndHour === '--:--' ? null : moment.duration(obj.secondEndHour).asMinutes(),
						CellDuration: obj.cellDuration,
					};
				}),
			Employees: checkedEmployees,
		};
		setWorkingHoursData(formData);
		props.setIsLoading(true);
	};

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
		if (props.userGuideStatus === 'Services') {
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
					name="serviceProviderId"
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
															htmlFor={`${day.date}prvi`}
															name={day.name}
															id={`${day.date}prvi`}
															defaultChecked
														/>
														<p>Nema odsustva</p>
													</div>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}drugi`}
															name={day.name}
															id={`${day.date}drugi`}
														/>
														<p>Godišnji odmor</p>
													</div>
												</div>
												<da className={classes.Spacer}></da>
												<div className={classes.AbsenceRadioContainerMob}>
													<div className={classes.Radio_p_ContainerMob}>
														<AbsenceRadio
															htmlFor={`${day.date}treci`}
															name={day.name}
															id={`${day.date}treci`}
														/>
														<p>Praznik</p>
													</div>
													<div className={classes.Radio_p_ContainerMob}>
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
						onChange={e => setDatePicker(moment(e.target.value).format('YYYY-MM-DD'))}>
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
					<option value="" disabled selected hidden>
						Izaberite salon
					</option>
					{serviceProvidersPreview(props.serviceProviderData)}
				</Select>
				<Select
					name="serviceProviderId"
					className={classes.SelectInputText}
					displaySelect={serviceProviderId ? 'block' : 'none'}
					value={employeeId}
					onChange={e => setEmployeeId(e.target.value)}>
					<option value={null} disabled selected>
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
												inputChangedHandlerArray(e, 'firstStartHour', setFormInput, i + 1)
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
												inputChangedHandlerArray(e, 'firstEndHour', setFormInput, i + 1)
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
												inputChangedHandlerArray(e, 'secondStartHour', setFormInput, i + 1)
											}
										/>
										<p className={classes.WorkingTimePairsLine}>-</p>
										<TimeField
											value={formInput[i]?.secondEndHour}
											className={classes.WorkingTimePairs}
											showSeconds={false}
											colon=":"
											onChange={e =>
												inputChangedHandlerArray(e, 'secondEndHour', setFormInput, i + 1)
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
													htmlFor={`${day.date}${0}`}
													name={day.name}
													id={`${day.date}${0}`}
													defaultChecked
													onClick={() =>
														inputChangedHandlerCheckBox(0, 'idAbsenceType', setFormInput, i + 1)
													}
												/>
												<p>Nema odsustva</p>
											</div>
											<div className={classes.Radio_p_Container}>
												<AbsenceRadio
													htmlFor={`${day.date}${1}`}
													name={day.name}
													id={`${day.date}${1}`}
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
													htmlFor={`${day.date}${2}`}
													name={day.name}
													id={`${day.date}${2}`}
													onClick={() =>
														inputChangedHandlerCheckBox(2, 'idAbsenceType', setFormInput, i + 1)
													}
												/>
												<p>Praznik</p>
											</div>
											<div className={classes.Radio_p_Container}>
												<AbsenceRadio
													htmlFor={`${day.date}${3}`}
													name={day.name}
													id={`${day.date}${3}`}
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
