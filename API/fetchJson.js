import axios from 'axios';

export const fetchJson = (url, method, headers, data) => {
	/* const headers = new Headers({}); */
	const token = headers.Authorization;
	const apiUrl = 'http://localhost:5000/';

	const Axios = axios.create({
		baseURL: apiUrl,
	});

	if (token) {
		headers.append('Authorization', `Bearer ${token}`);
	}

	return Axios({
		method: method,
		url: url,
		data: data,
		headers,
	}).then(checkStatus);
};

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
