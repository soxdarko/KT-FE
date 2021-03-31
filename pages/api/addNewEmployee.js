import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.employeeData;
	const serviceProviderId = req.body.serviceProviderId;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/addNewEmployee?serviceProviderId=${serviceProviderId}`;

	const cookies = await fetchJson(url, 'post', token, obj).then(response => {
		return response;
	});

	cookies;

	res.statusCode = 200;
	res.json({ success: true });
};
