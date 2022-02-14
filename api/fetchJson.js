import axios from 'axios';
const API_URL_BE = process.env.API_URL_BE;

export const fetchJson = (url, method, token, body) => {
	console.log('API_URL_BE', API_URL_BE);
	const Axios = axios.create({
		baseURL: API_URL_BE,
		headers: token ? { Authorization: 'Bearer ' + token } : {},
	});

	return Axios({
		method: method,
		url: url,
		data: body,
	}).then(checkStatus);
};

function checkStatus(response) {
	// if (response.status >= 200 && response.status < 400) {
	// 	return response;
	// }
	return response;
	// const error = new Error(response.statusText);
	// error.response = response;
	// if (response.status === 403 || response.status === 401 || response.status === 400) {
	// 	error.status = response.status;
	// }

	// throw error;
}

// export function handleError(error) {
// 	if (!error.response) return Promise.resolve('fetch_error');
// 	return error.response.text().then(text);
// }
