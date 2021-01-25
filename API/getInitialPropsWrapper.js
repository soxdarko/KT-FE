import Accounts from '../../../../../../components/EditDataAccounts';
import Layout from '../../../../../../components/Layout';
import FundLevelNavbar from '../../../../../../components/Navbars/FundLevelNavbar';
import fetch from 'isomorphic-unfetch';
import APItarget from '../../../../../../../global/APItarget';
import { cookieReqParser, getIndexArrayObj } from '../../../../../../helpers/universalFunctions';
import Moment from 'react-moment';
import { useState, useEffect } from 'react';
import WarningUnsavedChanges from '../../../../../../components/WarningUnsavedChanges';
import Router from 'next/router';
import Link from 'next/link';

/* function EditImportedDataPage(props) {
	const [fundLocked, setFundLocked] = useState(false);
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	const handleFundSelection = e => {
		window.location.href =
			'/reports/edit-imported-data/accounts/' +
			props.reportId +
			'/' +
			e.target.value +
			'/Räkenskaper';
	};

	useEffect(() => {
		if (
			props.reportId === undefined ||
			props.fundId === undefined ||
			props.headerId === undefined
		) {
			Router.push('/');
		} else {
			let index = getIndexArrayObj(props.fundId, props.funds, 'fundId');
			if (index > -1) {
				setFundLocked(props.funds[index].locked);
			}
		}
	}, []);

	return (
		<Layout>
			<FundLevelNavbar fundId={props.fundId} reportId={props.reportId} />

			<div className="auxContainer">
				<h4 className="auxPageTitle" title="Report">
					Rapport: {props.reportInfo.name}
				</h4>
				<div className="mt-5">
					<h5>
						Datum: <Moment date={props.reportInfo.reportDate} format="YYYY-MM-DD" />
					</h5>

					<h5 style={{ display: 'inline-block' }}>Fond:</h5>
					<select
						name="select"
						onChange={handleFundSelection}
						className="form-control"
						style={{ width: '300px', marginLeft: '10px', display: 'inline-block' }}
						value={props.fundId}>
						{props.funds.map(function (fund, i) {
							return (
								<option value={fund.fundId} locked={fund.locked ? 1 : 0} key={i}>
									{fund.legalName}
								</option>
							);
						})}
					</select>

					{fundLocked ? (
						<img src="/img/locked.png" alt="locked" height="22px" style={{ paddingLeft: '10px' }} />
					) : (
						''
					)}

					<div className="auxFundListColumn" style={{ paddingLeft: '10px' }}>
						{props.reportInfo.importInProgress ? (
							<div className="auxFundListColumn">
								<img className="auxPDFIconImageDisabled" src="/img/pdf-icon-disabled.png" />
							</div>
						) : (
							<div className="auxFundListColumn">
								<Link href={'/pdf-document/' + props.reportId + '/false/' + props.fundId}>
									<a target="_blank">
										<img className="auxPDFIconImageHeader" src="/img/pdf-icon.png" />
									</a>
								</Link>
							</div>
						)}
					</div>

					<Accounts
						fundId={props.fundId}
						fundLocked={fundLocked}
						headerId={props.headerId}
						reportId={props.reportId}
						setUnsavedChanges={setUnsavedChanges}
						reportDate={props.reportInfo.reportDate}
					/>
				</div>
			</div>
			<WarningUnsavedChanges unsavedChanges={unsavedChanges} />
		</Layout>
	);
}
 */
EditImportedDataPage.getInitialProps = async ({ req, query }) => {
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

export default EditImportedDataPage;
