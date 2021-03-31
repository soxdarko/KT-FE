import axios from 'axios';

export const getAllEmployees = token => {
	return axios.get('http://localhost:3000/api/getAllEmployees', {
		token,
	});
};
