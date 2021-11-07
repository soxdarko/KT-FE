import { fetchJson } from '../../api/fetchJson';

export const addOrUpdateNewClient = userData => {
	return fetchJson(
		`users/addOrUpdateNewClient`,
		'post',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
