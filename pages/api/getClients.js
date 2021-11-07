import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = 'users/getClients';

	async function getClients() {
		const api = await fetchJson(url, 'get', token)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});

		return api;
	}

	const data = getClients();

	res.statusCode = 200;
	res.json(await data);
};
