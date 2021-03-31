import axios from 'axios';

export const addNewEmployee = (token, employeeData, serviceProviderId) => {
	return axios.post('http://localhost:3000/api/addNewEmployee', {
		token,
		employeeData,
		serviceProviderId,
	});
};
