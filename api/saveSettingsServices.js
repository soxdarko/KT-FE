import axios from 'axios';

export const saveSettingsServices = settingsData => {
	return axios.post('http://localhost:3000/api/saveSettingsServices', {
		settingsData,
	});
};
