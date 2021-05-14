import axios from 'axios';

export const getWorkingHours = () => {
	return axios.post('http://localhost:3000/api/getWorkingHours');
};
