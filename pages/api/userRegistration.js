import { fetchJson } from '../../api/fetchJson';

export const newCompany = companyData => {
	return fetchJson(
		'users/companyRegistration',
		'post',
		{
			'Content-Type': 'application/json',
		},
		companyData
	);
};
