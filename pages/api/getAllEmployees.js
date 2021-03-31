import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const serviceProvider = req.body.serviceProvider.id;
	const url = `users/getAllEmployees?serviceProviderId=${serviceProvider}`;

	async function getAllEmployees() {
		const api = await fetchJson(url, 'get', token)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});

		api;
	}

	getAllEmployees();

	res.statusCode = 200;
	res.json({ success: true });
};
