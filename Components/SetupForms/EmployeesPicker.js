import { useState } from 'react';
import { useDeviceDetect, checkBoxGroupToArrayHandler } from '../../helpers/universalFunctions';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';

import classes from './SetupForms.module.scss';

const EmployeesPicker = props => {
	const { isMobile } = useDeviceDetect();
	const [showEmployees, setShowEmployees] = useState('none');

	const displayEmployeesHeader = () => {
		if (listItems.length === 0 && !props.editMode) {
			return 'block';
		} else return 'none';
	};
	const displayEmployees = () => {
		if (listItems.length > 0 || props.editMode) {
			return 'block';
		} else return 'none';
	};

	const listItems = props.listOfEmployees
		.filter(user => user.serviceProviderId.includes(props.selectedServiceProvider))
		.map(filteredEmployee => {
			return (
				<tr
					key={filteredEmployee.id}
					style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'flex' }}>
					<td>{filteredEmployee.name}</td>
					<td
						className={classes.IconTdEmployeesPicker}
						onChange={e =>
							checkBoxGroupToArrayHandler(e, props.checkedEmployees, props.setCheckedEmployees)
						}>
						<Input
							type="checkbox"
							id={`${filteredEmployee.id}${props.tag}`}
							value={filteredEmployee.id}
							className={props.addForSelectedClassName}
							checked={props.checkedEmployees.includes(filteredEmployee.id) ? true : false}
						/>
						<Label htmlFor={`${filteredEmployee.id}${props.tag}`} display={props.displayCheckBox} />
					</td>
				</tr>
			);
		});

	const checkedEmployeesList = props.listOfEmployees.map(employee => {
		return (
			<tr key={employee.id} style={{ display: !props.editMode ? 'none' : 'flex' }}>
				<td>{employee.name}</td>
				<td
					className={classes.IconTdEmployeesPicker}
					onChange={e =>
						checkBoxGroupToArrayHandler(e, props.checkedEmployees, props.setCheckedEmployees)
					}>
					<Input
						type="checkbox"
						id={`${employee.id}${props.tag}`}
						value={employee.id}
						className={props.addForSelectedClassName}
						checked={props.checkedEmployees.includes(employee.id) ? true : false}
					/>
					<Label htmlFor={`${employee.id}${props.tag}`} display={props.displayCheckBox} />
				</td>
			</tr>
		);
	});

	/* 	const checkedEmployeesList = props.checkedEmployees.map(employee => {
		console.log(employee);
		return (
			<tr key={employee.id} style={{ display: !props.editMode ? 'none' : 'flex' }}>
				<td>{employee.name}</td>
				<td
					className={classes.IconTdEmployeesPicker}
					onChange={e =>
						checkBoxGroupToArrayHandler(e, props.checkedEmployees, props.setCheckedEmployees)
					}>
					<Input
						type="checkbox"
						id={employee.id}
						className={props.addForSelectedClassName}
						checked={true}
					/>
					<Label htmlFor={employee.id} display={props.displayCheckBox} />
				</td>
			</tr>
		);
	}); */

	return (
		<div className={isMobile ? classes.ReviewMob : classes.Review}>
			<h4>{props.title}</h4>
			<div style={{ display: displayEmployeesHeader() }}>{props.emptyListMessage}</div>
			<table className={classes.SetupGuideListContainer} style={{ display: displayEmployees() }}>
				<tbody>
					<tr>
						<th
							style={{
								display: props.employeesPreview,
								width: '100% !important',
								maxWidth: '800px !important',
								minWidth: '220px !important',
							}}>
							Ime radnika
						</th>
						<th className={classes.IconTdHead}>Izbor</th>
					</tr>
					{listItems}
					{checkedEmployeesList}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeesPicker;
