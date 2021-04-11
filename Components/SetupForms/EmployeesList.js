import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './SetupForms.module.scss';

const EmployeesList = props => {
	const { isMobile } = useDeviceDetect();

	const listItems = props.listOfEmployees.map(user => {
		return (
			<tr key={user.id} style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'flex' }}>
				<td>{user.name}</td>
				<td style={{ display: user.serviceProviderName ? 'block' : 'none' }}>
					{user.serviceProviderName}
				</td>
				<td className={classes.IconTd}>
					<FontAwesomeIcon
						icon={faPencilAlt}
						className={classes.SetupGuidIcon}
						style={{ display: props.displayEdit }}
						onClick={() => {
							props.setId(user.id);
						}}
					/>
				</td>
				<td className={classes.IconTd}>
					<FontAwesomeIcon
						icon={faTrashAlt}
						className={classes.SetupGuidIcon}
						style={{ display: props.displayDelete, color: 'red' }}
						/* onClick={props.onDelete} */
					/>
				</td>
			</tr>
		);
	});

	return (
		<div className={isMobile ? classes.ReviewMob : classes.Review}>
			<h4>Vaši radnici</h4>
			<div
				style={{ display: props.listOfEmployees.length === 0 ? 'block' : 'none' }}
				className={classes.EmptyListMessage}>
				Namate unetih radnika. Potrebno je da unesete minimum jednog radnika
			</div>
			<table className={classes.SetupGuideListContainer}>
				<tbody>
					<tr style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'block' }}>
						<th
							style={{
								display: props.employeesPreview,
								width: '50% !important',
								maxWidth: '400px !important',
								minWidth: '220px !important',
							}}>
							Ime radnika
						</th>
						<th
							style={{
								display: props.employeesPreview,
								width: '50% !important',
								maxWidth: '400px !important',
								minWidth: '220px !important',
							}}>
							Naziv Salona
						</th>
						<th className={classes.IconTdHead}>Izmeni</th>
						<th className={classes.IconTdHead}>Obriši</th>
					</tr>
					{listItems}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeesList;
