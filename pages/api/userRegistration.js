import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
	const companyData = req.body.companyData;
	const url = `users/companyRegistration`;

    async function newCompany() {
        const api = await fetchJson(url, 'post', {}, companyData)
        .then(res => {
            return res.data;
	    })
        .catch(err => {
            return err.response
        });

        return api
    }

        const response = await newCompany();

        response.length === 0 ? res.statusCode = 200 : res.statusCode = response.status

	res.json(response.data);
};