import { useState } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToolOutlined } from '@ant-design/icons';

import classes from './SetupForms.module.scss';
import ToolBox from '../UI/ToolBox';

const ServiceProvidersList = props => {
	const { isMobile } = useDeviceDetect();
	const [userForEdit, setUserForEdit] = useState('');

	const listItems = props.serviceProviderData.map(user => {
		if (isMobile) {
			return (
				<tr
					key={user.id}
					style={{ display: props.serviceProviderData.length === 0 ? 'none' : 'flex' }}>
					<td>{user.name}</td>

					<td
						className={classes.ToolBoxButton}
						onClick={() => {
							props.setId(user.id), props.setDisplayToolBox('flex'), setUserForEdit(user.name);
						}}>
						<ToolOutlined />
					</td>
				</tr>
			);
		} else {
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
		}
	});

	if (isMobile) {
		return (
			<>
				<ToolBox
					displayToolBox={props.displayToolBox}
					setDisplayToolBox={props.setDisplayToolBox}
					userForEdit={userForEdit}
					onEdit={() => {
						props.setEditMode(true), props.setDisplayToolBox('none');
					}}
				/>
				<div className={classes.ReviewMob}>
					<h4>Lista salona</h4>
					<div style={{ display: listItems.length === 0 ? 'block' : 'none' }}>
						{props.emptyListMessage}
					</div>
					<div
						style={{ display: props.serviceProviderData.length === 0 ? 'block' : 'none' }}
						className={classes.EmptyListMessage}>
						Namate unetih radnika. Potrebno je da unesete minimum jednog radnika
					</div>
					<table className={classes.SetupGuideListContainerMob}>
						<tbody>{listItems}</tbody>
					</table>
				</div>
			</>
		);
	} else {
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
	}
};

export default ServiceProvidersList;
