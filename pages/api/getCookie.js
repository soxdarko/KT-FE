import axios from 'axios';

export function getCookie(options) {
	return axios(options).then(checkStatus);
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 400) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	if (response.status === 403 || response.status === 401) {
		error.status = response.status;
	}

	throw error;
}

export function handleError(error) {
	if (!error.response) return Promise.resolve('fetch_error');
	return error.response.text().then(text);
}
