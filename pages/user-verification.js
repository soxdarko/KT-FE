import { useEffect } from 'react';
import { cookieReqParser } from '../helpers/universalFunctions';

import Verified from '../Components/UI/Forms/Verified';

const userVerification = () => {
	useEffect(() => {
		const link = window.location.pathname;
		let str = link.substring(link.indexOf('/') + 1);
		console.log(str);
	});

	return (
		<>
			<Verified
				message="Uspesno ste verifikovali broj telefona"
				display="block"
				borderColor="green"
				link="/"
			/>
		</>
	);
};

userVerification.getInitialProps = async ({ req, query }) => {
	const { reportId, fundId, headerId } = query;
	let cookiesString = req != undefined ? req.headers.cookie : '';
	let token = cookieReqParser(cookiesString, 'pdfgen_token');

	async function getFundsInReportList() {
		const dbData = await fetch(APItarget + '/reports/fundsForReportList?reportId=' + reportId, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(res => (res.status === 200 ? res.text() : ''))
			.then(text => {
				if (text.length > 2) {
					return JSON.parse(text);
				} else {
					return [];
				}
			})
			.catch(error => {
				console.log(error);
				return [];
			});

		if (dbData != undefined) {
			return dbData;
		}
	}

	async function getReportInfo() {
		const dbData = await fetch(APItarget + '/reports/reportById?id=' + reportId, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(res => (res.status === 200 ? res.text() : ''))
			.then(text => {
				if (text.length > 2) {
					return JSON.parse(text);
				} else {
					return {};
				}
			})
			.catch(error => {
				console.log(error);
				return {};
			});

		if (dbData != undefined) {
			return dbData;
		}
	}

	return {
		funds: await getFundsInReportList(),
		reportInfo: await getReportInfo(),
		reportId: reportId,
		fundId: fundId,
		headerId: headerId,
	};
};

export default userVerification;
