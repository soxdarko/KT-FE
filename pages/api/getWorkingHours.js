import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const employeeId = req.body.employeeId;
	const selectedMondayFormated = req.body.selectedMondayFormated;
	const url = `settings/getWorkingHours?employeeId=${employeeId}&dateOfMonday=${selectedMondayFormated}`;
	async function getWorkingHours() {
		const api = await fetchJson(url, 'get', token)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});

		return api;
	}
	console.log(employeeId);
	const data = getWorkingHours();

	res.statusCode = 200;
	res.json(await data);
};
