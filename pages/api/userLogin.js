import { fetchJson } from './fetchJson';

export const userLogin = userData => {
	return fetchJson(
		`users/login?username=${userData.userName}&password=${userData.password}`,
		'get',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
