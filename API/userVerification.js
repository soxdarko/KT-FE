import { fetchJson } from './fetchJson';

export const userVerification = userData => {
	return fetchJson(
		`users/companyVerifyRegistration${userData.userId}${userData.verificationType}`,
		'post',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
