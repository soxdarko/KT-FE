import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.userData;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/saveServiceProviders`;

	async function saveServiceProviders() {
		const serviceProviders = await fetchJson(url, 'post', token, obj)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});
		return serviceProviders;
	}

	const data = saveServiceProviders();
	res.statusCode = 200;
	res.json(await data);
};
