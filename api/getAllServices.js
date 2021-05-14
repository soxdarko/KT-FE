import axios from 'axios';

export const getAllServices = () => {
	return axios.post('http://localhost:3000/api/getAllServices');
};
