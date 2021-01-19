import axios from '../utils/Axios/axios-appointments';
import { updateValidity } from '../Components/shared/utility';

export const userRegistration = (
	regType,
	regData,
	displayForm,
	setResForm,
	formInput,
	setFormInput,
	initState,
	isLoading
) => {
	const api = axios
		.post(`/users/${regType}`, regData)
		.then(() => {
			setResForm({
				display: 'block',
				message:
					'Poslali smo Vam verifikacioni e-mail i sms. Klikom na link u e-mail-u i sms-u registracija će biti završena.',
				border: 'green',
			});
			displayForm('none');
			isLoading(false);
		})
		.catch(error => {
			if (error.response) {
				error.response.data.map(err => {
					const Input = err.type[0].toLowerCase() + err.type.slice(1);
					setResForm({ display: 'block', message: err.errorMessage, border: 'red' });
					updateValidity(setFormInput, Input, formInput, '', false);
					isLoading(false);
				});
				displayForm('block');
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('nesto drugo');
			}
		});
	api;
	setFormInput(initState);
};
