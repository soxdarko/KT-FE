import axios from 'axios';

export const userLogin = userData => {
	return axios.post('http://localhost:3000/api/login', {
		'Content-Type': 'application/json',
		userData: userData,
	});
};
