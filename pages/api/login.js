const cookie = require('cookie');
import { getCookie } from './getCookie';

export default async (req, res) => {
	const userName = req.body.userData.userName;
	const password = req.body.userData.password;
	const url = `http://localhost:5000/users/login?username=${userName}&password=${password}`;

	const token = await getCookie({ method: 'get', url: url }).then(response => {
		return response.data.access_token;
	});

	const request_config = res.setHeader(
		'Set-Cookie',
		cookie.serialize('token', token, {
			/* ovde vraca undefined */ httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 60 * 60,
			sameSite: 'strict',
			path: '/',
		})
	);
	request_config;
	res.statusCode = 200;
	res.json({ success: true });
};
