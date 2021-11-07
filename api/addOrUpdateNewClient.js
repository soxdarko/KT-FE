import axios from 'axios';

export const addOrUpdateNewClient = clientData => {
	return axios.post('http://localhost:3000/api/addOrUpdateNewClient', {
		clientData: clientData,
	});
};
