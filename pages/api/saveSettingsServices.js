import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const obj = req.body.settingsData;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `settings/saveSettingsServices`;

	const settingsService = await fetchJson(url, 'post', token, obj).then(response => {
		return response;
	});

	settingsService;

	res.statusCode = 200;
	res.json({ success: true });
};
