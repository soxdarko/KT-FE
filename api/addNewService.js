import axios from 'axios';

export const addNewService = (serviceData, employee, token) => {
	return axios.post('http://localhost:3000/api/addNewService', {
		token,
		employee: employee,
		serviceData: serviceData,
	});
};
