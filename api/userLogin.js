import axios from 'axios';
const API_URL = process.env.API_URL;

export const userLogin = userData => {
	console.log('API_URL', API_URL)
	return axios.post(`${API_URL}/api/login`, {
		userData: userData,
	});
};
