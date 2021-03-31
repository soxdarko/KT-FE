import axios from 'axios';

export const addNewServiceProvider = (userData, token) => {
	return axios.post('http://localhost:3000/api/addNewServiceProvider', {
		token,
		userData: userData,
	});
};
