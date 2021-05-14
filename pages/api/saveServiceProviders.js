import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.userData;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/saveServiceProviders`;

	const saveServiceProviders = await fetchJson(url, 'post', token, obj)
		.then(response => {
			return response;
		})
		.catch(err => {
			console.log(err);
		});

	saveServiceProviders;

	res.statusCode = 200;
	res.json({ success: true });
};
