import axios from 'axios';

export const saveAppointment = (userData) => {
	return axios.post('http://localhost:3000/api/saveAppointment', {
		userData: userData,
	});
};
