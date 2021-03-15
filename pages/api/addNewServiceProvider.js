import { fetchJson } from '../../api/fetchJson';

export const addNewServiceProvider = userData => {
	return fetchJson('users/addNewServiceProvider', 'post', header, userData);
};
