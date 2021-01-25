// eslint-disable-next-line import/no-unresolved
import axios from 'axios'; /* Obrisati file */

const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	/* headers: {
		Authorization: `Bearer ${token}`,
	}, */
});

export default instance;
