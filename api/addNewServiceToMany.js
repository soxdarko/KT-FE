import axios from 'axios';

export const addNewServiceToMany = (serviceData, token) => {
	return axios.post('http://localhost:3000/api/addNewServiceToMany', {
		token,
		serviceData: serviceData,
	});
};
