import { useDeviceDetect, checkBoxGroupToArrayHandler } from '../../helpers/universalFunctions';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';

import classes from './SetupForms.module.scss';

const UsersList = props => {
	const { isMobile } = useDeviceDetect();

	const listItems = props.listOfUsers.map(user => {
		return (
			<div key={user.id} className={classes.addForSelectedWrapper}>
				<Input
					type="checkbox"
					id={`${user.id}/${props.component}`}
					className={props.addForSelectedClassName}
					onChange={e => checkBoxGroupToArrayHandler(e, props.checkedUsers, props.setCheckedUsers)}
				/>
				<Label htmlFor={`${user.id}/${props.component}`} />
				<p>{user.name}</p>
			</div>
		);
	});

	return (
		<div
			className={isMobile ? classes.ReviewMob : classes.Review}
			style={{ display: props.listOfUsers.length < 2 ? 'none' : 'block' }}>
			<h4>{props.title}</h4>
			<div>{listItems}</div>
		</div>
	);
};

export default UsersList;
