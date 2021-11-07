const cookie = require('cookie');
import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const userName = req.body.userData.userName;
	const password = req.body.userData.password;
	const url = `users/login?username=${userName}&password=${password}`;

	const responseData = await fetchJson(url, 'get', {}).then(response => {
		return response.data;
	});

	const request_config = res.setHeader(
		'Set-Cookie',
		cookie.serialize('token', responseData.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 60 * 60,
			sameSite: 'strict',
			path: '/',
		})
	);
	request_config;

	res.statusCode = 200;
	res.json(responseData);
};
