import { fetchJson } from './fetchJson';

export const newCompany = companyData => {
	return fetchJson('post', 'users/companyRegistration', companyData);
};
