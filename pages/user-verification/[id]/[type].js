import { useState, useEffect } from 'react';
import { cookieReqParser } from '../../../helpers/universalFunctions';
import { fetchJson } from '../../../API/fetchJson';

import Verified from '../../../Components/UI/Forms/Verified';

const userVerificationPage = props => {
	const [verificationType, setVerificationType] = useState(null);
	useEffect(() => {
		const type = props.type;
		setVerificationType(type.split('=')[1]);
	}, []);

	return (
		<>
			<Verified
				message={`Uspesno ste verifikovali ${
					verificationType === 'phone' ? 'broj telefona' : 'e-mail adresu'
				}`}
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
		const userParams = await fetchJson('/user-verification?id=' + id + '&type=' + type, 'get', {
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
