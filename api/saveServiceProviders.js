import axios from 'axios';
const API_URL = process.env.API_URL;

export const saveServiceProviders = (userData, token) => {
	return axios.post(`${API_URL}/api/saveServiceProviders`, {
		token,
		userData: userData,
	});
};
