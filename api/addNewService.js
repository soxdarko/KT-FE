import axios from 'axios';

export const addNewService = (serviceData, employee) => {
	return axios.post('http://localhost:3000/api/addNewService', {
		employee: employee,
		serviceData: serviceData,
	});
};
