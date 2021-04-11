import axios from 'axios';

export const getAllEmployees = () => {
	return axios.post('http://localhost:3000/api/getAllEmployees');
};
