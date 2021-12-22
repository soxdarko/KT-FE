import axios from 'axios';

export const deleteService = serviceId => {
	return axios.post('http://localhost:3000/api/deleteService', {
		serviceId: serviceId,
	});
};
