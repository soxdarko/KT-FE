import { fetchJson } from '../../api/fetchJson';

/* export default async (req, res) => {
	const obj = req.body.clientData;
	const userId = req.body.userId;
	const cookie = req.headers.cookie;
	const token = cookie.substring(cookie.indexOf('=') + 1);
	const url = `users/clientRegistration?userId=${userId}`;

	const clientRegistration = await fetchJson(url, 'post', token, obj, userId).then(response => {
		return response;
	});

	clientRegistration;

	res.statusCode = 200;
	res.json({ success: true });
}; */

export const clientRegistration = (userData, userId) => {
	return fetchJson(
		`users/clientRegistration?userId=${userId}`,
		'post',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
