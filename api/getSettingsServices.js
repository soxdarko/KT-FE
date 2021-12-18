import axios from 'axios';

export const getSettingsServices = () => {
	return axios.post('http://localhost:3000/api/getSettingsServices');
};
