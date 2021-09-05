import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.userData;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/addNewServiceProvider`;

	async function serviceProvider() {
		const cookies = await fetchJson(url, 'post', token, obj)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});
		return cookies;
	}

	const data = serviceProvider();

	res.statusCode = 200;
	res.json(await data);
};