import axios from 'axios';

export const banClient = clientId => {
	return axios.post('http://localhost:3000/api/banClient', {
		clientId: clientId,
	});
};
