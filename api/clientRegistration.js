import axios from 'axios';

export const clientRegistration = (clientData, userId) => {
	return axios.post('http://localhost:3000/api/clientRegistration', {
		clientData: clientData,
		userId: userId,
	});
};
