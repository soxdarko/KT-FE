import { useEffect } from 'react';
import { cookieReqParser } from '../../../helpers/universalFunctions';
import { fetchJson } from '../../../API/fetchJson';
import { userVerification } from '../../../API/userVerification';

import Verified from '../../../Components/UI/Forms/Verified';

const userVerificationPage = props => {
	const id = props.id.split('=')[1];
	const type = props.type.split('=')[1];
	const userData = {
		userId: id,
		verificationType: type,
	};

	const userVerificationHandler = () => {
		const api = userVerification(userData)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	useEffect(() => {
		userVerificationHandler();
	}, []);

	const typeString = type === 'phone' ? 'broj telefona' : 'e-mail adresu';

	return (
		<>
			<Verified
				message={`Uspesno ste verifikovali ${typeString}`}
				display="block"
				borderColor="green"
				link="/"
			/>
		</>
	);
};

userVerificationPage.getInitialProps = async ({ req, query }) => {
	const { id, type } = query;
	let cookiesString = req != undefined ? req.headers.cookie : '';
	let token = cookieReqParser(cookiesString, 'pdfgen_token');

	async function getUserParams() {
		const userParams = await fetchJson('/user-verification' + id + '/' + type, 'get', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(res => (res.status === 200 ? res.text() : ''))
			.catch(error => {
				console.log(error);
				return [];
			});

		if (userParams != undefined) {
			return userParams;
		}
	}

	return {
		getUserParams: await getUserParams(),
		id: id,
		type: type,
	};
};

export default userVerificationPage;
