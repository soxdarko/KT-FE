import axios from 'axios';

export const getAllAppointmentsForWeek = dateOfMonday => {
	return axios.post('http://localhost:3000/api/getAppointments', {
		dateOfMonday: dateOfMonday,
	});
};