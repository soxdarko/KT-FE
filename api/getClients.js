import axios from 'axios';

export const getClients = deleted => {
	return axios.post('http://localhost:3000/api/getClients', {
		deleted: deleted,
	});
};
