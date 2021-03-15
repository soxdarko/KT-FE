import axios from 'axios';
import cookies from 'next-cookies';

export const addNewServiceProvider = userData => {
	const token = cookies;
	const headers = { 'Content-Type': 'application/json', Auth: `Bearer ${token}` };
	/* headers.append('Auth', `Bearer ${token}`); */
	return axios.post('http://localhost:3000/api/addNewServiceProvider', {
		headers,
		userData: userData,
	});
};
