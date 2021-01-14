import { useState } from 'react';

import Layout from '../Components/hoc/Layout/Layout';
import Calendar from '../Components/Calendar/Calendar';

import classes from '../Components/Navigation/Navigation.module.scss';

import ServiceProvidersEmployees from '../Components/DataFromBE/ServiceProvidersEmployees';

const CalendarServiceProvider = () => {
	const [clientFormBackdrop, setClientFormBackdrop] = useState('none');

	const clientFormBackdropShow = () => {
		setClientFormBackdrop('block');
	};

	const clientFormBackdropHide = () => {
		setClientFormBackdrop('none');
	};
	return (
		<>
			<Layout
				displayLoginBtn="none"
				displayRegisterBtn="none"
				displayToolbarNavBtn="none"
				displayToolbarBookingBtn="none"
				displayNotifLabel="block"
				colorCalIcon="#fc9815"
				classNameCal={classes.sideDrawerButtonActive}
				classNameClients={classes.sideDrawerButton}
				classNameServices={classes.sideDrawerButton}
				classNameSettings={classes.sideDrawerButton}
				classNameEmployeeSelect={classes.EmployeeSelect}
				selectData={ServiceProvidersEmployees}
				sms="10"
				license="5">
				<Calendar
					displayBackdrop={clientFormBackdrop}
					showBackdrop={clientFormBackdropShow}
					hideBackdrop={clientFormBackdropHide}
				/>
			</Layout>
		</>
	);
};

export default CalendarServiceProvider;
