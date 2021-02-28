import { fetchJson } from '../../api/fetchJson';

export const userVerification = userData => {
	return fetchJson(
		`users/companyVerifyRegistration?userId=${userData.userId}&verificationType=${userData.verificationType}`,
		'post',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
