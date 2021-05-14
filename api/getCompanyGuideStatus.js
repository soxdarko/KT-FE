import axios from 'axios';

export const getCompanyGuideStatus = () => {
	return axios.post('http://localhost:3000/api/getCompanyGuideStatus');
};
