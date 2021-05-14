import axios from 'axios';

export const saveServicesToManyEmployees = serviceData => {
	return axios.post('http://localhost:3000/api/saveServicesToManyEmployees', {
		serviceData,
	});
};
