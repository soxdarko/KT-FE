import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
    const dateOfMonday = req.body.dateOfMonday;
	const url = `appointments/getAppointments?dateOfMonday=${dateOfMonday}`;

	async function getAppointments() {
		const api = await fetchJson(url, 'get', token)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});

		return api;
	}

	const data = getAppointments();

	res.statusCode = 200;
	res.json(await data);
};