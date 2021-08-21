import axios from 'axios';

export const userLogOut = () => {
	return axios.post('http://localhost:3000/api/logout');
};
