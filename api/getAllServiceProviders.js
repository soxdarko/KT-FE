import axios from 'axios';

export const getAllServiceProviders = token => {
	return axios.get('http://localhost:3000/api/getAllServiceProviders', {
		token,
	});
};
