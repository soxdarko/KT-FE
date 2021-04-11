import { useDeviceDetect, checkBoxGroupToArrayHandler } from '../../helpers/universalFunctions';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';

import classes from './SetupForms.module.scss';

const EmployeesPicker = props => {
	const { isMobile } = useDeviceDetect();

	const listItems = props.listOfEmployees.map(user => {
		return (
			<tr key={user.id} style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'flex' }}>
				<td>{user.name}</td>
				<td style={{ display: user.serviceProviderName ? 'block' : 'none' }}>
					{user.serviceProviderName}
				</td>
				<td
					className={classes.IconTd}
					onChange={e => checkBoxGroupToArrayHandler(e, props.checkedUsers, props.setCheckedUsers)}>
					<Input
						type="checkbox"
						id={`${user.id}/employeesPicker`}
						className={props.addForSelectedClassName}
					/>
					<Label htmlFor={`${user.id}/employeesPicker`} display={props.displayCheckBox} />
				</td>
			</tr>
		);
	});

	return (
		<div className={isMobile ? classes.ReviewMob : classes.Review}>
			<h4>{props.title}</h4>
			<div style={{ display: props.listOfEmployees.length === 0 ? 'block' : 'none' }}>
				{props.emptyListMessage}
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
						<th className={classes.IconTdHead}>Izbor</th>
					</tr>
					{listItems}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeesPicker;
