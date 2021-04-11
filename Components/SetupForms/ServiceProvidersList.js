import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './SetupForms.module.scss';

const ServiceProvidersList = props => {
	const { isMobile } = useDeviceDetect();

	const listItems = props.serviceProviderData.map(user => {
		return (
			<tr
				key={user.id}
				style={{ display: props.serviceProviderData.length === 0 ? 'none' : 'flex' }}>
				<td className={classes.tdLeftAlign}>{user.name}</td>
				<td
					className={classes.IconTd}
					onClick={() => {
						props.setId(user.id);
					}}>
					<FontAwesomeIcon
						icon={faPencilAlt}
						className={classes.SetupGuidIcon}
						style={{ display: props.displayEdit }}
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
			<h4>Vaši saloni</h4>
			<div
				style={{ display: props.serviceProviderData.length === 0 ? 'block' : 'none' }}
				className={classes.EmptyListMessage}>
				Namate unetih salona. Potrebno je da unesete salon.
			</div>
			<table className={classes.SetupGuideListContainer}>
				<tbody>
					<tr style={{ display: props.serviceProviderData.length === 0 ? 'none' : 'block' }}>
						<th>Naziv Salona</th>
						<th className={classes.IconTdHead}>Izmeni</th>
						<th className={classes.IconTdHead}>Obriši</th>
					</tr>
					{listItems}
				</tbody>
			</table>
		</div>
	);
};

export default ServiceProvidersList;
