import axios from 'axios';

export const saveWorkingHoursToMany = workingHoursData => {
	return axios.post('http://localhost:3000/api/saveWorkingHoursToMany', {
		workingHoursData,
	});
};
