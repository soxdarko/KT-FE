import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const clientId = req.body.clientId;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/banClient?clientId=${clientId}`;

	const banClient = await fetchJson(url, 'post', token, clientId).then(response => {
		return response;
	});

	banClient;

	res.statusCode = 200;
	res.json({ success: true });
};
