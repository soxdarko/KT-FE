import axios from 'axios';

export const getClients = () => {
	return axios.post('http://localhost:3000/api/getClients');
};
