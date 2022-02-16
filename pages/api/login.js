const cookie = require('cookie');
import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
    const userName = req.body.userData.userName;
    const password = req.body.userData.password;
    const url = `users/login?username=${userName}&password=${password}`;

    async function login() {
        const api = await fetchJson(url, 'get', {})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response;
            });

        return api;
    }

    const response = await login();

    const request_config = res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', response.access_token, {
            httpOnly: true,
            secure: false, //process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
        })
    );
    request_config;

    !response.status ? (res.statusCode = 200) : (res.statusCode = response.status);
    res.json(response.data);
};
