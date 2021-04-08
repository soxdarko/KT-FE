import axios from 'axios';

export const saveEmployees = userData => {
	return axios.post('http://localhost:3000/api/saveEmployees', {
		userData,
	});
};
