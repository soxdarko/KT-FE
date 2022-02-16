import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
    const obj = req.body.userData;
    const cookie = req.headers.cookie;
    const token = cookie.substring(cookie.indexOf('=') + 1);
    const url = `appointments/saveAppointment`;

    async function saveAppointmentResponse() {
        const api = await fetchJson(url, 'post', token, obj)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });

        return api;
    }
    const response = await saveAppointmentResponse();

    res.statusCode = response?.status ? response.status : 200;
    res.json(response.data);
};
