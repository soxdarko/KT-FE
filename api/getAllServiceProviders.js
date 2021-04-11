import axios from 'axios';

export const getAllServiceProviders = () => {
	return axios.get('http://localhost:3000/api/getAllServiceProviders');
};
