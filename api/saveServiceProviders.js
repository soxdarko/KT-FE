import axios from 'axios';

export const saveServiceProviders = (userData, token) => {
	return axios.post('http://localhost:3000/api/saveServiceProviders', {
		userData: userData,
	});
};
