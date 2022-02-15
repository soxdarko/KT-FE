import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
    const obj = req.body.userData;
    const cookie = req.headers.cookie;
    const token = cookie.substring(cookie.indexOf('=') + 1);
    const url = `users/saveServiceProviders`;

    async function saveServiceProviders() {
        const api = await fetchJson(url, 'post', token, obj)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response;
            });

        return api;
    }

    const response = await saveServiceProviders();

    response.length === 0 ? (res.statusCode = 200) : (res.statusCode = response.status);
    res.json(response.data);
};
