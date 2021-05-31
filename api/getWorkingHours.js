import axios from 'axios';

export const getWorkingHours = (employeeId, selectedMondayFormated) => {
	return axios.post('http://localhost:3000/api/getWorkingHours', {
		employeeId,
		selectedMondayFormated,
	});
};
