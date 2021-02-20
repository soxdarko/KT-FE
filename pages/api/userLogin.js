/* import { fetchJson } from './fetchJson';

export const userLogin = userData => {
	return fetchJson(
		`users/login?username=${userData.userName}&password=${userData.password}`,
		'get',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
}; */

import { fetchJson } from './fetchJson';
import axios from 'axios';

export const userLogin = userData => {
	return axios.post('http://localhost:3000/api/login', {
		'Content-Type': 'application/json',
		userData: userData,
	});
};
