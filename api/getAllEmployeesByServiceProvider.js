import axios from 'axios';

export const getAllEmployees = serviceProviderId => {
	return axios.post('http://localhost:3000/api/getAllEmployeesByServiceProvider', {
		serviceProviderId: serviceProviderId,
	});
};
