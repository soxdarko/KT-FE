import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const serviceId = req.body.serviceId;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `appointments/deleteService?serviceId=${serviceId}`;

	const deleteService = await fetchJson(url, 'post', token).then(response => {
		return response;
	});

	deleteService;

	res.statusCode = 200;
	res.json({ success: true });
};
