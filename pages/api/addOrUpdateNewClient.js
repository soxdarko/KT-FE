import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.clientData;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/addOrUpdateNewClient`;

	const addOrUpdateNewClient = await fetchJson(url, 'post', token, obj)
		.then(response => {
			return response;
		})
		.catch(err => {
			console.log(err);
		});

	addOrUpdateNewClient;

	res.statusCode = 200;
	res.json({ success: true });
};
