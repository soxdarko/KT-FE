import axios from 'axios';

export const addNewServiceProvider = userData => {
	return axios.post('http://localhost:3000/api/addNewServiceProvider', {
		'Content-Type': 'application/json',
		userData: userData,
	});
};
