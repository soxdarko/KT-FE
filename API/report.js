export const getReportById = (reportId, accessToken) => {
	return axios.post(`/users/reportById?id=${reportId}`, {}, accessToken);
};
